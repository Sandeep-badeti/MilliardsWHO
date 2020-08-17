using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using NLog.Web;
using System;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore;
using NLog.Extensions.Logging;

namespace WebApiSol
{
    public class Program
    {
       
        public static void Main(string[] args)
        {
            var logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
            try
            {
                logger.Debug("init main function");
                CreateWebHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                logger.Error(ex, "Error in init");
                throw;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
                 WebHost.CreateDefaultBuilder(args)
                 .ConfigureLogging((hostingcontext, logging) =>
                 {
                     logging.AddConfiguration(hostingcontext.Configuration.GetSection("Logging"));
                     logging.AddConsole();
                     logging.AddDebug();
                     logging.AddEventSourceLogger();
                     logging.AddNLog();
                 })
                     .UseStartup<Startup>();
    }
}
