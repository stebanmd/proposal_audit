using Propostas.Lib.Enumerator;
using System;

namespace Propostas.Lib.Models
{
    public class HistoricoModel
    {
        public int IdProposta { get; set; }

        public int IdUsuario { get; set; }

        public UsuarioModel Usuario { get; set; }

        public DateTime Data { get; set; }

        public AcaoProposta Acao { get; set; }

        public string AcaoStr
        {
            get { return Acao.Description(); }
        }
    }
}