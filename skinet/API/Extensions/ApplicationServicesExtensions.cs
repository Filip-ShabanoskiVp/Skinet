using API.Data;
using API.Errors;
using API.interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IResponseCacheService, ResponseCacheService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductRepository,ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));

            services.Configure<ApiBehaviorOptions>(options => {
            options.InvalidModelStateResponseFactory = actioncontext =>{
       
            var errors = actioncontext.ModelState.Where(error => 
            error.Value.Errors.Count > 0).SelectMany(x =>x.Value.Errors)
            .Select(x=>x.ErrorMessage).ToArray();

            var errorRespnse = new ApiValidationErrorResponse
            {
                Errors = errors
            };

            return new BadRequestObjectResult(errorRespnse);
                };
            });

            return services;
        }
    }
}