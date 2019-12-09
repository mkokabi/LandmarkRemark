using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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

            services.AddDbContext<LandmarkRemarkContext>(optionsBuilder =>
                optionsBuilder.UseSqlServer(
                    Configuration.GetConnectionString("LandmarkRemarkDb"),
                    x => x.MigrationsAssembly("Tigerspike.LandmarkRemark.Api").UseNetTopologySuite()));

            services.AddScoped<IUserService, UserServices>();
            services.AddScoped<ICrypto, Crypto>();
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
