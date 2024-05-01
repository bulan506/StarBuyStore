using Microsoft.AspNetCore.Mvc;
using StoreAPI.Business;
using StoreAPI.Database;
using StoreAPI.models;
using System;
using System.Collections.Generic;
using static StoreAPI.Business.SaleReportLogic;
using System.Threading.Tasks;

namespace StoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {


        [HttpPost]
        public async Task<IActionResult> GetSale([FromBody] DateTime? date)
        {
            try
            {
                if (!date.HasValue) return BadRequest("The date is mandatory.");

                StoreDB storeDB = new StoreDB();
                var weeklySalesTask = storeDB.GetWeeklySalesAsync(date);
                var dailySalesTask = storeDB.GetDailySalesAsync(date);

                await Task.WhenAll(weeklySalesTask, dailySalesTask);

                var weeklySales = weeklySalesTask.Result;
                var dailySales = dailySalesTask.Result;


               
                
                var formattedDailySales = SalesFormatter.FormatDailySales(dailySales);

                var salesReport = new { WeeklySales = weeklySales, DailySales = dailySales };

                
                return Ok(salesReport);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }
}
