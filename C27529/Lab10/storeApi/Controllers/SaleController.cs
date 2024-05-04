using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using storeApi.Database;

namespace TodoApi.Models
{
    [Route("api/[controller]")]
    [ApiController]


    public class SaleController : ControllerBase
    {


        public class weekDailyDate
        {
            public DateTime weekDate { get; set; }
            public DateTime dailyDate { get; set; }
        }

        private class CombinedSalesData
        {
            public Dictionary<string, decimal> WeekSales { get; set; }
            public List<(string purchaseNumber, decimal total)> DailySales { get; set; }
        }

        [HttpPost]
        public IActionResult GetSale([FromBody] weekDailyDate dateString)
        {
            if (dateString.weekDate == DateTime.MinValue)
            {
                return BadRequest("Invalid start date format");
            }

            if (dateString.dailyDate == DateTime.MinValue)
            {
                return BadRequest("Invalid today date.");
            }


            SaleDB saleDB = new SaleDB();
            Dictionary<string, decimal> weekSales = saleDB.getWeekSales(dateString.weekDate);
            List<(string purchaseNumber, decimal total)> dailySales = saleDB.getDailySales(dateString.dailyDate);


            CombinedSalesData combinedSales = new CombinedSalesData
            {
                WeekSales = weekSales,
                DailySales = dailySales
            };





            return Ok(combinedSales);
        }

    }
}