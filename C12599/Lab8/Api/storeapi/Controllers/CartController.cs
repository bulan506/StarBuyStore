using Microsoft.AspNetCore.Mvc;
using System;

namespace storeapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private static List<Cart> Carts = new List<Cart>();
        private readonly CartSave _cartSave = new CartSave();

        [HttpPost]
        public IActionResult CreateCart([FromBody] Cart cart)
        {
            try
            {
                int numeroCompra = new randomNumber().GenerateUniquePurchaseNumber();
                int paymentMethodValue = (int)cart.PaymentMethod;

                _cartSave.SaveToDatabase(cart.Total, DateTime.Now, numeroCompra, paymentMethodValue);

                Carts.Add(cart);

                return Ok(new { NumeroCompra = numeroCompra });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al procesar la solicitud: {ex.Message}");
            }
        }
    }
}
