
using Microsoft.AspNet.Mvc;

namespace Notifier.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}