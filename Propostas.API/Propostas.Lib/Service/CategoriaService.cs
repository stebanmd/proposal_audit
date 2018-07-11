using Propostas.Lib.ADO;
using Propostas.Lib.Entity;
using Propostas.Lib.Models;
using Propostas.Lib.Util;
using System;
using System.Collections.Generic;

namespace Propostas.Lib.Service
{
    public class CategoriaService
    {
        private CategoriaADO _ado = new CategoriaADO();

        public CategoriaModel Carregar(int id)
        {
            try
            {
                return _ado.Carregar(id).MapTo<CategoriaModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }

        public RetornoModel<CategoriaModel> Salvar(CategoriaModel model)
        {
            RetornoModel<CategoriaModel> result = new RetornoModel<CategoriaModel> { Mensagem = "OK" };

            try
            {
                if (model.ID > 0)
                {
                    result.Sucesso = _ado.Atualizar(model.MapTo<Categoria>());
                    result.Retorno = model;

                    if (!result.Sucesso)
                        result.Mensagem = "Registro não localizado para modificação. Verifique se o ID informado está correto";
                }
                else
                {
                    result.Retorno = _ado.Inserir(model.MapTo<Categoria>()).MapTo<CategoriaModel>();
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
                var categoria = _ado.Carregar(id);
                if (categoria != null)
                {
                    categoria.Ativo = false;
                    _ado.Atualizar(categoria);

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

        public List<CategoriaModel> Listar()
        {
            try
            {
                return _ado.Listar().ListTo<CategoriaModel>();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                throw;
            }
        }
    }
}