using KEStoreApi;
using System;
using System.Collections.Generic;

public sealed class Sale
{
    public IEnumerable<Product> Products { get; }
    public string Address { get; }
    public PaymentMethods.Type PaymentMethod { get; }
    public decimal Total { get; }
    public string PurchaseNumber { get; }

    public Sale(string purchaseNumber, IEnumerable<Product> products, string address, decimal total, PaymentMethods.Type paymentMethod)
    {
        if (string.IsNullOrWhiteSpace(purchaseNumber))
        {
            throw new ArgumentException("El número de compra no puede ser nulo ni vacío.", nameof(purchaseNumber));
        }

        if (products == null || !products.Any())
        {
            throw new ArgumentException("La lista de productos no puede ser nula ni vacía.", nameof(products));
        }

        if (string.IsNullOrWhiteSpace(address))
        {
            throw new ArgumentException("La dirección no puede ser nula ni vacía.", nameof(address));
        }

        if (total <= 0)
        {
            throw new ArgumentException("El monto debe ser mayor que cero.", nameof(total));
        }

        this.Products = products;
        this.Address = address;
        this.Total = total;
        this.PaymentMethod = paymentMethod;
        this.PurchaseNumber = purchaseNumber;
    }
}
