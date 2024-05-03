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
        [HttpPost]
        public IActionResult GetSale([FromBody] string dateString)
        {
            if (!DateTime.TryParse(dateString, out DateTime date))
            {
                return BadRequest("Invalid date format");
            }

            SaleDB saleDB = new SaleDB();
            Dictionary<string, decimal> weekSales = saleDB.getWeekSales(date);
            foreach (var kvp in weekSales)
            {
                Console.WriteLine($"Clave: {kvp.Key}, Valor: {kvp.Value}");
            }

            return Ok(weekSales);
        }
    }
}