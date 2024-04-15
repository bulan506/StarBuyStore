using Microsoft.AspNetCore.Mvc;
using MyStoreAPI.Models;
//API
using MyStoreAPI.DB;
using MyStoreAPI.Models;
namespace MyStoreAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    //cuando heredamos de ControllerBase, la clase ahora puede manejar solicitudes HTTP
    public class StoreController : ControllerBase
    {
        
        //Enviar los productos
        [HttpGet]
        public Store getStore()
        {            
            //Cuando se solicita esta rutA la de "api/Store" por cualquier fetch, el método getStore() se ejecuta
            //y devuelve la instancia única de la tienda (Store.Instance)
            return Store.Instance;
        }
                
    }
}