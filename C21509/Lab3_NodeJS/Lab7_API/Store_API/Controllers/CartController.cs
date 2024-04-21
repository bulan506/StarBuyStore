using Microsoft.AspNetCore.Mvc;
using Store_API.Models;
using Store_API.Database;
using Store_API.Business;

namespace Store_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private StoreLogic storeLogic = new StoreLogic();

        [HttpPost]
        [Consumes("application/json")]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
             Cart actualCart = new Cart(
                cart.ProductIds,
                cart.Address,
                cart.PaymentMethod,
                cart.Total,
                cart.Subtotal
             );

            var successPurchase = storeLogic.Purchase(actualCart);
            var response = new { successPurchase };
            return Ok(response);
        }
    }
}