namespace ShopApi.Models;

public sealed class Sale
{
    public IEnumerable<Product> products { get; }
    public string address { get; }
    public decimal total { get; }
    public int paymentMethod { get; }
    public string purchase_number {get;}

    public Sale(IEnumerable<Product> products, string address, decimal total, int paymentMethod)
    {
        this.products = products;
        this.address = address;
        this.total = total;
        this.paymentMethod = paymentMethod;
    }
}