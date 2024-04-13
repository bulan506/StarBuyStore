using Microsoft.AspNetCore.Mvc;
using Store_API.Models;
using Store_API.Database;

namespace Store_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        [HttpPost]
        [Consumes("application/json")]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
           
            string successPurchase = DB_API.InsertSale(cart);

            return Ok(new { successPurchase });
            
           
        }
    }
}