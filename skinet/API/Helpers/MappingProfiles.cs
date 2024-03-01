using Api.Entities;
using API.Dtos;
using API.Entities;
using API.Entities.Identity;
using API.Entities.OrderAggregate;
using AutoMapper;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.ProductBrand,o=> o.MapFrom(s =>s.ProductBrand.Name))
                .ForMember(d =>d.ProductType, o=>o.MapFrom(s=>s.ProductType.Name))
                .ForMember(d =>d.PictureUrl, o=>o.MapFrom<ProductUrlResolver>());
            CreateMap<Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomeBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto,  Entities.OrderAggregate.Address>();
            CreateMap<Order,OrderToReturnDto>()
            .ForMember(d =>d.DeliveryMethod, o=>o.MapFrom(s=>s.DeliveryMethod.ShortName))
            .ForMember(d =>d.ShippingPrice, o=>o.MapFrom(s=>s.DeliveryMethod.Price));
            CreateMap<OrderItem,OrderItemDto>()
                  .ForMember(d =>d.ProductId, o=>o.MapFrom(s=>s.ItemOrder.ProductItemId))
                  .ForMember(d =>d.ProductName, o=>o.MapFrom(s=>s.ItemOrder.ProductName))
                  .ForMember(d =>d.PictureUrl, o=>o.MapFrom(s=>s.ItemOrder.PictureUrl))
                  .ForMember(d =>d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }

    }
}