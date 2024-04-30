using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;
using System.Text;
namespace KEStoreApi.Bussiness;
public sealed class StoreLogic
{
    private static Random randomNumber = new Random();
    private DatabaseSale saleDataBase = new DatabaseSale(); 
    public StoreLogic()
    {

    }

public async Task<Sale> Purchase(Cart cart)
{
    bool isCartEmpty = cart.Product.Count == 0;
    bool isDeliveryAddressMissing = string.IsNullOrWhiteSpace(cart.address);

    if (isCartEmpty)
        throw new ArgumentException("Cart must contain at least one product.");

    if (isDeliveryAddressMissing)
        throw new ArgumentException("Address must be provided.");

    var products = Store.Instance.Products;
    var taxPercentage = Store.Instance.TaxPercentage;
    
    List<Product> matchingProducts = new List<Product>();
    decimal purchaseAmount = 0;

    foreach (var productQuantity in cart.Product)
    {
        int productId = productQuantity.Id;
        int quantity = productQuantity.Quantity;

        Product matchingProduct = products.FirstOrDefault(p => p.Id == productId);

        if (matchingProduct != null)
        {
            // Create a deep copy of the product
            Product copiedProduct = (Product)matchingProduct.Clone();

            // Adjust the quantity of the copied product
            copiedProduct.Quantity = quantity;

            // Add the copied product to the list
            matchingProducts.Add(copiedProduct);

            // Calculate the total price of this product
            decimal totalPrice = quantity * matchingProduct.Price;

            // Add the total price to the purchase amount
            purchaseAmount += totalPrice;
        }
    }
    // Calculate the tax
    decimal taxAmount = purchaseAmount * ((decimal)taxPercentage / 100);
    // Calculate the total purchase amount
    decimal total = purchaseAmount + taxAmount;



    PaymentMethods paymentMethod = PaymentMethods.SetPaymentType(cart.PaymentMethod);
    var purchase_number_Sale = GeneratePurchaseNumber();
    var sale = new Sale(purchase_number_Sale, matchingProducts, cart.address, total, paymentMethod.PaymentType);
    await saleDataBase.Save(sale);
    return sale;
}

    
    public static string GeneratePurchaseNumber()
    {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 6; i++)
        {
            int charType = randomNumber.Next(0, 3);
            switch (charType)
            {
                case 0: // Generar un dígito
                    sb.Append(randomNumber.Next(0, 10));
                    break;
                case 1: // Generar una letra mayúscula
                    sb.Append((char)randomNumber.Next('A', 'Z' + 1));
                    break;
                case 2: // Generar una letra minúscula
                    sb.Append((char)randomNumber.Next('a', 'z' + 1));
                    break;
            }
        }

        return sb.ToString();
    }

}