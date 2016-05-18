using Microsoft.AspNetCore.Mvc;
using Notifier.Web.Models;

namespace Notifier.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly AuthSettings _authSettings;

        public HomeController(AuthSettings authSettings)
        {
            _authSettings = authSettings;
        }

        public IActionResult Index()
        {
            var vm = new NotifierVm {AuthSettings = _authSettings};
            return View(vm);
        }
    }
}