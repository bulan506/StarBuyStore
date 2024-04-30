using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using KEStoreApi.Bussiness;

namespace KEStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
         private StoreLogic storeLogic = new StoreLogic();

       
        [HttpPost]
        public async Task<IActionResult> CreateCart([FromBody] Cart cart)
        {
           var saleTask = storeLogic.Purchase(cart);
           var sale = await saleTask;
           var purchaseNumber = sale.PurchaseNumber;
                var response = new {purchaseNumber=purchaseNumber};
                return Ok(response);    
        }
    }

}