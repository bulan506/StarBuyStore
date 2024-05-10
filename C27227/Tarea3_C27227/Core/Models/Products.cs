using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KEStoreApi;
using KEStoreApi.Data;

namespace Core
{
    public class Products
    {
        public IEnumerable<Product> ProductsStore { get; private set; }
        public Dictionary<int, List<Product>> ProductDictionary { get; private set; }

        private static List<Product> cachedProducts;
        private Products(IEnumerable<Product> products)
        {
            if (products == null)
                throw new ArgumentNullException(nameof(products), "La lista de productos no puede ser nula.");
            if (!products.Any())
                throw new ArgumentException("La lista de productos debe contener al menos un elemento.", nameof(products));

            ProductsStore = products;
            ProductDictionary = new Dictionary<int, List<Product>>();
            foreach (var product in products)
            {
                if (!ProductDictionary.ContainsKey(product.Categoria.Id))
                    ProductDictionary[product.Categoria.Id] = new List<Product>();

                ProductDictionary[product.Categoria.Id].Add(product);
            }
        }

        public static async Task<Products> InitializeAsync()
        {
            if (cachedProducts == null)
            {
                var products = await DatabaseStore.GetProductsFromDBaAsync();
                cachedProducts = products.ToList();
            }

            return new Products(cachedProducts);
        }

        public static async Task<List<Product>> GetProductsByCategory(int categoryId)
        {
            if (categoryId < 1)
                throw new ArgumentException("El ID de categoría debe ser mayor o igual a 1.", nameof(categoryId));

            var products = await InitializeAsync();

            if (!products.ProductDictionary.ContainsKey(categoryId))
                return new List<Product>();

            return products.ProductDictionary[categoryId];
        }

    }
}
