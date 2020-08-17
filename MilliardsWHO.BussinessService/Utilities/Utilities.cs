using Microsoft.Extensions.Configuration;
using MilliardsWHO.BussinessService.Interfaces;
using System;
using System.Security.Cryptography;
using System.Text;

namespace MilliardsWHO.BussinessService.Utilities
{
    public class Utilities :IUtilities
    {
        private IConfiguration iConfiguration;
        public Utilities(IConfiguration iConfiguration)
        {
            this.iConfiguration = iConfiguration;
        }
        //Uused for Encrypting password 
        public string Encrypt(string password)
        {
            var key = iConfiguration["Ukey"];
            byte[] srctArray;
            byte[] enctArray = UTF8Encoding.UTF8.GetBytes(password);
            TripleDESCryptoServiceProvider tripleDesc = new TripleDESCryptoServiceProvider();
            MD5CryptoServiceProvider mdCrypt = new MD5CryptoServiceProvider();
            srctArray = mdCrypt.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
            mdCrypt.Clear();
            tripleDesc.Key = srctArray;
            tripleDesc.Mode = CipherMode.ECB;
            tripleDesc.Padding = PaddingMode.PKCS7;
            ICryptoTransform iCryptoTransform = tripleDesc.CreateEncryptor();
            byte[] resArray = iCryptoTransform.TransformFinalBlock(enctArray, 0, enctArray.Length);
            tripleDesc.Clear();
            return Convert.ToBase64String(resArray, 0, resArray.Length);
        }
    }
}
