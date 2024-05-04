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
            public Dictionary<string, decimal> DailySales { get; set; }
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

            Console.WriteLine(dateString.dailyDate);
            // Console.WriteLine(dateString.weekDate);

            SaleDB saleDB = new SaleDB();
            Dictionary<string, decimal> weekSales = saleDB.getWeekSales(dateString.weekDate);
            Dictionary<string, decimal> dailySales = saleDB.getWeekSales(dateString.dailyDate);


            CombinedSalesData combinedSales = new CombinedSalesData
            {
                WeekSales = weekSales,
                DailySales = dailySales
            };



            foreach (var kvp in dailySales)
            {
                string product = kvp.Key;
                decimal sales = kvp.Value;

                Console.WriteLine($"Producto: {product}, Ventas Diarias: {sales}");
            }


            return Ok(combinedSales);
        }

    }
}