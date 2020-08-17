namespace MilliardsWHO.Services
{
   public interface IMailService
    {
        void SendMail(string Message, string InnerException, string StackTrace);
        void SendMail(string Message);
    }
}
