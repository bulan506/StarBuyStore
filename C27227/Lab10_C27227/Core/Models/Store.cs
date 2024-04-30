using KEStoreApi.Data;

namespace KEStoreApi
{
    public sealed class Store
    {
        public List<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }

        private Store(List<Product> products, int taxPercentage)
        {
            this.Products = products;
            this.TaxPercentage = taxPercentage;
        }

        public static Store Instance { get; private set; }

        static Store()
        {
            InitializeInstance();
        }

        private static async void InitializeInstance()
        {
            var products = await DatabaseStore.GetProductsFromDB();
            Instance = new Store(products, 13);
        }
    }
}
