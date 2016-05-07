using IdentityModel;
using IdentityServer4.Core;
using IdentityServer4.Core.Services;
using Microsoft.AspNet.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Http.Authentication;

namespace IdSvrHost.UI.Login
{
    public class LoginController : Controller
    {
        private readonly LoginService _loginService;
        private readonly SignInInteraction _signInInteraction;

        public LoginController(
            LoginService loginService,
            SignInInteraction signInInteraction)
        {
            _loginService = loginService;
            _signInInteraction = signInInteraction;
        }

        [HttpGet(Constants.RoutePaths.Login, Name = "Login")]
        public async Task<IActionResult> Index(string id)
        {
            var vm = new LoginViewModel();
            vm.ExternalProviders.Add(ExternalProvider.Google);

            //var loginProviders = HttpContext.Authentication.GetAuthenticationSchemes().ToList();

            if (id != null)
            {
                var request = await _signInInteraction.GetRequestAsync(id);
                if (request != null)
                {
                    vm.Username = request.LoginHint;
                    vm.SignInId = id;
                }
            }

            return View(vm);
        }

        [HttpPost(Constants.RoutePaths.Login)]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(LoginInputModel model)
        {
            if (ModelState.IsValid)
            {
                if (_loginService.ValidateCredentials(model.Username, model.Password))
                {
                    var user = _loginService.FindByUsername(model.Username);

                    var name = user.Claims.Where(x => x.Type == JwtClaimTypes.Name)
                        .Select(x => x.Value).FirstOrDefault() ?? user.Username;

                    var claims = new[] {
                        new Claim(JwtClaimTypes.Subject, user.Subject),
                        new Claim(JwtClaimTypes.Name, name),
                        new Claim(JwtClaimTypes.IdentityProvider, "idsvr"),
                        new Claim(JwtClaimTypes.AuthenticationTime, DateTime.UtcNow.ToEpochTime().ToString())
                    };
                    var ci = new ClaimsIdentity(claims, "password", JwtClaimTypes.Name, JwtClaimTypes.Role);
                    var cp = new ClaimsPrincipal(ci);

                    await HttpContext.Authentication.SignInAsync(Constants.PrimaryAuthenticationType, cp);

                    if (model.SignInId != null)
                    {
                        return new SignInResult(model.SignInId);
                    }

                    return Redirect("~/");
                }

                ModelState.AddModelError("", "Invalid username or password.");
            }

            var vm = new LoginViewModel(model);
            return View(vm);
        }

        public IActionResult ExternalLogin(string provider, string signInId)
        {
            var props = new AuthenticationProperties
            {
                RedirectUri = "/login/callback?signInId=" + signInId
            };

            return new ChallengeResult(provider, props);
        }

        public async Task<IActionResult> Callback(string signInId)
        {
            var external = await HttpContext.Authentication.AuthenticateAsync("External");
            //todo create or get local account match by email         
            //for now alice is hardcoded            
            var subject = "818727";//todo you get this after you create or get local user
            var name = "alice";
            var claims = new[] {
                        new Claim(JwtClaimTypes.Subject, subject),
                        new Claim(JwtClaimTypes.Name, name),
                        new Claim(JwtClaimTypes.IdentityProvider, "idsvr"),
                        new Claim(JwtClaimTypes.AuthenticationTime, DateTime.UtcNow.ToEpochTime().ToString())
                    };

            var ci = new ClaimsIdentity(claims, "password", JwtClaimTypes.Name, JwtClaimTypes.Role);
            var cp = new ClaimsPrincipal(ci);

            await HttpContext.Authentication.SignInAsync(Constants.PrimaryAuthenticationType, cp);
            await HttpContext.Authentication.SignOutAsync("External");

            if (signInId != null)
            {                
                return new SignInResult(signInId);
            }

            return Redirect("~/");
        }
    }
}
