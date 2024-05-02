
using MySqlConnector;
using System;
using storeApi.Models;
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


            var products = new List<Product>
        {
            new Product
            {
                Id = 1,
                Name = "Producto 1",
                Description = "Audífonos con alta fidelidad",
                Price = 20000,
                ImageURL = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_1x._SY116_CB667159060_.jpg",
                Category = ProductCategory.Audifonos
            },
            new Product
            {
                Id = 2,
                Name = "Producto 2",
                Description = "Control PS4",
                Price = 20000,
                ImageURL = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Controller2.png",
                Category = ProductCategory.Controles
            },
            new Product
            {
                Id = 3,
                Name = "Producto 3",
                Description = "PS4 1TB",
                Price = 20000,
                ImageURL = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Playstation3.jpg",
                Category = ProductCategory.Consolas
            },
            new Product
            {
                Id = 4,
                Name = "Producto 4",
                Description = "Crash Bandicoot 4 Switch",
                Price = 20000,
                ImageURL = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Game.png",
                Category = ProductCategory.Videojuegos
            },
            new Product
            {
                Id = 5,
                Name = "Producto 5",
                Description = "Mouse Logitech",
                Price = 20000,
                ImageURL = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_Quad_Mouse.jpg",
                Category = ProductCategory.Mouse
            },
            new Product
            {
                Id = 6,
                Name = "Producto 6",
                Description = "Silla Oficina",
                Price = 20000,
                ImageURL = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_Quad_Chair.jpg",
                Category = ProductCategory.Sillas
            },
            new Product
            {
                Id = 7,
                Name = "Producto 7",
                Description = "Laptop Acer",
                Price = 20000,
                ImageURL = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Laptop.png",
                Category = ProductCategory.Laptops
            },
            new Product
            {
                Id = 8,
                Name = "Producto 8",
                Description = "Oculus Quest 3",
                Price = 20000,
                ImageURL = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Oculus2.jpg",
                Category = ProductCategory.RealidadVirtual
            },
            new Product
            {
                Id = 9,
                Name = "Producto 9",
                Description = "Teclado mecánico RGB",
                Price = 15000,
                ImageURL = "https://m.media-amazon.com/images/I/61uofDvRldS._AC_UL320_.jpg",
                Category = ProductCategory.Teclados
            },
            new Product
            {
                Id = 10,
                Name = "Producto 10",
                Description = "Monitor gaming 144Hz",
                Price = 30000,
                ImageURL = "https://m.media-amazon.com/images/I/71sPOWyMwVL._AC_UL320_.jpg",
                Category = ProductCategory.Monitores
            },
            new Product
            {
                Id = 11,
                Name = "Producto 11",
                Description = "Cámara DSLR Canon EOS",
                Price = 40000,
                ImageURL = "https://m.media-amazon.com/images/I/61o0MBO9jFL._AC_UL320_.jpg",
                Category = ProductCategory.Camaras
            },
            new Product
            {
                Id = 12,
                Name = "Producto 12",
                Description = "Smartwatch Samsung Galaxy",
                Price = 25000,
                ImageURL = "https://m.media-amazon.com/images/I/711f6KLsMaL._AC_UL320_.jpg",
                Category = ProductCategory.Smartwatches
            },
            new Product
            {
                Id = 13,
                Name = "Producto 13",
                Description = "Bicicleta de montaña",
                Price = 150000,
                ImageURL = "https://m.media-amazon.com/images/I/817X9TvYQ3L._AC_UL320_.jpg",
                Category = ProductCategory.Bicicletas
            },
            new Product
            {
                Id = 14,
                Name = "Producto 14",
                Description = "Robot aspirador",
                Price = 35000,
                ImageURL = "https://m.media-amazon.com/images/I/619TvTYML3L._AC_UY218_.jpg",
                Category = ProductCategory.RobotsAspiradores
            },
            new Product
            {
                Id = 15,
                Name = "Producto 15",
                Description = "Proyector de cine en casa",
                Price = 50000,
                ImageURL = "https://m.media-amazon.com/images/I/71iPl3A0ubL._AC_UL320_.jpg",
                Category = ProductCategory.Proyectores
            },
            new Product
            {
                Id = 16,
                Name = "Producto 16",
                Description = "Cafetera espresso",
                Price = 20000,
                ImageURL = "https://m.media-amazon.com/images/I/71BvCt6eAFL._AC_UL320_.jpg",
                Category = ProductCategory.Cafeteras
            }

        };


            Store.Instance = new Store(products, 13);



        }
    }
}
