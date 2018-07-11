using Dapper;
using Propostas.Lib.Entity;
using System.Collections.Generic;
using System.Linq;

namespace Propostas.Lib.ADO
{
    internal class CategoriaADO : ADOSuper
    {
        internal int TotalRegistros { get; private set; }

        public Categoria Inserir(Categoria entity) => base.Inserir(entity);

        public bool Atualizar(Categoria entity) => base.Atualizar(entity);

        public Categoria Carregar(int id) => base.Carregar<Categoria>(id);
        
        public List<Categoria> Listar()
        {
            string SQL = @"SELECT * FROM Categoria (NOLOCK) WHERE Ativo = 1 ORDER BY Nome";

            List<Categoria> lista = null;
            using (var con = db.CreateConnection())
            {
                con.Open();
                lista = con.Query<Categoria>(SQL).ToList();
                con.Close();
            }
            return lista;
        }
    }
}