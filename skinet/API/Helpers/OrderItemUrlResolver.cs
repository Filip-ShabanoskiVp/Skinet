using API.Dtos;
using API.Entities.OrderAggregate;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration config;


        public OrderItemUrlResolver(IConfiguration config)
        {
            this.config = config;

        }


        public string Resolve(OrderItem source, OrderItemDto destination, string destMember,
         ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ItemOrder.PictureUrl))
            {
                return config["ApiUrl"] + source.ItemOrder.PictureUrl;
            }

            return null;
        }

    }
}