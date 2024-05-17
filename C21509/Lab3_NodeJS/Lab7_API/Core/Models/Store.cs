using Core.Models;
using Store_API.Database;

namespace Store_API.Models
{
    public sealed class Store
    {
        public List<Product> Products { get; private set; }
        public int TaxPercentage { get; } = 13;

        private Store(List<Product> products)
        {
            this.Products = products;
        }

        public readonly static Store Instance;

        // Static constructor
        static Store()
        {
            DB_API dbApi = new DB_API();

            var products = new List<Product>
            {
                new Product
                {
                    Id= 1,
                    Name = $"Iphone",
                    ImageURL = $"/img/Iphone.jpg",
                    Price = 200M,
                    Categoria  = new Category(1, "Electrónica")
                },
                new Product
                {
                    Id= 2,
                    Name = $"Audifono",
                    ImageURL = $"/img/audifonos.jpg",
                    Price = 100M,
                    Categoria  = new Category(1, "Electrónica")
                },
                new Product
                {
                    Id= 3,
                    Name = $"Mouse",
                    ImageURL = $"/img/mouse.jpg",
                    Price = 35M,
                    Categoria  = new Category(2, "Hogar y oficina")
                },
                new Product
                {
                    Id= 4,
                    Name = $"Pantalla",
                    ImageURL = $"/img/Pantalla.jpg",
                    Price = 68M,
                    Categoria  = new Category(3, "Entretenimiento")
                },
                new Product
                {
                    Id= 5,
                    Name = $"Headphone",
                    ImageURL = $"/img/Headphone.jpg",
                    Price = 35M,
                    Categoria  = new Category(3, "Entretenimiento")
                },
                new Product
                {
                    Id= 6,
                    Name = $"Teclado",
                    ImageURL = $"/img/teclado.jpg",
                    Price = 95M,
                    Categoria  = new Category(1, "Electrónica")
                },
                new Product
                {
                    Id= 7,
                    Name = $"Cable USB",
                    ImageURL = $"/img/Cable.jpg",
                    Price = 10M,
                    Categoria  = new Category(4, "Tecnología")
                },
                new Product
                {
                    Id= 8,
                    Name = $"Chromecast",
                    ImageURL = $"/img/Chromecast.jpg",
                    Price = 150M,
                    Categoria  = new Category(4, "Tecnología")
                }
            };

            dbApi.ConnectDB();
            dbApi.InsertProductsStore(products);

            List<Product> dbProducts = dbApi.SelectProducts();

            Store.Instance = new Store(dbProducts);
        }
    }
}