using MediatR;
using StoreApi.Models;

namespace StoreApi.Commands
{
    public class CreateProductCommand : IRequest<Product>
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public CreateProductCommand(string name, string imageUrl, decimal price, string description)
        {
            Name = name;
            ImageUrl = imageUrl;
            Price = price;
            Description = description;
        }
    }
}

