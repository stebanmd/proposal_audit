using System.ComponentModel.DataAnnotations;

namespace Propostas.Lib.Models
{
    public class CategoriaModel
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "{0} deve ser informado")]
        [MaxLength(500, ErrorMessage = "{0} deve ter no máximo {1} caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "{0} deve ser informada")]
        public string Descricao { get; set; }

        public bool Ativo { get { return true; } }
    }
}