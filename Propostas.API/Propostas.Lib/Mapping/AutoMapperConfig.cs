using AutoMapper;
using Propostas.Lib.Entity;
using Propostas.Lib.Models;

namespace Propostas.Lib.Util
{
    public abstract class AutoMapperConfig
    {
        public static void RegisterMapping()
        {
            Mapper.Initialize(x =>
            {
                x.CreateMap<Usuario, UsuarioModel>().ForMember(a => a.Senha, opt => opt.Ignore());
                x.CreateMap<UsuarioModel, Usuario>();

                x.CreateMap<Fornecedor, FornecedorModel>().ReverseMap();
                x.CreateMap<Categoria, CategoriaModel>().ReverseMap();
                x.CreateMap<Proposta, PropostaModel>().ReverseMap();
                x.CreateMap<PropostaAgregate, PropostaModel>().ReverseMap();
                x.CreateMap<Historico, HistoricoModel>().ReverseMap();
                x.CreateMap<HistoricoAgregate, HistoricoModel>().ReverseMap();
            });
        }
    }
}