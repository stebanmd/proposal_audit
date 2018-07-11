using Propostas.Lib.ADO;
using Propostas.Lib.Entity;
using Propostas.Lib.Enumerator;
using Propostas.Lib.Models;
using Propostas.Lib.Util;
using System;
using System.Collections.Generic;

namespace Propostas.Lib.Service
{
    public class UsuarioService
    {
        private UsuarioADO _ado = new UsuarioADO();

        public int TotalRegistros { get; set; }

        public UsuarioModel Carregar(int id)
        {
            try
            {
                return _ado.Carregar(id).MapTo<UsuarioModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel<UsuarioModel> Salvar(UsuarioModel model)
        {
            RetornoModel<UsuarioModel> result = new RetornoModel<UsuarioModel> { Mensagem = "OK" };

            try
            {
                var user = _ado.CarregarPorCPF(model.CPF);
                if (user != null && user.ID != model.ID)
                {
                    result.Mensagem = "Já existe um usuário com este CPF. Não é possível concluir a operação";
                    return result;
                }

                model.CPF = model.CPF.OnlyNumbers();
                if (!model.CPF.IsValidCPFCNPJ())
                {
                    result.Mensagem = "Documento informado não é válido";
                    return result;
                }

                if (model.ID > 0)
                {
                    result.Sucesso = _ado.Atualizar(model.MapTo<Usuario>());
                    result.Retorno = model;

                    if (!result.Sucesso)
                        result.Mensagem = "Registro não localizado para modificação. Verifique se o ID informado está correto";
                }
                else
                {
                    model.Senha = CriptografiaUtil.CriptografarSenha(model.Senha);
                    result.Retorno = _ado.Inserir(model.MapTo<Usuario>()).MapTo<UsuarioModel>();
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

        public RetornoModel Remover(int id)
        {
            RetornoModel result = new RetornoModel
            {
                Mensagem = "Registro não encontrado"
            };

            try
            {
                var user = _ado.Carregar(id);
                if (user != null)
                {
                    user.Ativo = false;
                    _ado.Atualizar(user);

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

        public UsuarioModel CarregarPorCPF(string cpf)
        {
            try
            {
                return _ado.CarregarPorCPF(cpf).MapTo<UsuarioModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel<UsuarioModel> Login(string cpf, string senha)
        {
            RetornoModel<UsuarioModel> result = new RetornoModel<UsuarioModel> { Mensagem = "Usuário ou senha incorretos." };

            try
            {
                var user = _ado.CarregarPorCPF(cpf);
                if (user != null)
                {
                    if (CriptografiaUtil.VerificarSenha(user.Senha, senha))
                    {
                        result.Retorno = user.MapTo<UsuarioModel>();
                        result.Sucesso = true;
                        result.Mensagem = "OK";
                    }
                }
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }

            return result;
        }

        public RetornoModel MudarSenha(MudarSenhaModel model, int usuarioAtual)
        {
            var result = new RetornoModel();
            try
            {
                var usuario = _ado.Carregar(usuarioAtual);
                if (usuario == null)
                {
                    result.Mensagem = "Usuario não está autenticado. Por favor efetue novamente o login antes de continuar";
                    return result;
                }
                else
                {
                    if (model.UsuarioDiferente && usuario.Perfil != PerfilUsuario.Administrador)
                    {
                        result.Mensagem = "Você não possui permissão para realizar essa operação";
                        return result;
                    }

                    if (!model.UsuarioDiferente)
                    {
                        if (!CriptografiaUtil.VerificarSenha(usuario.Senha, model.SenhaAtual))
                        {
                            result.Mensagem = "Senha atual não confere!";
                            return result;
                        }

                        model.IdUsuario = usuarioAtual;
                    }

                    result.Sucesso = _ado.MudarSenha(CriptografiaUtil.CriptografarSenha(model.NovaSenha), model.IdUsuario);
                    result.Mensagem = "Senha alterada com sucesso!";
                }

                return result;
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public List<UsuarioModel> Listar()
        {
            try
            {
                return _ado.Listar().ListTo<UsuarioModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }
    }
}