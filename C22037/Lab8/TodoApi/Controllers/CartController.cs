using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TodoApi.Models;
using TodoApi.Database;
using TodoApi.Business;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private StoreLogic storeLogic = new StoreLogic();
        private SaleDB saleDB = new SaleDB();

        [HttpPost]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
            var sale = storeLogic.Purchase(cart);
            saleDB.Save(sale);
            var response = sale.PurchaseNumber;
            return Ok(response);
        }
    }
}
