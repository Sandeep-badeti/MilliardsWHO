using System;

namespace MilliardsWHO.Services
{
    interface ILogService
    {
        public void LogException(string ErrorMessage);
        public void LogException(Exception ex);
    }
}
