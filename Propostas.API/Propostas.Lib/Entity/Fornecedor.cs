using Propostas.Lib.Attributes;

namespace Propostas.Lib.Entity
{
    public class Fornecedor : IEntity
    {
        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.PrimaryKey)]
        public int ID { get; set; }

        [DataPropertyToSql]
        public string Nome { get; set; }

        [DataPropertyToSql]
        public string Documento { get; set; }

        [DataPropertyToSql]
        public string Telefone { get; set; }

        [DataPropertyToSql]
        public string Email { get; set; }

        [DataPropertyToSql]
        public bool Ativo { get; set; }
    }
}