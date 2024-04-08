namespace ApiLab7;
public sealed class Sale
{
    public IEnumerable<Product> Products { get; }
    public string Address { get; }
    public decimal Amount { get; }
    public PaymentMethods PaymentMethod { get; }

    public Sale(IEnumerable<Product> products, string address, decimal amount, PaymentMethods paymentMethod)
    {
        if (products.Count() == 0) throw new ArgumentException("Sale must contain at least one product.");
        Products = products;
        if (string.IsNullOrWhiteSpace(address)) throw new ArgumentException("Address must be provided.");
        Address = address;
        if (amount <= 0) throw new ArgumentException("The final amount should be above 0");
        Amount = amount;
        if (paymentMethod == null) throw new ArgumentException("A payment method should be provided");
        PaymentMethod = paymentMethod;
    }
}