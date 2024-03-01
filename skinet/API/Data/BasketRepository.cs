using System.Text.Json;
using Api.Entities;
using API.interfaces;
using StackExchange.Redis;

namespace API.Data
{
    public class BasketRepository : IBasketRepository
    {

        private readonly IDatabase database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            database = redis.GetDatabase();
        }


        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await database.KeyDeleteAsync(basketId); 
        }

        public async Task<CustomeBasket> GetBasketAsync(string basketId)
        {
            var data = await database.StringGetAsync(basketId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomeBasket>(data);
        }

        public async Task<CustomeBasket> UpdateBasketAsync(CustomeBasket basket)
        {
            var created = await database.StringSetAsync(basket.Id,
             JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));

             if(!created) return null;

             return await GetBasketAsync(basket.Id);

        }

    }
}