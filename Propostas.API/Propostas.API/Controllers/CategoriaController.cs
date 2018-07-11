using Propostas.Lib.Models;
using Propostas.Lib.Service;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Propostas.API.Controllers
{
    /// <summary>
    /// Responsável pelas operações com Categorias
    /// </summary>
    [RoutePrefix("api/categoria")]
    [Authorize]
    public class CategoriaController : MasterApiController
    {
        private readonly CategoriaService service;

        /// <summary>
        /// 
        /// </summary>
        public CategoriaController() => service = new CategoriaService();

        /// <summary>
        /// Carrega uma determinada categoria
        /// </summary>
        /// <param name="id">Identificador da Categoria</param>
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
        /// Grava as modificações da categoria
        /// </summary>
        /// <param name="model">Dados Categoria</param>
        /// <returns></returns>
        [HttpPost]
        [Route("salvar")]
        public HttpResponseMessage Salvar([FromBody]CategoriaModel model)
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
        /// Lista as Categorias
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
        /// Remove uma categoria
        /// </summary>
        /// <param name="id">Identificador da Categoria</param>
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