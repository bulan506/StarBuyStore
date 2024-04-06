namespace ApiLab7;
public sealed class Store
{
    public List<Product> Products { get; private set; }
    public int TaxPercentage { get; private set; }

    private Store( List<Product> products, int TaxPercentage )
    {
        this.Products = products;
        this.TaxPercentage = TaxPercentage;
    }

    public readonly static Store Instance;
    // Static constructor
    static Store()
    {
        var products = new List<Product>();

        var productsData = new[]
        {
            new { id = 1, name = "Producto", description = "Gaming Mouse", imageUrl = "https://cdn.mos.cms.futurecdn.net/rfphfWvEc3PL2wfPJvZGiP.jpg", price = 75.0 },
            new { id = 2, name = "Producto", description = "Monitor", imageUrl = "https://images.samsung.com/is/image/samsung/assets/nz/members/article-assets/gaming-monitors/img-kv-2.jpg?$ORIGIN_JPG$", price = 700.0 },
            new { id = 3, name = "Producto", description = "Mousepad", imageUrl = "https://media.steelseriescdn.com/blog/posts/how-to-choose-your-mousepad/38569118cb1443abb9b88cf9b3f10da0.jpg", price = 30.0 },
            new { id = 4, name = "Producto", description = "Gaming keyboard", imageUrl = "https://png.pngtree.com/png-vector/20220728/ourmid/pngtree-gaming-keyboard-rgb-effect-png-image_6087818.png", price = 30.0 }
        };

        for (int i = 1; i <= 40; i++)
        {
            var productData = productsData[(i - 1) % productsData.Length]; // Cycling through the options

            products.Add(new Product
            {
                Name = $"Producto {i}",
                ImageUrl = productData.imageUrl,
                Price = Convert.ToDecimal(productData.price) * i,
                Description = $"{productData.description} {i}",
                Uuid = Guid.NewGuid()
            });
        }

        Store.Instance = new Store(products, 13);
    }

    public Sale Purchase (Cart cart)
    {
        if (cart.ProductIds.Count == 0)  throw new ArgumentException("Cart must contain at least one product.");
        if (string.IsNullOrWhiteSpace(cart.Address))throw new ArgumentException("Address must be provided.");

         // Find matching products based on the product IDs in the cart
        IEnumerable<Product> matchingProducts = Products.Where(p => cart.ProductIds.Contains(p.Uuid.ToString())).ToList();

        // Create shadow copies of the matching products
        IEnumerable<Product> shadowCopyProducts = matchingProducts.Select(p => (Product)p.Clone()).ToList();

        // Calculate purchase amount by multiplying each product's price with the store's tax percentage
        decimal purchaseAmount = 0;
        foreach (var product in shadowCopyProducts)
        {
            product.Price *= (1 + (decimal)TaxPercentage / 100);
            purchaseAmount += product.Price;
        }

        PaymentMethods paymentMethod = PaymentMethods.Find(cart.PaymentMethod);

        // Create a sale object
        var sale = new Sale(shadowCopyProducts, cart.Address, purchaseAmount, paymentMethod);

        return sale;

    }
}