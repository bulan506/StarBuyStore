using Microsoft.AspNetCore.Mvc;
using StoreAPI.Business;
using StoreAPI.models;
using System;
using System.Collections.Generic;

namespace StoreAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private StoreLogic storeLogic = new StoreLogic();

        [HttpPost]
        public IActionResult CreateCart([FromBody] Cart cart)
        {

            List<int> productIds = new List<int>();
            List<decimal> finalPrices = new List<decimal>();
            var sale = storeLogic.Purchase(cart);

            foreach (var product in sale.Products)
            {
                productIds.Add(product.Id);
                finalPrices.Add(product.Price);
            }

            var response = new { purchaseNumber = sale.NumberOrder };
            return Ok(response);
        }
    }

}