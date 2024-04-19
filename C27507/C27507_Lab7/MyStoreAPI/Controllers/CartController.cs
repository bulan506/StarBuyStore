using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
//API
using MyStoreAPI.Business;
using MyStoreAPI.DB;
using MyStoreAPI.Models;
namespace MyStoreAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase{                

        [HttpPost]
         [Consumes("application/json")]
        public IActionResult CreateCart([FromBody] Cart cart){                        
            
            SaleLogic saleLogic = new SaleLogic(cart);

            Sale saleConfirmed = saleLogic.processDataSale();
            Console.WriteLine("Antes de mandar la respuesta post - Valor de saleConfirmed.purchaseNum: " + saleConfirmed.purchaseNum);    
            if (saleConfirmed != null){
                return Ok(new { saleConfirmed.purchaseNum });
            }else{
                return StatusCode(500, "Ha ocurrido un error al generar tu transacción. Por favor inténtalo más tarde.");                
            }
        }        
    }
}