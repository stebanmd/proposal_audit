using System;
using System.ComponentModel.DataAnnotations;

namespace Propostas.Lib.Models
{
    public class UploadArquivoModel
    {
        [Range(1, Int32.MaxValue, ErrorMessage = "{0} deve ser informado")]
        public int IdProposta { get; set; }

        [Required(ErrorMessage = "{0} deve ser informado")]
        public string ArquivoBase64 { get; set; }

        [Required(ErrorMessage = "{0} deve ser informado")]
        public string Extensao { get; set; }

        [Required(ErrorMessage = "{0} deve ser informado")]
        public string NomeArquivo { get; set; }
    }
}