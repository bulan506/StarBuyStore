using System;
using System.Collections.Generic;
using System.Linq;
using TodoApi.Models;

namespace TodoApi.Business
{
    public sealed class StoreLogic
    {
        public StoreLogic()
        {

        }

        public Sale Purchase(Cart cart)
        {
            if (cart.ProductIds.Count == 0) throw new ArgumentException("Cart must contain at least one product.");
            if (string.IsNullOrWhiteSpace(cart.Address)) throw new ArgumentException("Address must be provided.");

            var products = Store.Instance.Products;
            var taxPercentage = Store.Instance.TaxPercentage;

            // Find matching products based on the product IDs in the cart
            IEnumerable<Product> matchingProducts = products.Where(p => cart.ProductIds.Contains(p.Id.ToString())).ToList();

            // Create shadow copies of the matching products
            IEnumerable<Product> shadowCopyProducts = matchingProducts.Select(p => (Product)p.Clone()).ToList();

            // Calculate purchase amount by multiplying each product's price with the store's tax percentage
            decimal purchaseAmount = 0;
            foreach (var product in shadowCopyProducts)
            {
                product.Price *= (1 + (decimal)taxPercentage / 100);
                purchaseAmount += product.Price;
            }

            // Generar el número de compra
            string purchaseNumber = Sale.GenerateNextPurchaseNumber();

            // Encontrar el método de pago
            PaymentMethods paymentMethod = PaymentMethods.Find(cart.PaymentMethod);
            PaymentMethods.Type paymentMethodType = paymentMethod.PaymentType;

            // Crear un objeto de venta
            var sale = new Sale(shadowCopyProducts, cart.Address, purchaseAmount, paymentMethodType, purchaseNumber);

            return sale;

        }
    }
}