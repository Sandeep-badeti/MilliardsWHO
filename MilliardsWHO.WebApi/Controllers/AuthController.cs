using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MilliardsWHO.BussinessService.Interfaces;
using MilliardsWHO.DataModel.DataContext;
using MilliardsWHO.DataModel.Entities;
using MilliardsWHO.DTO;
using MilliardsWHO.Services;
using System;
using System.Linq;

namespace MilliardsWHO.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private IAuthService iAuthService;
        private readonly AppDbContext context;
        private IUtilities iUtilities;
        public AuthController(AppDbContext context, IAuthService iAuthService, IUtilities iUtilities)
        {
            this.context = context;
            this.iAuthService = iAuthService;
            this.iUtilities = iUtilities;
        }
        [HttpPost]
        [ActionName("login")]
        public ActionResult<Object> Login(Login user)
        {
            try
            {
                if (user == null)
                {
                    return BadRequest("Invalid request.");
                }
                if (context.Login.Any(x => x.UserName == user.UserName) && context.Login.Any(x => x.Password == iUtilities.Encrypt(user.Password)))
                {
                    var loginUser = iAuthService.Login(user);
                    return Ok(loginUser);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return string.Format("Exception Message:{0}\n\nInnerException: {1}\n\n", ex.Message ?? "", ex.InnerException != null ? ex.InnerException.Message ?? "" : "");
            }
        }
        [HttpGet]
        [ActionName("logout")]
        public ActionResult<Object> Logout()
        {
            string token = Request.Headers["access-token"].First();
            var result = iAuthService.Logout(token);
            return Ok(result);
        }
        [AllowAnonymous]
        [HttpPost]
        [ActionName("UserRegistration")]
        public ActionResult<Object> InsertUser(LoginDTO postLogin)
        {
            var user = iAuthService.InsertUser(postLogin);
            return Ok(user);
        }

    }
}