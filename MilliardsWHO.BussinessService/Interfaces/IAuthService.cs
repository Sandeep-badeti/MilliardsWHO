using MilliardsWHO.DataModel.Entities;
using MilliardsWHO.DTO;
using System;

namespace MilliardsWHO.Services
{
    public interface IAuthService
    {
        public Object Login(Login user);
        public Object Logout(string token);
        public Object InsertUser(LoginDTO postLogin);
    }
}
