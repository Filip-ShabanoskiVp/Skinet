using System.Text.Json;
using Api.Data;
using Api.Entities;
using API.Entities;
using API.Entities.OrderAggregate;

namespace API.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory){
            try
            {
                if(!context.ProductBrands.Any()){
                    var brandsData = File.ReadAllText("../API/Data/seedData/brands.json");


                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach(var item in brands){
                        context.ProductBrands.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if(!context.ProductTypes.Any()){
                    var typesData = File.ReadAllText("../API/Data/seedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach(var item in types){
                        context.ProductTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                

                 if(!context.Products.Any()){
                    var productsData =
                     File.ReadAllText("../API/Data/seedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                       foreach(var item in products)
                       {
                            context.Products.Add(item);
                       }

                    await context.SaveChangesAsync();
                }

                 if(!context.DeliveryMethods.Any()){
                    var dmData =
                     File.ReadAllText("../API/Data/seedData/delivery.json");

                    var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                       foreach(var item in methods)
                       {
                            context.DeliveryMethods.Add(item);
                       }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}