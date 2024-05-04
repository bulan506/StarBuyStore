using Microsoft.AspNetCore.Mvc;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.Threading.Tasks;
using core;
using core.Business;
using core.DataBase;
using core.Models;


namespace geekstore_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Report>>> GetSales(string date)
        {
            try {
				
            DateTime selectedDate= DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            var dailySalesTask = ReportDb.ExtraerVentasDiarias(selectedDate); 
            var weeklySalesTask = ReportDb.ExtraerVentasSemanal(selectedDate); 

            await Task.WhenAll(dailySalesTask, weeklySalesTask);

            var dailySales = dailySalesTask.Result;
            var dailySalesList = ReportLogic.TransformarDatos(dailySales);

            var weeklySales = weeklySalesTask.Result;
            var weeklySalesList = ReportLogic.TransformarDatos(weeklySales);

            List<object>[] reportList = new List<object>[2];
            reportList = ReportLogic.listarReportes(dailySalesList, weeklySalesList);

            return Ok(reportList); 
            
            } catch(ArgumentException ex){
                return BadRequest(ex.Message);
            }
        }
    }
}

 