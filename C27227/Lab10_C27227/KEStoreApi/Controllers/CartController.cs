using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using KEStoreApi.Bussiness;

namespace KEStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private StoreLogic storeLogic = new StoreLogic();

        [HttpPost]
        public async Task<IActionResult> CreateCart([FromBody] Cart cart)
        {
           
            if (cart == null)
            {
                return BadRequest("El objeto Cart no puede ser nulo.");
            }
            
            if (cart.Product == null || cart.Product.Count == 0)
            {
                return BadRequest("El carrito debe contener al menos un producto.");
            }

            // Realizar la compra
            var saleTask = storeLogic.Purchase(cart);
            var sale = await saleTask;
            var purchaseNumber = sale.PurchaseNumber;
            var response = new { purchaseNumber = purchaseNumber };
            return Ok(response);
        }
    }
}
