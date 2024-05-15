using StoreApi.Models;
//recibo un uuid de categoria
namespace StoreApi.Cache
{
    public sealed class ProductsCache
    {
        private Dictionary<Guid, List<Product>> productDictionary = new Dictionary<Guid, List<Product>>();
        private ProductsCache() { }
        private static ProductsCache _instance;
        public static ProductsCache GetInstance()
        {
            if (_instance == null)
            {
                _instance = new ProductsCache();
            }
            return _instance;
        }

        public void setProduct(List<Product> products)
        {
            foreach (var product in products)
            {
                if (productDictionary.ContainsKey(product.Category))
                {
                    productDictionary[product.Category].Add(product);
                }
                else
                {
                    productDictionary.Add(product.Category, new List<Product> { product });
                }
            }
        }
        public IEnumerable<Product> GetProduct(Guid category)
        {
            if (!productDictionary.ContainsKey(category))
            {
                throw new ArgumentException("There is no such category in the dictionary.");
            }
            return productDictionary[category];
        }
        public bool exists()
        {
            return productDictionary.Count > 0 ? true : false;
        }
        public IEnumerable<Product> getAll()
        {
            return productDictionary.SelectMany(x => x.Value).ToList<Product>();
        }
    }
}