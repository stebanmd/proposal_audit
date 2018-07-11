using Dapper;
using Propostas.Lib.Entity;
using System.Collections.Generic;
using System.Linq;

namespace Propostas.Lib.ADO
{
    internal class UsuarioADO : ADOSuper
    {
        internal int TotalRegistros { get; private set; }

        public Usuario Inserir(Usuario usuario) => base.Inserir(usuario);

        public bool Atualizar(Usuario usuario) => base.Atualizar(usuario);

        public Usuario Carregar(int id) => base.Carregar<Usuario>(id);

        public Usuario CarregarPorCPF(string cpf)
        {
            string SQL = @"SELECT * FROM Usuario (NOLOCK) WHERE CPF = @CPF AND Ativo = 1";
            Usuario result = null;

            using (var con = db.CreateConnection())
            {
                con.Open();
                result = con.QueryFirstOrDefault<Usuario>(SQL, new { CPF = cpf });
                con.Close();
            }
            return result;
        }

        public List<Usuario> Listar()
        {
            string SQL = @"SELECT * FROM Usuario (NOLOCK) WHERE Ativo = 1 ORDER BY Nome";

            List<Usuario> lista = null;
            using (var con = db.CreateConnection())
            {
                con.Open();
                lista = con.Query<Usuario>(SQL).ToList();
                con.Close();
            }
            return lista;
        }

        public bool MudarSenha(string novaSenha, int id)
        {
            string SQL = @"UPDATE Usuario SET Senha = @Senha WHERE ID = @ID";
            int affectedLines = 0;
            using (var con = db.CreateConnection())
            {
                con.Open();
                affectedLines = con.Execute(SQL, new { Senha = novaSenha, ID = id });
                con.Close();
            }
            return affectedLines > 0;
        }
    }
}