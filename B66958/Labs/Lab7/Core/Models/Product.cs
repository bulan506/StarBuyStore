namespace ApiLab7;

public class Product : ICloneable
{
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public Guid Uuid { get; set; }
    public Category Category { get; set; }

    // Implementation of the ICloneable interface
    public object Clone()
    {
        return new Product
        {
            Uuid = this.Uuid,
            Name = this.Name,
            ImageUrl = this.ImageUrl,
            Price = this.Price,
            Description = this.Description,
            Category = this.Category
        };
    }
}

public class Products
{
    private static Products instance;
    private List<Product> productList;
    private Dictionary<int, Product> ProductsByCategory;

    private Products()
    {
        productList = new List<Product>();
    }

    public static Products Instance
    {
        get
        {
            if (instance == null)
            {
                instance = new Products();
                instance.FillProducts();
            }
            return instance;
        }
    }

    private void FillProducts()
    {
        List<int> categories = Categories
            .Instance.GetCategories()
            .Select(category => category.Id)
            .ToList();

        Random rand = new Random();

        var productsData = new[]
        {
            new
            {
                description = "Gaming Mouse",
                imageUrl = "https://cdn.mos.cms.futurecdn.net/rfphfWvEc3PL2wfPJvZGiP.jpg",
                price = 75.0
            },
            new
            {
                description = "Monitor",
                imageUrl = "https://images.samsung.com/is/image/samsung/assets/nz/members/article-assets/gaming-monitors/img-kv-2.jpg?$ORIGIN_JPG$",
                price = 700.0
            },
            new
            {
                description = "Mousepad",
                imageUrl = "https://media.steelseriescdn.com/blog/posts/how-to-choose-your-mousepad/38569118cb1443abb9b88cf9b3f10da0.jpg",
                price = 30.0
            },
            new
            {
                description = "Gaming keyboard",
                imageUrl = "https://png.pngtree.com/png-vector/20220728/ourmid/pngtree-gaming-keyboard-rgb-effect-png-image_6087818.png",
                price = 30.0
            }
        };

        for (int i = 1; i <= 40; i++)
        {
            var productData = productsData[(i - 1) % productsData.Length];
            int randomIndex = rand.Next(1, categories.Count);

            productList.Add(new Product
            {
                Name = $"Product {i}",
                ImageUrl = productData.imageUrl,
                Price = Convert.ToDecimal(productData.price),
                Description = productData.description,
                Uuid = Guid.NewGuid(),
                Category = Categories.Instance.GetCategoryById(randomIndex)
            });
        }
    }

    public IEnumerable<Product> GetProducts()
    {
        return productList;
    }
}