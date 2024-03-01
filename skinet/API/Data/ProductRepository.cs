using Api.Data;
using Api.Entities;
using API.Entities;
using API.interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext context;
        public ProductRepository(StoreContext context)
        {
            this.context = context;
        }


        public async Task<IReadOnlyList<Product>> GetProductAsync()
        {

            return await context.Products
            .Include(p => p.ProductBrand )
            .Include(p => p.ProductType)
            .ToListAsync();
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await context.ProductBrands.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await context.ProductTypes.ToListAsync();
        }


        public async Task<Product> GetProdutByIdAsync(int id)
        {
            
            return await context.Products
                 .Include(p => p.ProductBrand )
                 .Include(p => p.ProductType )
                 .FirstOrDefaultAsync(p => p.Id==id);
        }

    }
}