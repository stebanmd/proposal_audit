using Newtonsoft.Json;
using Propostas.Lib.Attributes;
using Propostas.Lib.Enumerator;
using Propostas.Lib.Util;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Propostas.Lib.Models
{
    public class PropostaModel
    {
        public int ID { get; set; }

        [Required(ErrorMessage ="{0} deve ser informado")]
        [MaxLength(500, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
        public string Nome { get; set; }

        [Range(1, Int32.MaxValue, ErrorMessage = "Fornecedor deve ser informado")]
        public int IdFornecedor { get; set; }

        public FornecedorModel Fornecedor { get; set; }

        [Range(1, Int32.MaxValue, ErrorMessage = "Categoria deve ser informada")]
        public int IdCategoria { get; set; }

        public CategoriaModel Categoria { get; set; }

        [ChecaDataMaiorQueAtual(ErrorMessage = "Data da proposta não pode ser superior à atual")]
        public DateTime Data { get; set; }

        public decimal Valor { get; set; }

        public string Descricao { get; set; }

        public StatusProposta Status { get; set; }

        public string StatusStr
        {
            get { return Status.Description(); }
        }

        public string Arquivo { get; set; }

        public string CaminhoArquivo
        {
            get
            {
                if (string.IsNullOrEmpty(Arquivo))
                    return string.Empty;

                return ConfiguracaoAppUtil.Get(ConfiguracaoGeral.diretorioArquivoProposta)+ $"{ID}/{Arquivo}";
            }
        }

        [JsonIgnore]
        public int IdUsuario { get; set; }

        public bool Ativo { get { return true; } }

        public List<HistoricoModel> HistoricoAlteracao { get; set; }
    }
}