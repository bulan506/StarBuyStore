using Microsoft.AspNetCore.Mvc;
using StoreApi.Models;
using System;
using System.Collections.Generic;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private static List<Cart> Carts = new List<Cart>();

        public CartController()
        {
            _cartHandler = new CartHandler();
        }

        [HttpPost]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
            Carts.Add(cart);

            return Ok(cart);
        }
    }

}