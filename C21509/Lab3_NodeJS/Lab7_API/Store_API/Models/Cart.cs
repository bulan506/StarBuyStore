namespace Store_API.Models;

public sealed class Cart
{
    public List<string> ProductIds { get; set; }
    public string Address { get; set; }
    public PaymentMethods PaymentMethod { get; set; }
    public decimal Total { get; set; } 
    public decimal Subtotal { get; set; } 
}