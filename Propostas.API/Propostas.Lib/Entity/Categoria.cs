using Propostas.Lib.Attributes;

namespace Propostas.Lib.Entity
{
    public class Categoria : IEntity
    {
        [DataPropertyToSql(DataPropertyToSqlAttribute.ColumnType.PrimaryKey)]
        public int ID { get; set; }

        [DataPropertyToSql]
        public string Nome { get; set; }

        [DataPropertyToSql]
        public string Descricao { get; set; }

        [DataPropertyToSql]
        public bool Ativo { get; set; }
    }
}