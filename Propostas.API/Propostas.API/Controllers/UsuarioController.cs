using Microsoft.Owin.Security.Cookies;
using Propostas.Lib.Models;
using Propostas.Lib.Service;
using Propostas.Lib.Util;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Propostas.API.Controllers
{
    /// <summary>
    /// Responsável por realizar as operações com os Usuários
    /// </summary>
    [RoutePrefix("api/usuario")]
    [Authorize]
    public class UsuarioController : MasterApiController
    {
        private readonly UsuarioService usuarioService;

        /// <summary>
        ///
        /// </summary>
        public UsuarioController() => usuarioService = new UsuarioService();

        /// <summary>
        /// Carrega os dados de um determinado usuário
        /// </summary>
        /// <param name="id">Identificador do usuario</param>
        /// <returns></returns>
        [HttpGet]
        [Route("carregar/{id}")]
        public HttpResponseMessage Carregar([FromUri]int id)
        {
            return ExecuteFunction(() =>
            {
                var result = usuarioService.Carregar(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Salva os dados do usuário
        /// </summary>
        /// <param name="model">dados do usuário</param>
        /// <returns></returns>
        [HttpPost]
        [Route("salvar")]
        public HttpResponseMessage Salvar([FromBody]UsuarioModel model)
        {
            return ExecuteFunction(() =>
            {
                if (ModelState.IsValid)
                {
                    var result = usuarioService.Salvar(model);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                else
                {
                    return ModelInvalidResponse();
                }
            });
        }

        /// <summary>
        /// Lista os usuários
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("listar")]
        public HttpResponseMessage Listar()
        {
            return ExecuteFunction(() =>
            {
                var result = usuarioService.Listar();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Remove um determinado usuário
        /// </summary>
        /// <param name="id">Identificador do usuário</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("remover/{id}")]
        public HttpResponseMessage Remover([FromUri]int id)
        {
            return ExecuteFunction(() =>
            {
                var result = usuarioService.Remover(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Remove a autenticação do usuário
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("logout")]
        public IHttpActionResult Logout()
        {
            try
            {
                var auth = Request.GetOwinContext().Authentication;
                auth.SignOut(CookieAuthenticationDefaults.AuthenticationType);
                return Ok();
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("mudar-senha")]
        public HttpResponseMessage MudarSenha([FromBody]MudarSenhaModel model)
        {
            return ExecuteFunction(() =>
            {
                if (ModelState.IsValid)
                {
                    var result = usuarioService.MudarSenha(model, UsuarioCorrente);
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