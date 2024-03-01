using Api.Entities;
using API.specifications;

namespace API.interfaces
{
    public interface IBasketRepository 
    {
        Task<CustomeBasket> GetBasketAsync(string basketId);

        Task<CustomeBasket> UpdateBasketAsync(CustomeBasket basket);

        Task<bool> DeleteBasketAsync(string basketId);
    }
}