using Dapper;
using Propostas.Lib.Entity;
using Propostas.Lib.Models;
using System.Collections.Generic;
using System.Linq;

namespace Propostas.Lib.ADO
{
    internal class PropostaADO : ADOSuper
    {
        internal int TotalRegistros { get; private set; }

        public Proposta Inserir(Proposta entity) => base.Inserir(entity);

        public bool Atualizar(Proposta entity) => base.Atualizar(entity);

        public Proposta Carregar(int id) => base.Carregar<Proposta>(id);

        public Historico IncluirHistorico(Historico entity) => base.Inserir(entity);

        public List<PropostaAgregate> PesquisarPropostas(PesquisaPropostaModel filtro)
        {
            string sql = @"select p.ID, p.Nome, p.IdFornecedor, p.IdCategoria, p.Data, p.Valor, p.Descricao, p.Status, p.Arquivo, p.Ativo
                                , c.ID, c.Nome, c.Descricao, c.Ativo
                                , f.ID, f.Nome, f.Documento, f.Telefone, f.Email, f.Ativo
                             from Proposta p(NOLOCK)
                                  join Categoria c(NOLOCK) on p.IdCategoria = c.ID
                                  join Fornecedor f(NOLOCK) on p.IdFornecedor = f.ID
                            where p.Ativo = 1
                              and (p.IdCategoria = @IdCategoria or @IdCategoria = 0)
                              and p.Status = @Status
                              and p.Data between @DataInicial and @DataFinal
                              and p.Nome like @NomeProposta
                              and f.Nome like @NomeFornecedor
                            order by p.Nome";

            List<PropostaAgregate> result = null;
            using (var con = db.CreateConnection())
            {
                con.Open();
                result = con.Query<PropostaAgregate, Categoria, Fornecedor, PropostaAgregate>(sql,
                    (proposta, categoria, fornecedor) =>
                    {
                        proposta.Categoria = categoria;
                        proposta.Fornecedor = fornecedor;
                        return proposta;
                    },
                    filtro).ToList();
                con.Close();
            }

            return result;
        }

        public PropostaAgregate ListarHistorico(int idProposta)
        {
            string sql = @"SELECT p.ID, p.Nome, p.IdFornecedor, p.IdCategoria, p.Data, p.Valor, p.Descricao, p.Status, p.Arquivo, p.Ativo
                                , f.ID, f.Nome, f.Documento, f.Telefone, f.Email, f.Ativo
                                , c.ID, c.Nome, c.Descricao, c.Ativo
                                , h.ID, h.IdProposta, h.IdUsuario, h.Acao, h.Data
                                , u.ID, u.Nome, u.Perfil, u.CPF
                           FROM Proposta p(NOLOCK)
                                join Fornecedor f(NOLOCK) on p.IdFornecedor = f.ID
                                join Categoria c(NOLOCK) on p.IdCategoria = c.ID
                                join Historico h(NOLOCK) on h.IdProposta = p.ID
                                join Usuario u(NOLOCK) on h.IdUsuario = u.ID
                          WHERE p.ID = @IdProposta
                          ORDER BY h.Data";

            PropostaAgregate result = null;

            using (var con = db.CreateConnection())
            {
                con.Open();
                con.Query<PropostaAgregate, Fornecedor, Categoria, HistoricoAgregate, Usuario, PropostaAgregate>(sql,
                    (proposta, fornecedor, categoria, historico, usuario) =>
                    {
                        proposta = result ?? proposta;
                        proposta.Fornecedor = fornecedor;
                        proposta.Categoria = categoria;

                        historico.Usuario = usuario;

                        if (proposta.HistoricoAlteracao == null)
                            proposta.HistoricoAlteracao = new List<HistoricoAgregate>();

                        if (!proposta.HistoricoAlteracao.Exists(a => a.ID == historico.ID))
                            proposta.HistoricoAlteracao.Add(historico);

                        if (result == null)
                            result = proposta;

                        return proposta;
                    }, new { IdProposta = idProposta });

                con.Close();
            }

            return result;
        }
    }
}