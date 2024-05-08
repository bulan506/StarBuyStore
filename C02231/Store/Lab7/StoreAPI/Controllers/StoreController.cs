using Microsoft.AspNetCore.Mvc;
using StoreAPI.models;
using System;
using System.Collections.Generic;

namespace StoreAPI.Controllers
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
        public IEnumerable<Product> GetCategories([FromQuery] int category)
        {
            if (category <= -1)
                throw new ArgumentException($"The {nameof(category)} number must positive");
            return Store.Instance.CategoryProducts(category);
        }
    }

}
