using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic; // Asegúrate de incluir este namespace si aún no lo has hecho
namespace MyStoreAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
         private static List<Cart> Carts = new List<Cart>();

        [HttpPost]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
            // Add the cart to the list
            Carts.Add(cart);

            // Return the newly created cart
            return Ok(cart);
        }        
    }
}