using System;
using System.ComponentModel.DataAnnotations;

namespace Propostas.Lib.Models
{
    public class FornecedorModel
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "{0} deve ser informado")]
        [MaxLength(1000, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "{0} deve ser informado")]
        [MaxLength(14, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
        [MinLength(11, ErrorMessage = "O {0} deve ter no mínimo {1} caracteres")]
        public string Documento { get; set; }

        public string DocumentoMask
        {
            get { return Documento.MascaraCnpjCpf(); }
        }

        [MaxLength(50, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "E-mail deve ser informado")]
        [MaxLength(1000, ErrorMessage = "O E-mail deve ter no máximo {1} caracteres")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail não é valido")]
        public string Email { get; set; }

        public bool Ativo { get { return true; } }
    }
}