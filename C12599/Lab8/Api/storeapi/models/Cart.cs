using System.Collections.Generic;

namespace storeapi
{
    public class Cart
    {
        public string Address { get; set; }
        public PaymentMethods.Type PaymentMethod { get; set; }
        public List<string> ProductIds { get; set; }
        public decimal Total { get; set; } 
    }
}