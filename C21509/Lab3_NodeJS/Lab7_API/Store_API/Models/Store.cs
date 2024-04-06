using System;
using System.Collections.Generic;
using System.Linq;

namespace Store_API.Models
{
    public sealed class Store
    {
        public List<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }

        private Store(List<Product> products, int TaxPercentage)
        {
            this.Products = products;
            this.TaxPercentage = TaxPercentage;
        }

        public readonly static Store Instance;
        // Static constructor
        static Store()
        {

            var products = new List<Product>
            {
                new Product
                {
                    Id= 1,
                    Name = $"Iphone",
                    ImageURL = $"/img/Iphone.jpg",
                    Price = 200

                },
                new Product
                {
                   Id= 2,
                    Name = $"Audifono",
                    ImageURL = $"/img/audifonos.jpg",
                    Price = 100

                },
                new Product
                {
                    Id= 3,
                    Name = $"Mouse",
                    ImageURL = $"/img/mouse.jpg",
                    Price = 35

                },
                new Product
                {
                    Id= 4,
                    Name = $"Pantalla",
                    ImageURL = $"/img/Pantalla.jpg",
                    Price = 68

                },
                new Product
                {
                    Id= 5,
                    Name = $"Headphone",
                    ImageURL = $"/img/Headphone.jpg",
                    Price = 35

                },

                new Product
                {
                    Id= 6,
                    Name = $"Teclado",
                    ImageURL = $"/img/teclado.jpg",
                    Price = 95

                },
                new Product
                {
                    Id= 7,
                    Name = $"Cable USB",
                    ImageURL = $"/img/Cable.jpg",
                    Price = 10

                },
                new Product
                {
                    Id= 8,
                    Name = $"Chromecast",
                    ImageURL = $"/img/Chromecast.jpg",
                    Price = 150

                }
            };

            Store.Instance = new Store(products, 13);
        }

        public Sale Purchase(Cart cart)
        {
            if (cart.ProductIds.Count == 0) throw new ArgumentException("Cart must contain at least one product.");
            if (string.IsNullOrWhiteSpace(cart.Address)) throw new ArgumentException("Address must be provided.");

            // Find matching products based on the product Ids in the cart
            IEnumerable<Product> matchingProducts = Products.Where(p => cart.ProductIds.Contains(p.Id.ToString())).ToList();

            // Create shadow copies of the matching products
            IEnumerable<Product> shadowCopyProducts = matchingProducts.Select(p => (Product)p.Clone()).ToList();

            // Calculate purchase amount by multiplying each product's Price with the store's tax percentage
            decimal purchaseAmount = 0;
            foreach (var product in shadowCopyProducts)
            {
                product.Price *= (1 + (decimal)TaxPercentage / 100);
                purchaseAmount += product.Price;
            }

            // Create a sale object
            var sale = new Sale(shadowCopyProducts, cart.Address, purchaseAmount, paymentMethod);


            return sale;

        }
    }
}