namespace storeapi;
public sealed class Cart
{
   
    public string Address { get; set; }
    public PaymentMethods.Type PaymentMethod { get; set; }

     public List<string> ProductIds { get; set; }



}