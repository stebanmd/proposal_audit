using Dapper;
using Propostas.Lib.Entity;
using System.Collections.Generic;
using System.Linq;

namespace Propostas.Lib.ADO
{
    internal class FornecedorADO : ADOSuper
    {
        internal int TotalRegistros { get; private set; }

        public Fornecedor Inserir(Fornecedor usuario) => base.Inserir(usuario);

        public bool Atualizar(Fornecedor usuario) => base.Atualizar(usuario);

        public Fornecedor Carregar(int id) => base.Carregar<Fornecedor>(id);

        public List<Fornecedor> Listar()
        {
            string SQL = @"SELECT * FROM Fornecedor (NOLOCK) WHERE Ativo = 1 ORDER BY Nome";

            List<Fornecedor> lista = null;
            using (var con = db.CreateConnection())
            {
                con.Open();
                lista = con.Query<Fornecedor>(SQL).ToList();
                con.Close();
            }
            return lista;
        }
    }
}