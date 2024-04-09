namespace StoreApi;
public sealed class Sale
{
    private IEnumerable<Product> shadowCopyProducts;
    private decimal purchaseAmount;

    public IEnumerable<Product> Products { get; }
    public string Address { get; }
    public decimal Amount { get; }
    public PaymentMethods PaymentMethod { get; }

    public Sale(IEnumerable<Product> products, string address, decimal Amount, PaymentMethods paymentMethod )
    {
        Products = products;
        Address = address;
        Amount = Amount;
        PaymentMethod = paymentMethod;
    }
}