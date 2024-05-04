using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreApi.Models;
using StoreApi.Queries;

namespace StoreApi
{
    [Route("api/[controller]")]
    [ApiController]
    public sealed class ReportsController : ControllerBase
    {
        private readonly IMediator mediator;

        public ReportsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /*
        ----------------------------------------------------------------
        Explicacion de GetReportsByDateAsync
        ----------------------------------------------------------------
        GetDailySalesQuery Trae todas las ventas del dia seleccionado, informacion pertinente:
        Entrada lista
        Fecha como 2024-04-25

        Salida lista
        Date -Select Sales

        Quantity -Sales SalesLine

        Name Product  -Select Sales SalesLine Product
        Price -Select Sales SalesLine Product

        paymentMethod -Select Sales PaymentMethod

        Total -Quantity * Price
        ----------------------------------------------------------------
        GetWeeklySalesByDateQuery Trae las ventas por semana
        Entrada
        fecha como 2024-04-25

        Salida lista
        Nombre del producto
        Total de venta del producto
        ----------------------------------------------------------------
        */

        [HttpGet("Date")]
        public async Task<Reports> GetReportsByDateAsync(DateTime dateTime)
        {
            var dailySalesTask = mediator.Send(new GetDailySalesQuery() { DateTime = dateTime });
            var weeklySalesTask = mediator.Send(new GetWeeklySalesByDateQuery() { DateTime = dateTime });

            await Task.WhenAll(dailySalesTask, weeklySalesTask);

            var dailySales = await dailySalesTask;
            var weeklySales = await weeklySalesTask;

            return new Reports(dailySales, weeklySales);
        }
    }
}



