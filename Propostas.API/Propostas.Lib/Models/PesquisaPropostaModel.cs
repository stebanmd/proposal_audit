using Propostas.Lib.Attributes;
using Propostas.Lib.Enumerator;
using System;

namespace Propostas.Lib.Models
{
    public class PesquisaPropostaModel
    {
        public string NomeProposta { get; set; }

        public string NomeFornecedor { get; set; }

        [ChecaDataAntiga(ErrorMessage = "Data inicial incorreta")]
        public DateTime DataInicial { get; set; }

        [ChecaDataAntiga(ErrorMessage = "Data final incorreta")]
        public DateTime DataFinal { get; set; }

        public StatusProposta Status { get; set; }

        public int IdCategoria { get; set; }
    }
}