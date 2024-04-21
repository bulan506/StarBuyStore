using StoreApi.Queries;

namespace StoreApi.Models
{
    public sealed class Store
    {
        public List<Product> Products { get; set; }
        public int TaxPercentage { get; set; }
        public Store(List<Product> products, int TaxPercentage)
        {
            this.Products = products;
            this.TaxPercentage = TaxPercentage;
        }
    }
}