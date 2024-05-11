using ShopApi.Models;

public class ProductsLogic
{
    public IEnumerable<Product> products { get; }
    private Dictionary<int, List<Product>> productsDictionary;

    private ProductsLogic(IEnumerable<Product> products, Dictionary<int, List<Product>> productsDictionary)
    {
        this.products = products;
        this.productsDictionary = productsDictionary;
    }

    public static ProductsLogic Instance;
    static ProductsLogic()
    {
        var products = ProductDB.getProducts();
        Dictionary<int, List<Product>> productsDictionary = new Dictionary<int, List<Product>>();

        foreach (var product in products)
        {
            // var categoryProducts = new List<Product>();
            if (!productsDictionary.TryGetValue(product.category, out var categoryProducts))
            {
                categoryProducts = new List<Product>();
                productsDictionary[product.category] = categoryProducts;
            }
            // if (categoryProducts == null)
            // {
            //     categoryProducts = new List<Product>();
            //     productsDictionary[product.category] = categoryProducts;
            // }
            categoryProducts.Add(product);
            

        }

        ProductsLogic.Instance = new ProductsLogic(products, productsDictionary);

    }

    public IEnumerable<Product> GetProductsCategory(int categoryId)
    {
        if (categoryId < 0) throw new ArgumentException($"The {nameof(categoryId)} number must be greater than 0");

        if(categoryId == 0) return this.products;

        this.productsDictionary.TryGetValue(categoryId, out var products);
        if (products == null) products = new List<Product>();
        return products;
    }

}