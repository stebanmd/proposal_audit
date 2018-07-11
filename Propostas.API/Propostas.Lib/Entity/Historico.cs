using Propostas.Lib.Attributes;
using Propostas.Lib.Enumerator;
using System;

namespace Propostas.Lib.Entity
{
    public class Historico : IEntity
    {
        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.PrimaryKey)]
        public int ID { get; set; }

        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.ForeignKey)]
        public int IdProposta { get; set; }

        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.ForeignKey)]
        public int IdUsuario { get; set; }

        [DataPropertyToSql]
        public DateTime Data { get; set; }

        [DataPropertyToSql]
        public AcaoProposta Acao { get; set; }
    }

    public class HistoricoAgregate : Historico
    {
        public Usuario Usuario { get; set; }
    }
}