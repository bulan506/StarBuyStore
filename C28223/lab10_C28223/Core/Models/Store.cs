using MySqlConnector;
using storeApi.DataBase;
using storeApi.Models;
using storeApi.Models.Data;

namespace storeApi
{
    public sealed class Store
    {
        private static Task<Products> products = new Products().GetInstanceAsync();

        public IEnumerable<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }
        public IEnumerable<CategoryStruct> Categories { get; private set; }
        private Store(IEnumerable<Product> productsList, int taxPercentage, IEnumerable<CategoryStruct> categoryStruct)
        {
            if (productsList == null|| productsList.Count()==0)throw new ArgumentNullException($"La lista de productos {nameof(productsList)} no puede ser nula.");
            if (taxPercentage < 1 || taxPercentage > 100)throw new ArgumentOutOfRangeException($"El porcentaje de impuestos {nameof(taxPercentage)} debe estar en el rango de 1 a 100.");
            if (categoryStruct == null|| categoryStruct.Count()==0)throw new ArgumentNullException($"La lista de estructuras {nameof(categoryStruct)} de categorías no puede ser nula.");
            this.Products = productsList;
            this.TaxPercentage = taxPercentage;
            this.Categories = categoryStruct;
        }
        public static async Task<Store> GetInstanceAsync()
        {
            var productsInstance = await products;
            if (productsInstance == null || productsInstance.GetAllProducts().Count() == 0) throw new ArgumentException($" La instancia {nameof(productsInstance)} no puede ser nula.");
            return new Store(productsInstance.GetAllProducts(), 13, productsInstance.GetCategory());
        }
        private static readonly Lazy<Task<Store>> instance = new Lazy<Task<Store>>(GetInstanceAsync);
        public static Task<Store> Instance => instance.Value;
        public async Task<IEnumerable<Product>> getProductosCategoryID(int categoryID)
        {
            var productsInstance = await products;
            if (categoryID < 1) throw new ArgumentException($" La categoria {nameof(categoryID)} no puede ser negativa o cero.");
            if (productsInstance == null || productsInstance.GetAllProducts().Count() == 0) throw new ArgumentException($" La instancia {nameof(productsInstance)} no puede ser nula.");
            return productsInstance.GetProductsBycategoryID(categoryID);
        }

    }
}