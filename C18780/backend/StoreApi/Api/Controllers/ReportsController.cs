using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreApi.Models;
using StoreApi.Queries;

namespace StoreApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IMediator mediator;

        public ReportsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /*
        Traer todas las ventas del dia seleccionado, informacion pertinente:
        Entrada lista
        Fecha como 2024-04-25

        Salida lista
        Date -Select Sales

        Quantity -Sales SalesLine

        Name Product  -Select Sales SalesLine Product
        Price -Select Sales SalesLine Product

        paymentMethod -Select Sales PaymentMethod

        Total -Quantity * Price
        */

        [HttpGet("dateTime")]
        public async Task<List<DailySales>> GetDailySalesByDateAsync(DateTime dateTime)
        {
            var dailySales = await mediator.Send(new GetDailySalesQuery() { DateTime = dateTime });
            return dailySales;
        }
    }
        /*
        Traer las ventas por semana
        Entrada
        fecha

        Salida lista
        Nombre del producto
        Total de venta del producto
        */
}