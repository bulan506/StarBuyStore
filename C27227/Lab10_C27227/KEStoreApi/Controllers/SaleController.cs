using Core;
using Microsoft.AspNetCore.Mvc;
using KEStoreApi.Bussiness;
using System;
using System.Threading.Tasks;

namespace KEStoreApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private SaleLogic sl = new SaleLogic();

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DateRequest request)
        {
            DateTime date = request.Date;
            ReportSales report = await sl.GetReportSalesAsync(date);
            return Ok(report);
        }
    }
}
