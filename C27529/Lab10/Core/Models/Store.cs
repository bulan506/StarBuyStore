
using MySqlConnector;
using System;
using storeApi.Models;
using System.Net.Http.Headers;
using storeApi.db;
namespace storeApi
{

    public enum ProductCategory
    {
        Audifonos,
        Controles,
        Consolas,
        Videojuegos,
        Mouse,
        Sillas,
        Laptops,
        RealidadVirtual,
        Teclados,
        Monitores,
        Camaras,
        Smartwatches,
        Bicicletas,
        RobotsAspiradores,
        Proyectores,
        Cafeteras
    }




    public sealed class Store
    {
        public List<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }

        private Store(List<Product> products, int TaxPercentage)
        {
            this.Products = products;
            this.TaxPercentage = TaxPercentage;
        }

        public readonly static Store Instance;

        // Static constructor
        static Store()
        {
            List<Product> products = productsFromDB();
            Store.Instance = new Store(products, 13);
        }


        private static List<Product> productsFromDB()
        {

            return StoreDB.GetProducts();

        }
    }
}
