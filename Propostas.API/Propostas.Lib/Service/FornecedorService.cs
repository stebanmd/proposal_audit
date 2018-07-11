using Propostas.Lib.ADO;
using Propostas.Lib.Entity;
using Propostas.Lib.Models;
using Propostas.Lib.Util;
using System;
using System.Collections.Generic;

namespace Propostas.Lib.Service
{
    public class FornecedorService
    {
        private FornecedorADO _ado = new FornecedorADO();

        public FornecedorModel Carregar(int id)
        {
            try
            {
                return _ado.Carregar(id).MapTo<FornecedorModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel<FornecedorModel> Salvar(FornecedorModel model)
        {
            RetornoModel<FornecedorModel> result = new RetornoModel<FornecedorModel> { Mensagem = "OK" };

            try
            {
                model.Documento = model.Documento.OnlyNumbers();
                if (!model.Documento.IsValidCPFCNPJ())
                {
                    result.Mensagem = "Documento informado não é válido";                   
                    return result;
                }

                if (model.ID > 0)
                {
                    result.Sucesso = _ado.Atualizar(model.MapTo<Fornecedor>());
                    result.Retorno = model;

                    if (!result.Sucesso)
                        result.Mensagem = "Registro não localizado para modificação. Verifique se o ID informado está correto";
                }
                else
                {
                    result.Retorno = _ado.Inserir(model.MapTo<Fornecedor>()).MapTo<FornecedorModel>();
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
                var registro = _ado.Carregar(id);
                if (registro != null)
                {
                    registro.Ativo = false;
                    _ado.Atualizar(registro);

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

        public List<FornecedorModel> Listar()
        {
            try
            {
                return _ado.Listar().ListTo<FornecedorModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }
    }
}