using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using storeapi.Database;
using storeapi.Models;

namespace storeapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions([FromQuery] string date)
        {
            if (string.IsNullOrWhiteSpace(date))
            {
                return BadRequest("La fecha no puede estar vacía.");
            }

            if (!DateTime.TryParseExact(date, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out DateTime parsedDate))
            {
                return BadRequest("Formato de fecha inválido.");
            }

            var salesDB = new SalesDB();

            Task<IEnumerable<string[]>> taskTransactionDay = salesDB.GetForDayAsync(parsedDate);
            Task<IEnumerable<string[]>> taskTransactionWeek = salesDB.GetForWeekAsync(parsedDate);

            await Task.WhenAll(taskTransactionDay, taskTransactionWeek);

            IEnumerable<TransactionManager.TransactionRecord> transactionsDays =
                await TransactionManager.LoadTransactionsFromDatabaseAsync(taskTransactionDay.Result);
            IEnumerable<TransactionManager.TransactionRecord> transactionsWeeks =
                await TransactionManager.LoadTransactionsFromDatabaseAsync(taskTransactionWeek.Result);

            var response = new Dictionary<string, IEnumerable<TransactionManager.TransactionRecord>>
            {
                ["transactionsDays"] = transactionsDays,
                ["transactionsWeeks"] = transactionsWeeks
            };

            return Ok(response);
        }
    }
}
