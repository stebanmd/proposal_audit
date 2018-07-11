using Propostas.Lib.Models;
using Propostas.Lib.Service;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Propostas.API.Controllers
{
    /// <summary>
    /// Responsável pelas operações com Fornecedores
    /// </summary>
    [RoutePrefix("api/fornecedor")]
    [Authorize]
    public class FornecedorController : MasterApiController
    {
        private readonly FornecedorService service;

        /// <summary>
        /// 
        /// </summary>
        public FornecedorController() => service = new FornecedorService();

        /// <summary>
        /// Carrega um determinado fornecedor
        /// </summary>
        /// <param name="id">Identificador do Fornecedor</param>
        /// <returns></returns>
        [HttpGet]
        [Route("carregar/{id}")]
        public HttpResponseMessage Carregar([FromUri]int id)
        {
            return ExecuteFunction(() =>
            {
                var result = service.Carregar(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Grava os dados do fornecedor
        /// </summary>
        /// <param name="model">dados do fornecedor</param>
        /// <returns></returns>
        [HttpPost]
        [Route("salvar")]
        public HttpResponseMessage Salvar([FromBody]FornecedorModel model)
        {
            return ExecuteFunction(() =>
            {
                if (ModelState.IsValid)
                {
                    var result = service.Salvar(model);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                else
                {
                    return ModelInvalidResponse();
                }
            });
        }

        /// <summary>
        /// Lista os fornecedores
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("listar")]
        public HttpResponseMessage Listar()
        {
            return ExecuteFunction(() =>
            {
                var result = service.Listar();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Remove um determinado fornecedor
        /// </summary>
        /// <param name="id">Identificador do Fornecedor</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("remover/{id}")]
        public HttpResponseMessage Remover([FromUri]int id)
        {
            return ExecuteFunction(() =>
            {
                var result = service.Remover(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }
    }
}