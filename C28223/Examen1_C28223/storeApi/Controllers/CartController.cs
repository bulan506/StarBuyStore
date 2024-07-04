using Microsoft.AspNetCore.Mvc;
using storeApi.Business;
using storeApi.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace storeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private LogicStoreApi logicStore = new LogicStoreApi();

        [HttpPost]
        [AllowAnonymous]

        public async Task<IActionResult> CreateCart([FromBody] Cart cart)
        {
            try
            {
                if (string.IsNullOrEmpty(cart.Address) || !cart.Address.Contains("#"))
                return BadRequest("La dirección es requerida, o el formato no es valido.");
                if (!cart.ProductIds.Any())
                return BadRequest("Error la lista de productos debe contener productos asociados.");
                if (cart.PaymentMethod<0)
                return BadRequest("Error en el tipo de pago.");
                var sale = await logicStore.PurchaseAsync(cart);
                var numeroCompra = sale.PurchaseNumber;
                var response = new { numeroCompra = numeroCompra };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}