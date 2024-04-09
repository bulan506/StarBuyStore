namespace ApiLab7;
public sealed class Store
{
    public List<Product> Products { get; private set; }
    public int TaxPercentage { get; private set; }
    public List<PaymentMethods> paymentMethods{ get; private set; }

    private Store( List<Product> products, int TaxPercentage, List<PaymentMethods> paymentMethods )
    {
        this.Products = products;
        this.TaxPercentage = TaxPercentage;
        this.paymentMethods = paymentMethods;
    }

    public readonly static Store Instance;
    
    static Store()
    {
        var products = new List<Product>();

        var productsData = new[]
        {
            new { name = "Producto", description = "Gaming Mouse", imageUrl = "https://cdn.mos.cms.futurecdn.net/rfphfWvEc3PL2wfPJvZGiP.jpg", price = 75.0 },
            new { name = "Producto", description = "Monitor", imageUrl = "https://images.samsung.com/is/image/samsung/assets/nz/members/article-assets/gaming-monitors/img-kv-2.jpg?$ORIGIN_JPG$", price = 700.0 },
            new { name = "Producto", description = "Mousepad", imageUrl = "https://media.steelseriescdn.com/blog/posts/how-to-choose-your-mousepad/38569118cb1443abb9b88cf9b3f10da0.jpg", price = 30.0 },
            new { name = "Producto", description = "Gaming keyboard", imageUrl = "https://png.pngtree.com/png-vector/20220728/ourmid/pngtree-gaming-keyboard-rgb-effect-png-image_6087818.png", price = 30.0 }
        };

        for (int i = 1; i <= 40; i++)
        {
            var productData = productsData[(i - 1) % productsData.Length];

            products.Add(new Product
            {
                Name = $"Producto {i}",
                ImageUrl = productData.imageUrl,
                Price = Convert.ToDecimal(productData.price) * i,
                Description = $"{productData.description} {i}",
                Uuid = Guid.NewGuid()
            });
        }

        var paymentMethods = new List<PaymentMethods>();
        paymentMethods.Add(new Sinpe());
        paymentMethods.Add(new Cash());

        Store.Instance = new Store(products, 13, paymentMethods);
    }
}