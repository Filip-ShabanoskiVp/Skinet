using Api.Entities;
using API.Entities.OrderAggregate;

namespace API.interfaces
{
    public interface IPaymentService 
    {
        Task<CustomeBasket> CreateOrUpdatePaymentIntent(string basketId);

        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);

        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}