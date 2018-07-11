using System.ComponentModel;

namespace Propostas.Lib.Enumerator
{
    public enum ConfiguracaoGeral
    {
        diretorioArquivoProposta,
        tempoExpiracaoProposta,
        valorMinimoAprovacaoDiretoria,
        logCategory
    }

    public enum PerfilUsuario
    {
        Administrador,

        [Description("Analista Comercial")]
        AnalistaComercial,

        [Description("Analista Financeiro")]
        AnalistaFinanceiro,

        [Description("Diretor Financeiro")]
        DiretorFinanceiro,
    }

    public enum StatusProposta
    {
        [Description("Em Aberto")]
        EmAberto,

        Aprovada,

        Reprovada,

        [Description("Pendente Diretoria")]
        PedenteDiretoria
    }

    public enum AcaoProposta
    {
        [Description("Criação")]
        Criacao,

        [Description("Aprovação - Analista Financeiro")]
        AprovacaoAnalista,

        [Description("Aprovação - Diretor Financeiro")]
        AprovacaoDiretoria,

        [Description("Reprovação")]
        Reprovacao,

        [Description("Solicitado aprovação do diretor financeiro")]
        SolicitadoAprovacao,

        [Description("Exclusão")]
        Exclusao,

        [Description("Edição")]
        Edicao,
    }
}