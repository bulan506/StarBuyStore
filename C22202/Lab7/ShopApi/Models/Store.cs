namespace ShopApi.Models;

public sealed class Store
{
    public List<Product> Products { get; private set; }
    public float TaxPercentage { get; private set; }
    
    private Store( List<Product> products, float TaxPercentage)
    {
        this.Products = products;
        this.TaxPercentage = TaxPercentage;
    }

    public readonly static Store Instance;
    // Static constructor
    static Store()
    {
        var products = new List<Product>();

        // Generate 30 sample products
        for (int i = 1; i <= 30; i++)
        {
            products.Add(new Product
            {
                Name = $"Product {i}",
                ImageUrl = "producto.png",
                Price = 10.99m * i,
                Description = $"Description of Product {i}",
                id = i
            });
        }


        Store.Instance = new Store(products, 0.13f);
    }

    // public Sale Purchase (Cart cart)
    // {
    //     if (cart.ProductIds.Count == 0)  throw new ArgumentException("Cart must contain at least one product.");
    //     if (string.IsNullOrWhiteSpace(cart.Address))throw new ArgumentException("Address must be provided.");

    //      // Find matching products based on the product IDs in the cart
    //     IEnumerable<Product> matchingProducts = Products.Where(p => cart.ProductIds.Contains(p.Uuid.ToString())).ToList();

    //     // Create shadow copies of the matching products
    //     IEnumerable<Product> shadowCopyProducts = matchingProducts.Select(p => (Product)p.Clone()).ToList();

    //     // Calculate purchase amount by multiplying each product's price with the store's tax percentage
    //     decimal purchaseAmount = 0;
    //     foreach (var product in shadowCopyProducts)
    //     {
    //         product.Price *= (1 + (decimal)TaxPercentage / 100);
    //         purchaseAmount += product.Price;
    //     }

    //     // Create a sale object
    //     var sale = new Sale(shadowCopyProducts, cart.Address, purchaseAmount);

    //     return sale;

    // }
}