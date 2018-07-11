using Propostas.Lib.Models;
using Propostas.Lib.Util;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Propostas.API.Controllers
{
    /// <summary>
    ///
    /// </summary>
    public abstract class MasterApiController : ApiController
    {
        /// <summary>
        ///
        /// </summary>
        protected int UsuarioCorrente { get; private set; }

        /// <summary>
        ///
        /// </summary>
        /// <param name="controllerContext"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public override Task<HttpResponseMessage> ExecuteAsync(HttpControllerContext controllerContext, CancellationToken cancellationToken)
        {
            try
            {
                var retorno = base.ExecuteAsync(controllerContext, cancellationToken);

                try
                {
                    if (retorno.Result.StatusCode != HttpStatusCode.OK)
                    {
                        var requestContent = controllerContext.Request.Content.ReadAsStringAsync();
                        requestContent.Wait();
                        string BodyRequest = requestContent.Result;

                        string log = "Url: " + controllerContext.Request.RequestUri.OriginalString + Environment.NewLine + Environment.NewLine +
                                     "Request Method: " + controllerContext.Request.Method + Environment.NewLine +
                                     "Body: " + Environment.NewLine + BodyRequest + Environment.NewLine +
                                     "Response StatusCode: " + retorno.Result.StatusCode.ToString() + Environment.NewLine +
                                     "Usuario Logado: " + UsuarioCorrente + Environment.NewLine;
                        
                        if (retorno.Result.Content != null)
                        {
                            var responseContent = retorno.Result.Content.ReadAsStringAsync();
                            responseContent.Wait();
                            log += " Response Body: " + Environment.NewLine + responseContent.Result + Environment.NewLine;
                        }
                        else
                        {
                            log += " Response Body: Vazio" + Environment.NewLine;
                        }
                        log += Environment.NewLine;

                        LogUtil.ErrorTitulo("Erro na Execução", log);
                    }
                }
                catch (Exception ex)
                {
                    LogUtil.Error(ex);
                }

                return retorno;
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                return null;
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="codigo"></param>
        /// <returns></returns>
        protected HttpResponseMessage ExecuteFunction(Func<HttpResponseMessage> codigo)
        {
            try
            {
                if (User?.Identity?.IsAuthenticated == true)
                {
                    var currentUserId = ((ClaimsIdentity)User.Identity).Claims.FirstOrDefault(x => x.Type == "IdUsuario")?.Value;
                    if (!string.IsNullOrEmpty(currentUserId))
                        UsuarioCorrente = Convert.ToInt32(currentUserId);
                }

                return codigo();
            }
            catch (Exception erro)
            {
                LogUtil.Error(erro);
                return Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new RetornoModel
                    {
                        Sucesso = false,
                        Mensagem = "Ocorreu um erro inesperado. Por favor verifique o arquivo de logs para maiores detalhes."
                    });
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        protected HttpResponseMessage ModelInvalidResponse()
        {
            var retorno = new RetornoModel
            {
                Mensagem = string.Join("; ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage))
            };
            return Request.CreateResponse(HttpStatusCode.BadRequest, retorno);
        }
    }
}