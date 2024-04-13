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
            string purchaseNumExit = DB_Connection.InsertSale(cart);    
            //Se manda todo dato como un JSON para que sea leido de esa forma                        
            return Ok(new { purchaseNumExit });                    
        }        
    }
}