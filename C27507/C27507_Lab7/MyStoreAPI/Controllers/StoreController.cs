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
    public class StoreController : ControllerBase{

        private StoreLogic storeLogic = new StoreLogic();
        
        //Enviar la tienda
        [HttpGet]
        public IActionResult getStore(){            

            //Verificamos que hayan tablas en la BD
            if( !storeLogic.validateStatusStore() ){
                return StatusCode(500, "Error: No hay conexion con la BD");
            }

            //Al solicitar "api/Store" por cualquier fetch, el método getStore() se ejecuta
            //y devuelve la instancia única de la tienda (Store.Instance)
            return Ok(Store.Instance);

            //https://code-maze.com/aspnetcore-web-api-return-types/
        }
                
    }
}