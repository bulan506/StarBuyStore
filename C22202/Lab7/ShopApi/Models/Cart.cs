namespace ShopApi.Models;
public sealed class Cart
{
    public List<string> products { get; set; }
    public float subtotal {get; set;}
    public string address { get; set; }

    public string paymentMethod {get; set;}
}