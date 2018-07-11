using Propostas.Lib.ADO;
using Propostas.Lib.Entity;
using Propostas.Lib.Enumerator;
using Propostas.Lib.Models;
using Propostas.Lib.Util;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Propostas.Lib.Service
{
    public class PropostaService
    {
        public int TotalRegistros { get; set; }

        private PropostaADO _ado = new PropostaADO();

        public PropostaModel Carregar(int id)
        {
            try
            {
                return _ado.Carregar(id).MapTo<PropostaModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel Remover(int id, int idUsuario)
        {
            RetornoModel result = new RetornoModel
            {
                Mensagem = "Registro não encontrado"
            };

            try
            {
                var registro = _ado.Carregar(id);
                if (registro != null)
                {
                    registro.Ativo = false;
                    _ado.Atualizar(registro);
                    InserirHistorico(id, AcaoProposta.Exclusao, idUsuario);

                    result.Sucesso = true;
                    result.Mensagem = "Registro removido com sucesso!";
                }
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                result.Mensagem = "Não foi possível realizar a atualização do registro.";
            }

            return result;
        }

        private RetornoModel<PropostaModel> Salvar(PropostaModel model)
        {
            RetornoModel<PropostaModel> result = new RetornoModel<PropostaModel> { Mensagem = "OK" };

            try
            {
                model.Data = new DateTime(model.Data.Year, model.Data.Month, model.Data.Day, DateTime.Now.Hour, DateTime.Now.Minute, 0);
                if (model.ID > 0)
                {
                    result.Sucesso = _ado.Atualizar(model.MapTo<Proposta>());
                    result.Retorno = model;

                    if (!result.Sucesso)
                        result.Mensagem = "Registro não localizado para modificação";
                }
                else
                {
                    result.Retorno = _ado.Inserir(model.MapTo<Proposta>()).MapTo<PropostaModel>();

                    InserirHistorico(result.Retorno.ID, AcaoProposta.Criacao, model.IdUsuario);
                    result.Sucesso = true;
                }
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }

            return result;
        }

        private void InserirHistorico(int idProposta, AcaoProposta acao, int idUsuario)
        {
            try
            {
                var historico = new Historico
                {
                    IdProposta = idProposta,
                    Acao = acao,
                    IdUsuario = idUsuario,
                    Data = DateTime.Now
                };

                _ado.IncluirHistorico(historico);
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel<PropostaModel> AprovarProposta(PropostaModel model)
        {
            try
            {
                if (DateTime.Now > model.Data.AddHours(ConfiguracaoAppUtil.GetAsInt(ConfiguracaoGeral.tempoExpiracaoProposta)))
                {
                    return new RetornoModel<PropostaModel>
                    {
                        Mensagem = "Proposta não pode ser aprovada pois já expirou o prazo de validade"
                    };
                }

                var usuarioCorrente = new UsuarioService().Carregar(model.IdUsuario);

                if (usuarioCorrente.Perfil == PerfilUsuario.AnalistaComercial)
                {
                    return new RetornoModel<PropostaModel>
                    {
                        Mensagem = "Proposta não pode ser aprovada por usuários com perfil " + PerfilUsuario.AnalistaComercial.Description()
                    };
                }
                else if (usuarioCorrente.Perfil == PerfilUsuario.AnalistaFinanceiro)
                {
                    InserirHistorico(model.ID, AcaoProposta.AprovacaoAnalista, model.IdUsuario);
                    if (model.Valor > ConfiguracaoAppUtil.GetAsDecimal(ConfiguracaoGeral.valorMinimoAprovacaoDiretoria))
                    {
                        InserirHistorico(model.ID, AcaoProposta.SolicitadoAprovacao, model.IdUsuario);
                        model.Status = StatusProposta.PedenteDiretoria;
                    }
                }
                else
                {
                    InserirHistorico(model.ID, AcaoProposta.AprovacaoDiretoria, model.IdUsuario);
                }

                var result = Salvar(model);
                if (result.Sucesso)
                {
                    if (model.Status == StatusProposta.PedenteDiretoria)
                    {
                        result.Mensagem = "Proposta enviada para aprovação do " + PerfilUsuario.DiretorFinanceiro.Description();
                    }
                    else
                    {
                        result.Mensagem = "Proposta aprovada com sucesso!";
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel<PropostaModel> ReprovarProposta(PropostaModel model)
        {
            try
            {
                InserirHistorico(model.ID, AcaoProposta.Reprovacao, model.IdUsuario);
                var result = Salvar(model);
                if (result.Sucesso)
                    result.Mensagem = "Proposta reprovada com sucesso!";
                return result;
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel<PropostaModel> GravarProposta(PropostaModel model)
        {
            try
            {
                if (model.ID > 0)
                {
                    var proposta = Carregar(model.ID);
                    if (proposta.Status == StatusProposta.Aprovada)
                    {
                        return new RetornoModel<PropostaModel>
                        {
                            Mensagem = "Proposta não pode ser alterada pois já encontra-se Aprovada"
                        };
                    }

                    InserirHistorico(model.ID, AcaoProposta.Edicao, model.IdUsuario);
                }
                return Salvar(model);
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public List<PropostaModel> Pesquisar(PesquisaPropostaModel model)
        {
            try
            {
                model.DataFinal = model.DataFinal.AddDays(1).AddSeconds(-1);
                return _ado.PesquisarPropostas(model).ListTo<PropostaModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public PropostaModel ListarHistorico(int idProposta)
        {
            try
            {
                return _ado.ListarHistorico(idProposta).MapTo<PropostaModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel SalvarArquivoProposta(UploadArquivoModel model)
        {
            var result = new RetornoModel();
            try
            {
                var proposta = Carregar(model.IdProposta);

                proposta.Arquivo = UploadUtil.UploadFile(model.ArquivoBase64, ConfiguracaoGeral.diretorioArquivoProposta, model.IdProposta, model.Extensao);
                result.Sucesso = Salvar(proposta).Sucesso;
                result.Mensagem = "OK";
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                result.Mensagem = "Ocorreu um erro ao salvar o arquivo";
            }
            return result;
        }
    }
}