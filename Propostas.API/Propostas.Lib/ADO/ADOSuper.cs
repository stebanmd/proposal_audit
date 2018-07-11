using Dapper;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Propostas.Lib.Entity;
using Propostas.Lib.Util;

namespace Propostas.Lib.ADO
{
    public abstract class ADOSuper
    {
        protected Database db;

        static ADOSuper()
        {
            DatabaseFactory.SetDatabaseProviderFactory(new DatabaseProviderFactory());
        }

        public ADOSuper()
        {
            db = DatabaseFactory.CreateDatabase();
        }

        protected T Inserir<T>(T entity) where T : IEntity
        {
            string sql = EntityUtil.GetInsertQuery(entity);
            using (var con = db.CreateConnection())
            {
                con.Open();
                entity.ID = con.QueryFirst<int>(sql, entity);
                con.Close();
            }
            return entity;
        }

        protected T Carregar<T>(int id)
        {
            string sql = EntityUtil.GetSelectByIdQuery<T>();
            T result;
            using (var con = db.CreateConnection())
            {
                con.Open();
                result = con.QueryFirstOrDefault<T>(sql, new { ID = id });
                con.Close();
            }
            return result;
        }

        protected bool Atualizar<T>(T entity)
        {
            string sql = EntityUtil.GetUpdateQuery(entity);
            int affected = 0;
            using (var con = db.CreateConnection())
            {
                con.Open();
                affected = con.Execute(sql, entity);
                con.Close();
            }
            return affected > 0;
        }
    }
}