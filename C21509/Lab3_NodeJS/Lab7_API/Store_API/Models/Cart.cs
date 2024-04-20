namespace Store_API.Models;
using System.Text.Json.Serialization;

public sealed class Cart
{
    public List<int> ProductIds { get; set; }
    public string Address { get; set; }
    
    [JsonPropertyName("paymentMethod")]
    public PaymentMethods.Type PaymentMethod { get; set; }
    public decimal Total { get; set; } 
    public decimal Subtotal { get; set; } 
}