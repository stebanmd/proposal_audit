using Propostas.Lib.Attributes;
using Propostas.Lib.Enumerator;
using System;

namespace Propostas.Lib.Entity
{
    public class Usuario : IEntity
    {
        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.PrimaryKey)]
        public int ID { get; set; }

        [DataPropertyToSql]
        public string Nome { get; set; }

        [DataPropertyToSql]
        public string CPF { get; set; }

        [DataPropertyToSql]
        public DateTime DataNascimento { get; set; }

        [DataPropertyToSql]
        public bool Ativo { get; set; }

        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.Unchangeble)]
        public string Senha { get; set; }

        [DataPropertyToSql]
        public PerfilUsuario Perfil { get; set; }
    }
}