using API.Entities;

namespace Api.Entities
{
    public class CustomeBasket
    {
        public CustomeBasket()
        {
        }

        public CustomeBasket(string id)
        {
            this.Id = id;
        }

        

        public string Id { get; set; }

        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public int? DeliveryMethodId { get; set; }

        public string? ClinetSecret  { get; set; }

        public string? PaymentIntentId { get; set; }

        public decimal ShippingPrice { get; set; }
    }

}
