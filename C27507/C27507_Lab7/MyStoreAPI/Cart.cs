namespace MyStoreAPI
{
    public sealed class Cart
    {
        public List<string> allProduct { get; set; }

        public decimal Subtotal {get;set;}
        public decimal Tax {get;set;}
        public decimal Total {get;set;}
        public string Direction {get;set;}
        public PaymentMethod PaymentMethod { get; set; }
    }
}