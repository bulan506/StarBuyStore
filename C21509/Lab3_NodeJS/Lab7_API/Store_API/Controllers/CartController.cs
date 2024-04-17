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
    
            DB_API dbApi = new DB_API();
            
            string successPurchase = dbApi.InsertSale(cart);

            return Ok(new { successPurchase });
            
           
        }
    }
}