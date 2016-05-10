namespace Notifier.Web.Models
{
    public class NotifierVm
    {
        public AuthSettings AuthSettings { get; set; }
    }

    public class AuthSettings
    {
        public string ClientId { get; set; }
        public string Authority { get; set; }
    }
}