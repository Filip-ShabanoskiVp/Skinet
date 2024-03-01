using System.Text.Json;
using API.interfaces;
using StackExchange.Redis;

namespace API.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            this.database = redis.GetDatabase();
        }

        public async Task CacheReponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if( response == null)
            {
                return;
            }

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serializedRespnse = JsonSerializer.Serialize(response,options);

            await database.StringSetAsync(cacheKey, serializedRespnse,timeToLive);

        }

        public async Task<string> GetCachedReponseAsync(string cacheKey)
        {
            var cacheResponse = await database.StringGetAsync(cacheKey);

            if(cacheResponse.IsNullOrEmpty)
            {
                return null;
            }

            return cacheResponse;
        }
    }
}