using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(x=> {
                x.SwaggerDoc("v1", new OpenApiInfo{Title = "SkiNet Api", Version = "v1"});

                var securityShema = new OpenApiSecurityScheme
                {
                    Description = "JWT Auth Bearer Scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };
                x.AddSecurityDefinition("Bearer",securityShema);

                var securityRequirement = new OpenApiSecurityRequirement{{securityShema, new []
                {"Bearer"}}};
                x.AddSecurityRequirement(securityRequirement);
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
           app.UseSwagger();
           app.UseSwaggerUI(x => {x
                .SwaggerEndpoint("/swagger/v1/swagger.json","SkiNet API v1");}); 
           return app;
        }
    }
}