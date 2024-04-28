using System;
using System.Data.Common;
using System.IO.Compression;
using Core;
using MySqlConnector;
using storeApi.DataBase;

namespace storeApi.Business;
public sealed class LogicStoreApi
{
public LogicStoreApi(){} // Se utiliza en la creacion del purchase
    private SaleDataBase saleDataBase = new SaleDataBase(); 

   public Sale Purchase(Cart cart)
{
    var productIdsIsEmpty = cart.ProductIds == null || cart.ProductIds.Count == 0;
    var addressIsNullOrWhiteSpace = string.IsNullOrWhiteSpace(cart.Address);

    if (productIdsIsEmpty) throw new ArgumentException("Cart must contain at least one product.");
    if (addressIsNullOrWhiteSpace) throw new ArgumentException("Address must be provided.");

    var products = Store.Instance.Products;
    var taxPercentage = Store.Instance.TaxPercentage;

    // Obtener los productos que coinciden con los IDs del carrito
    IEnumerable<Product> matchingProducts = products
        .Where(p => cart.ProductIds.Any(pq => pq.ProductId == p.id.ToString())).ToList();
    // Crear una copia de los productos para evitar modificar los originales
    // Aqui cambia porque tiene que ahora  calcular la cantidad de productos y el precio de cada uno
    IEnumerable<Product> shadowCopyProducts = matchingProducts
        .Select(p =>
        {
            var productQuantity = cart.ProductIds.FirstOrDefault(pq => pq.ProductId == p.id.ToString());
            var clonedProduct = (Product)p.Clone();
            clonedProduct.cant = productQuantity?.Quantity ?? 0; // Asignar la cantidad correspondiente
            return clonedProduct;
        }).ToList();
    
    decimal purchaseAmount = 0;
    foreach (var product in shadowCopyProducts)
    {
        // Calcular el precio total incluyendo impuestos
        product.price *= (1 + taxPercentage / 100); 
        purchaseAmount += product.price * product.cant; 
    }
    // Obtener el método de pago seleccionado
    PaymentMethods selectedPaymentMethod = PaymentMethods.SetPaymentType(cart.PaymentMethod);
    // Crear un objeto de venta
    var sale = new Sale(Sale.GenerateNextPurchaseNumber(), shadowCopyProducts, cart.Address, purchaseAmount, selectedPaymentMethod.PaymentType);
    saleDataBase.Save(sale);
    return sale;
}
}