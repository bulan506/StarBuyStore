namespace StoreApi.Models
{
    public sealed class Products
    {
        public IEnumerable<Product> products {get; set;}
        public Products (IEnumerable<Product> products){
            this.products = products;
        }
    }
    
}