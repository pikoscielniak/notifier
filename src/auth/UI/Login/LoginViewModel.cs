using System.Collections.Generic;

namespace IdSvrHost.UI.Login
{
    public class LoginViewModel : LoginInputModel
    {
        public LoginViewModel()
        {
            ExternalProviders = new List<ExternalProvider>();
        }

        public LoginViewModel(LoginInputModel other)
            : this()
        {
            Username = other.Username;
            Password = other.Password;
            RememberLogin = other.RememberLogin;
            SignInId = other.SignInId;
        }

        public string ErrorMessage { get; set; }

        public IList<ExternalProvider> ExternalProviders { get; }
    }
}