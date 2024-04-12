using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
namespace MyStoreAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        //private static List<Cart> Carts = new List<Cart>();
        private Sale actualSale = new Sale();

        [HttpPost]
         [Consumes("application/json")]
        public IActionResult CreateCart([FromBody] Cart cart)
        {            
            //Descomponemos los datos de carrito (preguntar al profe si Sale.cs es necesario, ya que en el mockup ventas es un arreglo de carritos)                        
           
            //Realizar validaciones de los datos
            // string errorMsg = "Al parecer ha ocurrido un error con la transaccion de tu compra. Intentalo mas tarde"
            // if (cart.allProduct == null || cart.allProduct.Count == 0)
            // {
            //     return BadRequest(errorMsg);
            // }

            // if (cart.Subtotal <= 0 || cart.Total <= 0)
            // {
            //     return BadRequest(errorMsg);
            // }

            // if (string.IsNullOrWhiteSpace(cart.Direction))
            // {
            //     return BadRequest(errorMsg);
            // }

            //Hacemos las inserciones y devolvemos la respuesta con el post                        
            string purchaseNum = DB_Connection.InsertSale(cart);                        

            return Ok("Hola");
        }        
    }
}