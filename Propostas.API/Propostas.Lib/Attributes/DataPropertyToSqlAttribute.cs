using System;

namespace Propostas.Lib.Attributes
{
    public class DataPropertyToSqlAttribute : Attribute
    {
        public enum ColumnType
        {
            Normal,
            PrimaryKey,
            ForeignKey,
            Unchangeble
        }

        public ColumnType Type { get; private set; }

        public DataPropertyToSqlAttribute()
        {
            Type = ColumnType.Normal;
        }

        public DataPropertyToSqlAttribute(ColumnType eType)
        {
            Type = eType;
        }
    }
}