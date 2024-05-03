using Microsoft.AspNetCore.Mvc;
using Store_API.Business;

namespace Store_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleReportController : ControllerBase
    {
        private readonly SaleReportLogic _saleReportLogic;

        public SaleReportController(SaleReportLogic saleReportLogic)
        {
            _saleReportLogic = saleReportLogic ?? throw new ArgumentNullException(nameof(saleReportLogic), "The SaleReportLogic object cannot be null.");
        }

        [HttpGet("{date}")]
        public async Task<IActionResult> GetSalesReport(DateTime date)
        {
            try
            {
                var salesReport = await _saleReportLogic.GenerateSalesReportAsync(date);
                return Ok(salesReport);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while generating the sales report.");
            }
        }
    }
}