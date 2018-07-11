namespace Propostas.Lib.Models
{
    public class RetornoModel<T> : RetornoModel
    {
        public T Retorno { get; set; }
    }

    public class RetornoModel<T, TEnum> : RetornoModel<T>
    {
        public TEnum Tipo { get; set; }
    }

    public class RetornoModel
    {
        public bool Sucesso { get; set; }

        public string Mensagem { get; set; }
    }
}