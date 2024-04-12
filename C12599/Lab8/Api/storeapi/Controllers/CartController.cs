using Microsoft.AspNetCore.Mvc;
using System;

namespace storeapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartSave _cartSave = new CartSave();

        [HttpPost]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
            int numeroCompra = new randomNumber().GenerateUniquePurchaseNumber();
            
            int paymentMethodValue = (int)cart.PaymentMethod;

            _cartSave.SaveToDatabase(cart.Total, DateTime.Now, numeroCompra, paymentMethodValue);

            Carts.Add(cart);

            return Ok(new { NumeroCompra = numeroCompra });
        }
    }
}
