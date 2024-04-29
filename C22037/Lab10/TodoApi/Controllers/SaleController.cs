using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TodoApi.Database;

namespace TodoApi.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        [HttpPost]
        public IActionResult GetSale([FromBody]DateTime date)
        {
            SaleDB saleDB = new SaleDB();
            List<SaleReports> weeklySales = saleDB.GetWeeklySales(date);
            return Ok(weeklySales);
        }
    }
}