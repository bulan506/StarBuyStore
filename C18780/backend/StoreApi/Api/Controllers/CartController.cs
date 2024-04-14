using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreApi.Commands;
using StoreApi.Models;
using StoreApi.utils;

namespace StoreApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CartController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<Sales> AddCartAsync([FromBody] Cart cart)
        {
            string? paymentMethodName = PaymentMethods.Find((PaymentMethods.Type)cart.PaymentMethod)?.ToString();
            decimal total = 0;

            var createSalesCommand = new CreateSalesCommand(
                date: DateTime.Now,
                confirmation: 1,
                paymentMethods: paymentMethodName,
                total: total,
                address: cart.Address
            );

            var sales = await _mediator.Send(createSalesCommand);

            foreach (var productId in cart.ProductIds)
            {
                var product = await GetProductById(Guid.Parse(productId));

                if (product != null)
                {
                    total += product.Price;

                    var createSalesLineCommand = new CreateSalesLineCommand(
                        quantity: 1,
                        subTotal: product.Price,
                        uuidProduct: Guid.Parse(productId),
                        uuidSales: sales.Uuid
                    );

                    await _mediator.Send(createSalesLineCommand);
                }
            }

            sales.Total = total;

            var updateSalesCommand = new UpdateSalesCommand(
                sales.Uuid,
                sales.Date,
                sales.Confirmation,
                sales.PaymentMethod,
                sales.Total,
                sales.Address
            );

            await _mediator.Send(updateSalesCommand);

            return sales;
        }


        private async Task<Product> GetProductById(Guid productId)
        {
            var productController = new ProductController(_mediator);

            return await productController.GetProductByIdAsync(productId);
        }
    }
}
