using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MilliardsWHO.BussinessService.Interfaces;
using MilliardsWHO.BussinessService.Utilities;
using MilliardsWHO.DataModel.DataContext;
using MilliardsWHO.Services;
using System;

namespace WebApiSol
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(
                  "CorsPolicy",
                  builder => builder.WithOrigins(Configuration["ServiceUrls:AngularUrl"]) //local url
                 /* builder => builder.WithOrigins(Configuration["ServiceUrls:QAUrl"])*///qa url
                  //builder => builder.WithOrigins(iConfiguration["ServiceUrls:AngularUrl"],iConfiguration["ServiceUrls:QAUrl"])//Angular + QA url
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
            });
            services.AddMvc();

            var constr = Configuration.GetConnectionString("milliardsContext");
            services.AddDbContextPool<AppDbContext>(
            options => options.UseSqlServer(constr));
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUtilities, Utilities>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Milliards", Version = "v1" });
            });

            services.AddControllers();
            services.AddSingleton<IConfiguration>(Configuration);
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
   {
       c.SwaggerEndpoint("/swagger/v1/swagger.json", "Milliards API V1");
   });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
