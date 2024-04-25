using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreApi.Commands;
using StoreApi.Models;
using StoreApi.Queries;

namespace StoreApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly IMediator mediator;

        public SalesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("salesPurchaseNumber")]
        public async Task<Sales> GetSalesByPurchaseNumberAsync(string purchaseNumber)
        {
            var sales = await mediator.Send(new GetSalesByPurchaseNumberQuery() { PurchaseNumber = purchaseNumber });

            return sales;
        }
    }
}