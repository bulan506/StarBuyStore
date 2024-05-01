using MySqlConnector;
using storeApi.DataBase;
using storeApi.Models;

namespace storeApi
{
    public sealed class Store
    {
        public List<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }

        private Store(List<Product> products, int TaxPercentage)
        {
            this.Products = products;
            this.TaxPercentage = TaxPercentage;
        }
        public static async Task<Store> GetInstanceAsync()
        {
            var products = await StoreDataBase.GetProductsFromDBAsync();
            return new Store(products, 13);
        }
        private static readonly Lazy<Task<Store>> instance = new Lazy<Task<Store>>(GetInstanceAsync);

        public static Task<Store> Instance => instance.Value;

    }
}