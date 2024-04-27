using System.Runtime.Intrinsics.X86;
using Microsoft.AspNetCore.Mvc;
using storeApi.Business;
using storeApi.Models;

namespace storeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        LogicSalesReportsApi lsr = new LogicSalesReportsApi();
        [HttpPost]
        public IActionResult CreateReportSales([FromBody] DateSale date)
        {
            SalesReport report = lsr.GetSalesReport(date.DateSales);
            return Ok(report);
        }
    }
    public class DateSale
    {
        public string DateSales { get; set; }
    }

}