using API.Entities.Identity;

namespace API.interfaces
{
    public interface IResponseCacheService
    {
        Task CacheReponseAsync(string cacheKey, object response, TimeSpan timeToLive);

        Task<string> GetCachedReponseAsync(string cacheKey);

        Task RemoveCacheAsync(string cacheKey); 
    }
}