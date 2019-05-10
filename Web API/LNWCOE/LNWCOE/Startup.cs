using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using LNWCOE.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Serilog;
using LNWCOE.Interface;
using LNWCOE.Repository;


using Swashbuckle.AspNetCore.Swagger;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace LNWCOE
{
    public class Startup
    {

        private readonly IHostingEnvironment _environment;
        protected IConfigurationRoot _configuration { get; }

        public Startup(IHostingEnvironment environment)
        {
            ;
            var builder = new ConfigurationBuilder()
                .SetBasePath(environment.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{environment.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            _configuration = builder.Build();
            _environment = environment;

            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(_configuration).CreateLogger();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Auth
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                string TokenKey = _configuration.GetSection("TokenValues:key").Value;
                string TokenIssuer = _configuration.GetSection("TokenValues:issuer").Value;
                string TokenAudience = _configuration.GetSection("TokenValues:audience").Value;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = TokenIssuer,
                    ValidAudience = TokenAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenKey))
                };
            });

            // DB
            services.AddDbContext<AppDbContext>(options => options
                .UseSqlServer(_configuration.GetConnectionString("LNWCOEDB")) //.UseLazyLoadingProxies()  // if we go lazyload
                );

            services.AddDbContext<MMMDBContext>(options => options
                .UseSqlServer(_configuration.GetConnectionString("MMMDB"))
                );

            services.AddDbContext<NEWSDBContext>(options => options
                .UseSqlServer(_configuration.GetConnectionString("NewsFeedDB"))
                );

            // If go repo 
            //services.AddTransient<IRoleTypeRepository, RoleTypeRepository>();

            services.AddLogging(loggingBuilder => loggingBuilder.AddSerilog(dispose: true));

            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Editorial Web API", Version = "v1" });
               
            });

            
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                      builder =>
                      {
                          builder.AllowAnyOrigin();
                      });
                options.AddPolicy("AllowAllMethods",
                    builder =>
                    {
                        //builder.WithOrigins("http://localhost")
                        builder.AllowAnyMethod();
                    });
                options.AddPolicy("AllowAllHeaders",
                    builder =>
                    {
                        //builder.WithOrigins("http://localhost")
                        builder.AllowAnyHeader();
                    });

            });
            

            services.AddMvc()
               .AddJsonOptions(options =>
               {
                   options.SerializerSettings.Formatting = Formatting.Indented;

                   // avoid the camel casing for returned json
                   //options.SerializerSettings.ContractResolver = new DefaultContractResolver(); 
                   
                   //options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler("/Error");
           
            loggerFactory.AddSerilog();

            app.UseAuthentication();
            
            app.UseCors(builder => builder 
            .AllowAnyOrigin() 
            .AllowAnyMethod() 
            .AllowAnyHeader() 
            .AllowCredentials());

            app.UseMvc();

        }
    }
}
