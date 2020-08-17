using Microsoft.Extensions.Configuration;
using MilliardsWHO.Services;
using System;
using System.Net.Mail;

namespace MilliardsWHO.iConfiguration
{
    public class MailService : IMailService
    {
        private IConfiguration iConfiguration;
        public MailService(IConfiguration iConfiguration)
        {
            this.iConfiguration = iConfiguration;
        }
        public void SendMail(string message, string innerException, string stackTrace)
        {
            string mailMessage = string.Empty;
            mailMessage += (!string.IsNullOrEmpty(message)) ? iConfiguration["MESSAGE"] + message + iConfiguration["DOUBLE_BR"] : "";
            mailMessage += (!string.IsNullOrEmpty(innerException)) ? iConfiguration["INNEREXCEPTION"] + innerException + iConfiguration["DOUBLE_BR"] : "";
            mailMessage += (!string.IsNullOrEmpty(stackTrace)) ? iConfiguration["STACKTRACE"] + stackTrace + iConfiguration["DOUBLE_BR"] : "";
            SendMail(mailMessage);
        }
        public void SendMail(string message)
        {
            string senderMailId = string.Empty,
                recipientMailId = string.Empty,
                mailSubject = string.Empty,
                host = string.Empty,
                portNo = string.Empty,
                senderMailPWD = string.Empty;

            AuthService authService = new AuthService(iConfiguration);
            senderMailId = authService.Decrypt(iConfiguration["senderMailId"]);
            recipientMailId = iConfiguration["recipientMailId"];
            mailSubject = iConfiguration["mailSubject"];
            host = iConfiguration["host"];
            portNo = iConfiguration["portNo"];
            senderMailPWD = authService.Decrypt(iConfiguration["senderMailPWD"]);

            try
            {
                MailMessage mailMessage = new MailMessage();
                foreach (string ToAddress in recipientMailId.Split(','))
                {
                    mailMessage.To.Add(ToAddress);
                }
                mailMessage.From = new MailAddress(senderMailId);
                mailMessage.Body = message;
                mailMessage.IsBodyHtml = true;
                mailMessage.Subject = mailSubject;
                SmtpClient smtpClient = new SmtpClient(host, int.Parse(portNo));
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new System.Net.NetworkCredential(senderMailId, senderMailPWD);
                smtpClient.EnableSsl = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                LogService LogService = new LogService(iConfiguration);
                LogService.LogException(ex);
            }
        }
    }
}
