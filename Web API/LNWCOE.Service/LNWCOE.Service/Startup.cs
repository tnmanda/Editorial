using LNWCOE.Service.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NLog.Web;
using NLog.Extensions.Logging;

namespace LNWCOE.Service
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;
        protected IConfigurationRoot _configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            env.ConfigureNLog("nlog.config");

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            _configuration = builder.Build();
            _environment = env;

        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMvc()
              .AddJsonOptions(options =>
              {
                  options.SerializerSettings.Formatting = Formatting.Indented;
               });

            services.AddScoped<CustomExceptionFilterAttribute>();

            services.AddSingleton(_configuration);

            
            services.AddApiVersioning(o => {
                o.ReportApiVersions = true;
                o.AssumeDefaultVersionWhenUnspecified = true;
                o.DefaultApiVersion = new ApiVersion(1, 0);
            });
            

            Services.ServiceRegistration.RegisterServices(services, _configuration);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            SetupLogging(loggerFactory, app);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

           

            app.UseExceptionHandler("/Error");

            app.UseAuthentication();

            
            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            //.AllowCredentials()
            );

            app.UseMvc();
            
        }

        protected void SetupLogging(ILoggerFactory loggerFactory, IApplicationBuilder app)
        {
            loggerFactory.AddNLog();
            NLog.LogManager.Configuration.Variables["DBConnectionString"] = _configuration["ConnectionStrings:LNWCOEDB"];
        }

    }
}
