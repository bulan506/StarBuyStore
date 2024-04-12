using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TodoApi.Models;
using TodoApi.Database;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly SaleDB sale = new SaleDB();

        [HttpPost]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
            string purchaseNumber = Sale.GenerateNextPurchaseNumber();
            int paymentMethod = (int)cart.PaymentMethod;
            sale.save(DateTime.Now, cart.Total, paymentMethod, purchaseNumber);
            // Add the cart to the list
            return Ok(cart);
        }
    }
}