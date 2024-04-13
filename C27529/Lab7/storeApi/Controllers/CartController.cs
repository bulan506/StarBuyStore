using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using storeApi.Models;
using storeApi.dataBase;
using storeApi.Business;
using storeApi.Database;


namespace storeApi.Controllers
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

            //store.INSTANCE.PURCHASE(CART)

            int numeroCOmpra = 1;
            return Ok(numeroCOmpra);
        }
    }

}