using MySqlConnector;
using storeApi.DataBase;
using storeApi.Models;
using storeApi.Models.Data;

namespace storeApi
{
    public sealed class Store
    {
        private Products ProductsInstance;
        public IEnumerable<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }
        public IEnumerable<CategoryStr> Categories { get; private set; }
        private Store(IEnumerable<Product> productsList, int taxPercentage, IEnumerable<CategoryStr> categoryStruct, Products productsInstance)
        {
            if (productsList == null|| productsList.Count()==0)throw new ArgumentNullException($"La lista de productos {nameof(productsList)} no puede ser nula.");
            if (taxPercentage < 1 || taxPercentage > 100)throw new ArgumentOutOfRangeException($"El porcentaje de impuestos {nameof(taxPercentage)} debe estar en el rango de 1 a 100.");
            if (categoryStruct == null|| categoryStruct.Count()==0)throw new ArgumentNullException($"La lista de estructuras {nameof(categoryStruct)} de categorías no puede ser nula.");
            if (productsInstance == null)throw new ArgumentNullException($"La instancia de  {nameof(productsInstance)} no puede ser nula.");
            this.Products = productsList;
            this.TaxPercentage = taxPercentage;
            this.Categories = categoryStruct;
            this.ProductsInstance=productsInstance;
        }
        public static async Task<Store> GetInstanceAsync()
        {
            Products products= await new Products().GetInstanceAsync();
            var productsInstance =  products;
            if (productsInstance == null || productsInstance.GetAllProducts().Count() == 0) throw new ArgumentException($" La instancia {nameof(productsInstance)} no puede ser nula.");
            return new Store(productsInstance.GetAllProducts(), 13, productsInstance.GetCategory(),productsInstance);
        }
        private static readonly Lazy<Task<Store>> instance = new Lazy<Task<Store>>(GetInstanceAsync);
        public static Task<Store> Instance => instance.Value;
        public async Task<IEnumerable<Product>> getProductosCategoryID(int categoryID)
        {
            var productsInstance =  ProductsInstance;
            if (categoryID < 1) throw new ArgumentException($" La categoria {nameof(categoryID)} no puede ser negativa o cero.");
            if (productsInstance == null || productsInstance.GetAllProducts().Count() == 0) throw new ArgumentException($" La instancia {nameof(productsInstance)} no puede ser nula.");
            return productsInstance.GetProductsBycategoryID(categoryID);
        }

    }
}