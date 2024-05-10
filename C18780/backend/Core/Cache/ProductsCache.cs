using StoreApi.Models;

namespace StoreApi.Cache
{
    public static class ProductsCache
    {
        public static IEnumerable<Product> Products { get; set; }

    }
}