using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace storeApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class PaymentMethodController : ControllerBase
    {
        private readonly LogicPaymentMethod paymentLogic = new LogicPaymentMethod();

        [HttpGet("admin/paymentMethods")]
        [AllowAnonymous]

        public async Task<IActionResult> Get()
        {
            var paymentMethods = await paymentLogic.GetPaymentMethodsAsync();
            return Ok(paymentMethods);
        }

        [HttpPut("admin/updatePayment/{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatus(int id,  int isActive)
        {
            try
            {
                if (id<0) return BadRequest($"El parametro {nameof(id)} no puede ser negativo");
                if (isActive<0) return BadRequest($"El parametro {nameof(isActive)} no puede ser negativo");
                bool result = await paymentLogic.UpdatePaymentMethodStatusAsync(id,isActive);
                if (result)return Ok(new { message = "Payment method status updated successfully." });
                else return NotFound(new { Message = "Payment method not found." });
                
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}