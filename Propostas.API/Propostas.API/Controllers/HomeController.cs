using System.Web.Mvc;

namespace Propostas.API.Controllers
{
    /// <summary>
    ///
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        ///
        /// </summary>
        public ActionResult Index()
        {
            return RedirectToRoute("HelpPage_Default");
        }
    }
}