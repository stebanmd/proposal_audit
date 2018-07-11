using Propostas.Lib.Enumerator;
using Propostas.Lib.Models;
using Propostas.Lib.Service;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Propostas.API.Controllers
{
    /// <summary>
    /// Responsável por realizar as operações com as propostas
    /// </summary>
    [RoutePrefix("api/proposta")]
    [Authorize]
    public class PropostaController : MasterApiController
    {
        private readonly PropostaService service;

        /// <summary>
        /// 
        /// </summary>
        public PropostaController() => service = new PropostaService();

        /// <summary>
        /// Carrega dados da proposta
        /// </summary>
        /// <param name="id">Identificador da proposta</param>
        /// <returns></returns>
        [HttpGet]
        [Route("carregar/{id}")]
        public HttpResponseMessage Carregar([FromUri]int id)
        {
            return ExecuteFunction(() =>
            {
                var result = service.Carregar(id);
                HttpStatusCode code = result != null ? HttpStatusCode.OK : HttpStatusCode.NotFound;
                return Request.CreateResponse(code, result);
            });
        }

        /// <summary>
        /// Remove uma proposta
        /// </summary>
        /// <param name="id">Identificador da proposta</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("remover/{id}")]
        public HttpResponseMessage Remover([FromUri]int id)
        {
            return ExecuteFunction(() =>
            {
                var result = service.Remover(id, UsuarioCorrente);
                HttpStatusCode code = result.Sucesso ? HttpStatusCode.OK : HttpStatusCode.NotFound;
                return Request.CreateResponse(code, result);
            });
        }

        /// <summary>
        /// Retorna a pesquisa conforme filtro informado
        /// </summary>
        /// <param name="model">filtro de pesquisa</param>
        /// <returns></returns>
        [HttpPost]
        [Route("pesquisar")]
        public HttpResponseMessage PesquisarProposta([FromBody]PesquisaPropostaModel model)
        {
            return ExecuteFunction(() =>
            {
                model.NomeProposta   += "%";
                model.NomeFornecedor += "%";
                var result = service.Pesquisar(model);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Retorna o histórico de mudança da proposta
        /// </summary>
        /// <param name="idProposta">Identificador da proposta</param>
        /// <returns></returns>
        [HttpGet]
        [Route("historico/{idProposta}")]
        public HttpResponseMessage ListarHistorico([FromUri]int idProposta)
        {
            return ExecuteFunction(() =>
            {
                var result = service.ListarHistorico(idProposta);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Aprova a proposta
        /// </summary>
        /// <param name="idProposta">Identificador da proposta</param>
        /// <returns></returns>
        [HttpPut]
        [Route("aprovar/{idProposta}")]
        public HttpResponseMessage AprovarProposta([FromUri]int idProposta)
        {
            return ExecuteFunction(() =>
            {
                var proposta = service.Carregar(idProposta);

                proposta.Status = StatusProposta.Aprovada;
                proposta.IdUsuario = UsuarioCorrente;

                var result = service.AprovarProposta(proposta);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Reprova a proposta
        /// </summary>
        /// <param name="idProposta">Identificador da proposta</param>
        /// <returns></returns>
        [HttpPut]
        [Route("reprovar/{idProposta}")]
        public HttpResponseMessage ReprovarProposta([FromUri]int idProposta)
        {
            return ExecuteFunction(() =>
            {
                var proposta = service.Carregar(idProposta);

                proposta.Status = StatusProposta.Reprovada;
                proposta.IdUsuario = UsuarioCorrente;

                var result = service.ReprovarProposta(proposta);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Grava os dados da proposta
        /// </summary>
        /// <param name="model">dados da proposta</param>
        /// <returns></returns>
        [HttpPost]
        [Route("gravar")]
        public HttpResponseMessage GravarProposta([FromBody]PropostaModel model)
        {
            return ExecuteFunction(() =>
            {
                if (ModelState.IsValid)
                {
                    model.IdUsuario = UsuarioCorrente;
                    var result = service.GravarProposta(model);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                else
                {
                    return ModelInvalidResponse();
                }
            });
        }

        /// <summary>
        /// Efetua upload do arquivo
        /// </summary>
        /// <param name="model">Dados para upload</param>
        /// <returns></returns>
        [HttpPost]
        [Route("upload-file")]
        public HttpResponseMessage Upload([FromBody]UploadArquivoModel model)
        {
            return ExecuteFunction(() =>
            {
                if (ModelState.IsValid)
                {
                    var result = service.SalvarArquivoProposta(model);                    
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                else
                {
                    return ModelInvalidResponse();
                }
            });
        }
    }
}