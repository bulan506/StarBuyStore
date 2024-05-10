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
            IEnumerable<ProductCategoryStruct> categoryList = Category.GetCategories();

            var products = new List<Product>
            {
                new Product
                {
                    Id= 1,
                    Name = $"Iphone",
                    ImageURL = $"/img/Iphone.jpg",
                    Price = 200M,
                    IdCategory = categoryList.Single(category => category.IdCategory == 8)
                },
                new Product
                {
                    Id= 2,
                    Name = $"Audifono",
                    ImageURL = $"/img/audifonos.jpg",
                    Price = 100M,
                    IdCategory = categoryList.Single(category => category.IdCategory == 9)
                },
                new Product
                {
                    Id= 3,
                    Name = $"Mouse",
                    ImageURL = $"/img/mouse.jpg",
                    Price = 35M,
                    IdCategory = categoryList.Single(category => category.IdCategory == 8)
                },
                new Product
                {
                    Id= 4,
                    Name = $"Pantalla",
                    ImageURL = $"/img/Pantalla.jpg",
                    Price = 68M,
                    IdCategory = categoryList.Single(category => category.IdCategory == 8)
                },
                new Product
                {
                    Id= 5,
                    Name = $"Headphone",
                    ImageURL = $"/img/Headphone.jpg",
                    Price = 35M,
                    IdCategory = categoryList.Single(category => category.IdCategory == 9)
                },
                new Product
                {
                    Id= 6,
                    Name = $"Teclado",
                    ImageURL = $"/img/teclado.jpg",
                    Price = 95M,
                    IdCategory = categoryList.Single(category => category.IdCategory == 8)
                },
                new Product
                {
                    Id= 7,
                    Name = $"Cable USB",
                    ImageURL = $"/img/Cable.jpg",
                    Price = 10M,
                    IdCategory = categoryList.Single(category => category.IdCategory == 8)
                },
                new Product
                {
                    Id= 8,
                    Name = $"Chromecast",
                    ImageURL = $"/img/Chromecast.jpg",
                    Price = 150M,
                    IdCategory = categoryList.Single(category => category.IdCategory == 8)
                }
            };

            dbApi.ConnectDB();
            dbApi.InsertProductsStore(products);

            List<Product> dbProducts = dbApi.SelectProducts();

            Store.Instance = new Store(dbProducts);
        }
    }
}