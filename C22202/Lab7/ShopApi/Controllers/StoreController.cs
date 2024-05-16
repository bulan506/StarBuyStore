using Microsoft.AspNetCore.Mvc;
using ShopApi.Models;
using System;
using System.Collections.Generic;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        [HttpGet]
        public Store GetStore()
        {
            return Store.Instance ;
        }

        [HttpGet("Products")]
        public IEnumerable<Product> GetCategories([FromQuery] int category)
        {
            if (category < 0) throw new ArgumentException($"The {nameof(category)} number must be greater than 0");

            // Store.Instance.GetProductsCategory(category);
            return ProductsLogic.Instance.GetProductsCategory(category);
        }
    }

}