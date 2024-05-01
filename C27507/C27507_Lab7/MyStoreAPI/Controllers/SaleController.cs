using Core;
using Microsoft.AspNetCore.Mvc;

//API
using MyStoreAPI.Business;
using MyStoreAPI.Models;
namespace MyStoreAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class SaleController: ControllerBase{
        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> GetSale([FromBody] string dateFormat){

            try{

                //Recibimos el codigo para el tipo de fecha                
                SaleLogic saleLogic = new SaleLogic();
                Console.WriteLine("El formato de fecha es: " + dateFormat);
                List<RegisteredSale> specificListOfRegisteredSales = await saleLogic.getSalesFromTodayAsync(dateFormat);

                Console.WriteLine("Número de ventas registradas hoy: " + specificListOfRegisteredSales.Count);
                foreach (var thisSale in specificListOfRegisteredSales)
                {
                    Console.WriteLine("IdSale: " +thisSale.IdSale);
                    Console.WriteLine("PurchaseNum: " +thisSale.PurchaseNum);
                    Console.WriteLine("Subtotal: " +thisSale.SubTotal);
                }                
                return Ok(new { specificListOfRegisteredSales });
            }
            //501 son para NotImplemented o Excepciones Propias
            catch (BussinessException nie){                
                return StatusCode(501, "Ha ocurrido un error al obtener los datos. Por favor inténtalo más tarde.");
            }
            catch (Exception ex){                
                return StatusCode(500, "Ha ocurrido un error al obtener los datos. Por favor inténtalo más tarde." + ex);
            }
            
        }

    }    
}

