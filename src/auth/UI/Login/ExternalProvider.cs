namespace IdSvrHost.UI.Login
{
    public class ExternalProvider
    {
        public ExternalProvider(string authenticationScheme, string text)
        {
            AuthenticationScheme = authenticationScheme;
            Text = text;
        }

        public string AuthenticationScheme { get; }
        public string Text { get; }

        public static ExternalProvider Google => new ExternalProvider("Google", "Google");
    }
}