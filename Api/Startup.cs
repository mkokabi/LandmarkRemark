using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Tigerspike.LandmarkRemark.Common;
using Tigerspike.LandmarkRemark.Data;
using Tigerspike.LandmarkRemark.Services;

namespace Api
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
            services.AddControllers();

            var secret = Configuration["Secret"];
            var key = Encoding.ASCII.GetBytes(secret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddDbContext<LandmarkRemarkContext>(optionsBuilder =>
                optionsBuilder.UseSqlServer(
                    Configuration.GetConnectionString("LandmarkRemarkDb"),
                    x => x.MigrationsAssembly("Tigerspike.LandmarkRemark.Api").UseNetTopologySuite()));

            services.AddScoped<IUserService, UserServices>();
            services.AddScoped<ICrypto, Crypto>();

            services.AddScoped<IRemarkService, RemarkServices>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    internal class Crypto : ICrypto
    {
        public string Decrypt(string encrypted)
        {
            throw new System.NotImplementedException();
        }

        public string Encrypt(string plainText)
        {
            throw new System.NotImplementedException();
        }

        public string Hash(string input)
        {
            return input;
        }
    }
}
