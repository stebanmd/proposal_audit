using System.ComponentModel.DataAnnotations;

namespace Propostas.Lib.Models
{
    public class MudarSenhaModel
    {
        public string SenhaAtual { get; set; }

        [Required(ErrorMessage = "Favor informar a nova senha!")]
        [MinLength(10, ErrorMessage = "Nova senha deve possuir no mínimo {1} caracteres.")]
        public string NovaSenha { get; set; }

        [Compare("NovaSenha", ErrorMessage = "Confirmação de senha inválida.")]
        public string ConfirmaSenha { get; set; }

        public bool UsuarioDiferente { get; set; }

        public int IdUsuario { get; set; }
    }
}