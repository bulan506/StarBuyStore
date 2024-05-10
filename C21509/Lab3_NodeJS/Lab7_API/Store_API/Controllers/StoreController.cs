using Microsoft.AspNetCore.Mvc;
using Store_API.Models;

namespace Store_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        [HttpGet]
        public Store GetStore()
        {
            return Store.Instance;
        }

       [HttpGet("Products")]
        public IEnumerable<Product> GetCategories([FromQuery] int categoryId)
        {
            if (categoryId < 1)
                throw new ArgumentException($"The {nameof(categoryId)} cannot be less than 1");

            return Store.Instance.Products.Where(p => p.IdCategory.IdCategory == categoryId);
        }
    }

}