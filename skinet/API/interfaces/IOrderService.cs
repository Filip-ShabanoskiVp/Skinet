using Api.Entities;
using API.Entities.OrderAggregate;

namespace API.interfaces
{
    public interface IOrderService 
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int delivaryMethod, string basketId,
         Address ShippingAddress);

         Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);

         Task<Order> GetOrderByIdAsync(int id, string buyerEmail);

         Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}