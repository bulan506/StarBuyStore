using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using ShopApi.Models;
using ShopApi.db;


namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        // private StoreLogic storeLogic = new StoreLogic();
        private static List<Cart> carts = new List<Cart>();

        [HttpPost]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
            // var sale = storeLogic.Purchase(cart);
            // var purchaseNumber = sale.PurchaseNumber;
            carts.Add(cart);

            // var response = new {purchaseNumber=purchaseNumber};

            StoreDB.CreateMysql();
            return Ok("Si funciona");
        }
    }

}