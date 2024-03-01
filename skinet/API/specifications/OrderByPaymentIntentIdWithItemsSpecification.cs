using System.Linq.Expressions;
using API.Entities.OrderAggregate;

namespace API.specifications
{
    public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId)
         : base(o=>o.PaymentIntentId == paymentIntentId)
        {
        }

    }
}