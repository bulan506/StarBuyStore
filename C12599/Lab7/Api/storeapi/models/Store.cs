using System;
using System.Collections.Generic;
using System.Linq;

namespace storeapi
{
    public sealed class Store
    {
        public List<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }
        public PaymentMethods MethodPayment { get; private set; }

        private Store(List<Product> products, int taxPercentage)
        {
            Products = products;
            TaxPercentage = taxPercentage;
        }

        public static readonly Store Instance;

        // Static constructor
        static Store()
        {
            var products = new List<Product>();

            
  for (int i = 1; i <= 12; i++)
        {
            products.Add(new Product
            {
                id = i,
                Name = $"Product {i}",
                ImageUrl = $"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlgv-oyHOyGGAa0U9W524JKA361U4t22Z7oQ&usqp=CAU",
                Price = 10.00m * i,
                Description = $"Description of Product {i}"
            });
        } 


            Instance = new Store(products, 13);

        
            
        }

        public Sale Purchase(Cart cart)
        {
            if (cart.ProductIds.Count == 0)
                throw new ArgumentException("Cart must contain at least one product.");

            if (string.IsNullOrWhiteSpace(cart.Address))
                throw new ArgumentException("Address must be provided.");


            // Encontrar los productos correspondientes en la tienda según los IDs en el carrito
            IEnumerable<Product> matchingProducts = Products
                .Where(p => cart.ProductIds.Contains(p.id.ToString()))
                .ToList();

            // Crear copias "sombra" de los productos encontrados
            IEnumerable<Product> shadowCopyProducts = matchingProducts
                .Select(p => (Product)p.Clone()) // Asumiendo que Product implementa ICloneable
                .ToList();

            // Calcular el monto total de la compra aplicando el impuesto
            decimal purchaseAmount = 0;
            foreach (var product in shadowCopyProducts)
            {
                product.Price *= (1 + (decimal)TaxPercentage / 100);
                purchaseAmount += product.Price;
            }

            // Crear un objeto Sale
            var sale = new Sale(shadowCopyProducts.ToList(), cart.Address, purchaseAmount);

            // Realizar cualquier lógica de procesamiento de pago aquí basada en el método de pago seleccionado

            return sale;
        }
    }
}
