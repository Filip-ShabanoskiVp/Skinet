using Api.Entities;

namespace API.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
            
        }

        public OrderItem(ProductItemOrder itemOrder, decimal price, int quantity) 
        {
                ItemOrder = itemOrder;
                Price = price;
                Quantity = quantity;
               
        }
        public ProductItemOrder ItemOrder { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}