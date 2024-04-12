using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
namespace MyStoreAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {        
        private Sale actualSale = new Sale();

        [HttpPost]
         [Consumes("application/json")]
        public IActionResult CreateCart([FromBody] Cart cart){                        
            //Hacemos las inserciones y devolvemos la respuesta con el post                        
            string purchaseNum = DB_Connection.InsertSale(cart);                
            string redirectUrl = "https://localhost:3000/purchase-info/" + purchaseNum;            
            return Ok(new { redirectUrl });                    
        }        
    }
}