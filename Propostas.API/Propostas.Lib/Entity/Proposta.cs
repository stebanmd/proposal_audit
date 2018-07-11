using Propostas.Lib.Attributes;
using Propostas.Lib.Enumerator;
using System;
using System.Collections.Generic;

namespace Propostas.Lib.Entity
{
    public class Proposta : IEntity
    {
        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.PrimaryKey)]
        public int ID { get; set; }

        [DataPropertyToSql]
        public string Nome { get; set; }

        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.ForeignKey)]
        public int IdFornecedor { get; set; }

        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.ForeignKey)]
        public int IdCategoria { get; set; }

        [DataPropertyToSql]
        public DateTime Data { get; set; }

        [DataPropertyToSql]
        public decimal Valor { get; set; }

        [DataPropertyToSql]
        public string Descricao { get; set; }

        [DataPropertyToSql]
        public StatusProposta Status { get; set; }

        [DataPropertyToSql]
        public string Arquivo { get; set; }

        [DataPropertyToSql]
        public bool Ativo { get; set; }
    }

    public class PropostaAgregate : Proposta
    {
        public Categoria Categoria { get; set; }
        public Fornecedor Fornecedor { get; set; }
        public List<HistoricoAgregate> HistoricoAlteracao { get; set; }
    }
}