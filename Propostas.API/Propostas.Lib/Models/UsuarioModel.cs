using Newtonsoft.Json;
using Propostas.Lib.Attributes;
using Propostas.Lib.Enumerator;
using System;
using System.ComponentModel.DataAnnotations;

namespace Propostas.Lib.Models
{
    public class UsuarioModel
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Informe o {0}")]
        [MaxLength(500, ErrorMessage = "O campo {0}  deve ter no máximo {1} caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Informe o {0}")]
        [MaxLength(11, ErrorMessage = "O campo {0}  deve ter no máximo {1} caracteres")]
        [MinLength(11, ErrorMessage = "O campo {0}  deve ter no mínimo {1} caracteres")]
        public string CPF { get; set; }

        public string CPFMask
        {
            get { return CPF.MascaraCnpjCpf(); }
        }

        [ChecaDataAntiga(ErrorMessage = "Data de Nascimento incorreta")]
        [ChecaDataMaiorQueAtual(ErrorMessage = "Data de Nascimento incorreta")]        
        public DateTime DataNascimento { get; set; }

        public PerfilUsuario Perfil { get; set; }

        public string PerfilStr
        {
            get { return Perfil.Description(); }
        }

        
        public string Senha { get; set; }

        public bool Ativo { get { return true; } }
    }
}