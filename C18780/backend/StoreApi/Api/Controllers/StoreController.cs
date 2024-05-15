using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreApi.Cache;
using StoreApi.Models;
using StoreApi.Queries;
using StoreApi.Search;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public sealed class StoreController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly CategoryController categoryController;
        private CategoriesCache categoriesCache;
        private ProductsCache productsCache = ProductsCache.GetInstance();
        public StoreController(IMediator mediator, CategoryController categoryController)
        {
            if (mediator == null)
            {
                throw new ArgumentException("Illegal action, the mediator is being touched. The mediator is null and void.");
            }
            this.mediator = mediator;
            this.categoryController = categoryController;
            categoriesCache = CategoriesCache.GetInstance();
        }
        [HttpGet("Products")]
        public async Task<Store> GetStoreAsync(string category, string search)
        {
            IEnumerable<Product> products;
            //Paso 1: Guardo los productos en memoria para no volver a pedirlos a base de datos
            if (!productsCache.exists())
            {
                var productsList = await mediator.Send(new GetProductListQuery());
                productsCache.setProduct(productsList);
            }
            //Paso 2: Filtro los productos por su categoria
            if (!category.Equals("All"))
            {
                products = productsCache.GetProduct(categoriesCache.GetCategoryByName(category).Uuid);
            }
            else
            {
                products = productsCache.getAll();
            }
            //Paso 3: Filtro los productos por el search
            if (!search.Equals("none"))
            {
                ProductSearch productSearch = new ProductSearch(products);
                products = productSearch.Search(search);
            }

            return new Store(products);
        }
    }
}