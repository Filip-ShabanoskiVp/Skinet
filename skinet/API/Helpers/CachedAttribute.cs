using System.Text;
using API.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class CachedAttribute : Attribute, IAsyncActionFilter
    {
        private readonly int timeToLiveSeounds;
        public CachedAttribute(int timeToLiveSeounds)
        {
            this.timeToLiveSeounds = timeToLiveSeounds;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cachService = context.HttpContext.RequestServices
            .GetRequiredService<IResponseCacheService>();

            var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);

            var cacheReponse = await cachService.GetCachedReponseAsync(cacheKey);

            if(!string.IsNullOrEmpty(cacheReponse))
            {
                var contentResult = new ContentResult
                {
                    Content = cacheReponse,
                    ContentType = "application/json",
                    StatusCode = 200
                };

                context.Result = contentResult;

                return;
            }

            var executedContext = await next();

            if(executedContext.Result is OkObjectResult okObjectResult)
            {
                await cachService.CacheReponseAsync(cacheKey, okObjectResult.Value,
                 TimeSpan.FromSeconds(timeToLiveSeounds));
            }
        }

        private string GenerateCacheKeyFromRequest(HttpRequest request)
        {
            var keyBuilder = new StringBuilder();

            keyBuilder.Append($"{request.Path}");

            foreach(var (key, value) in request.Query.OrderBy(x=>x.Key)) 
            {
                keyBuilder.Append($"|{key}-{value}");
            }   

            return keyBuilder.ToString();
        }
    }
}