using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MilliardsWHO.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using MilliardsWHO.DataModel.Entities;
using MilliardsWHO.DataModel.DataContext;

namespace MilliardsWHO.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext context;
        private IConfiguration iConfiguration;
        public AuthService(IConfiguration iConfiguration)
        {
            this.iConfiguration = iConfiguration;
        }
        public AuthService(AppDbContext context, IConfiguration iConfiguration)
        {
            this.context = context;
            this.iConfiguration = iConfiguration;
        }

        // user login
        public Object Login(Login user)
        {
            try
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(iConfiguration["JWT:key"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: iConfiguration["JWT:Issuer"],
                    audience: iConfiguration["JWT:Audience"],
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                var userData = context.Login.Where(x => x.UserName.ToLower() == user.UserName.ToLower()).FirstOrDefault();
                userData.Token = tokenString;
                userData.ExpireTime = DateTime.Now.AddMinutes(30);
                context.Login.Update(userData);
                context.SaveChanges();
                context.Dispose();
                user.Password = "";
                user.FirstName = userData.FirstName;
                user.LastName = userData.LastName;
                user.EmailAddress = userData.EmailAddress;
                user.Token = tokenString;
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // user logout
        public Object Logout(string token)
        {
            try
            {
                if (token != null)
                {
                    var userData = context.Login.Where(x => x.Token == token).FirstOrDefault();
                    if (userData != null)
                    {
                        userData.Token = "";
                        context.SaveChanges();
                    }
                }
                return new { Logout = true };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // inserting user
        public Object InsertUser(LoginDTO postLogin)
        {
            var message = string.Empty;
            try
            {
                context.Login.Add(new Login()
                {
                    FirstName = postLogin.FirstName,
                    LastName = postLogin.LastName,
                    CreatedTime = DateTime.UtcNow,
                    EmailAddress = postLogin.EmailAddress,
                    Password = Encrypt(postLogin.Password),
                    UserName = postLogin.UserName,
                });
                context.SaveChanges();
                context.Dispose();
                message = iConfiguration["DATA_INSERTED_SUCCESSFUL"];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return new { Token = message };
        }
        // Encrypt  password
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
            ICryptoTransform crptotrns = tripleDesc.CreateEncryptor();
            byte[] resArray = crptotrns.TransformFinalBlock(enctArray, 0, enctArray.Length);
            tripleDesc.Clear();
            return Convert.ToBase64String(resArray, 0, resArray.Length);
        }
        // Decrypt  password
        public string Decrypt(string password)
        {
            var key = iConfiguration["Ukey"];
            byte[] srctArray;
            byte[] enctArray = Convert.FromBase64String(password);
            TripleDESCryptoServiceProvider tripleDesc = new TripleDESCryptoServiceProvider();
            MD5CryptoServiceProvider mdCrypt = new MD5CryptoServiceProvider();
            srctArray = mdCrypt.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
            tripleDesc.Key = srctArray;
            tripleDesc.Mode = CipherMode.ECB;
            tripleDesc.Padding = PaddingMode.PKCS7;
            ICryptoTransform crptotrns = tripleDesc.CreateDecryptor();
            byte[] resArray = crptotrns.TransformFinalBlock(enctArray, 0, enctArray.Length);
            tripleDesc.Clear();
            return UTF8Encoding.UTF8.GetString(resArray);
        }
    }
}
