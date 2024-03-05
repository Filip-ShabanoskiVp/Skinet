using Api.Entities;
using Microsoft.AspNetCore.Mvc;
using API.interfaces;
using API.Entities;
using API.specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;
using API.Helpers;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> productsRepo;
        private readonly IGenericRepository<ProductBrand> productBrandRepo;
        private readonly IGenericRepository<ProductType> productTypeRepo;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IResponseCacheService responseCache;

        public ProductsController(IGenericRepository<Product> productsRepo,
        IGenericRepository<ProductBrand> productBrandRepo,
         IGenericRepository<ProductType> productTypeRepo,
         IMapper mapper, IUnitOfWork unitOfWork, IResponseCacheService responseCache)
        {
            this.productsRepo = productsRepo;
            this.productBrandRepo = productBrandRepo;
            this.productTypeRepo = productTypeRepo;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.responseCache = responseCache;
        }

        // [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts(
            [FromQuery] ProductSpecParams productSpecParams){

            var spec = new ProductsWithTypesAndBrandsSpecification(productSpecParams);
            var countSpec = new ProductsWithFiltersForCountSpecification(productSpecParams);

            var totalItems = await productsRepo.CountAsync(countSpec);
            var products = await productsRepo.ListAsync(spec);

            var data = mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);

              return Ok(new Pagination<ProductToReturnDto>(productSpecParams.PageIndex,
              productSpecParams.PageSize, totalItems,data));
        }

        // [Cached(600)]
        [HttpGet("{id}")]  
        [ProducesResponseType(StatusCodes.Status200OK)] 
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>>GetProduct(int id){

            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product  =  await productsRepo.GetEntityWithSpec(spec);

            if(product == null){
                return NotFound(new ApiResponse(404));
            }

            return mapper.Map<Product, ProductToReturnDto>(product);
        }

        // [Cached(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductsBrands(){

            var productsBrands = await productBrandRepo.ListAllAsync();

            return Ok(productsBrands);
        }

        // [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductsTypes(){

            var productsTypes = await productTypeRepo.ListAllAsync();

            return Ok(productsTypes);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProdict([FromBody] Product product)
        {
            unitOfWork.Repository<Product>().Add(product);

            await unitOfWork.Complete();
            return product;
        }

        [HttpDelete("{id}")]
        public async Task DeleteProduct(int id)
        {
            Product product = await productsRepo.GetByIdAsync(id);

            if(product == null)
            {
                 NotFound(new ApiResponse(404,"Prodcut is not found!"));
            }else {
                 unitOfWork.Repository<Product>().Delete(product);
                 await unitOfWork.Complete();

                 await responseCache.RemoveCacheAsync("ProductsCacheKey");

            }
        }
    }
}