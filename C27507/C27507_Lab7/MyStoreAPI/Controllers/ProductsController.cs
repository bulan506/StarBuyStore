using Core;
using Microsoft.AspNetCore.Mvc;
//API
using MyStoreAPI.Business;
using MyStoreAPI.DB;
using MyStoreAPI.Models;
namespace MyStoreAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]


    //cuando heredamos de ControllerBase, la clase ahora puede manejar solicitudes HTTP
    public class ProductsController : ControllerBase{                
        
        [HttpGet]
        public IActionResult returnFilteredProducts(int specificCategorie){

            //Creamos una instancia para filtrar los products   

            ProductsLogic productsLogic = new ProductsLogic();
            IEnumerable<Product> filteredProducts = productsLogic.filterProductsByCategory(specificCategorie);
            return Ok(filteredProducts);

            //Falta el control de errores
        }                
    }
}
