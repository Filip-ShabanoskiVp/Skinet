using Api.Entities;
using API.Entities;

namespace API.interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProdutByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductAsync();
        Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();

        Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
    }
}