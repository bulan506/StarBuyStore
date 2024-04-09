using MySql.Data.MySqlClient;

namespace StoreApi;
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
        var products = new List<Product>();

        string connectionString = "Server=localhost;Port=3306;Database=sys;Uid=root;Pwd=123456;";

        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();
            string query = "SELECT id, name, price, imageUrl, description FROM Products;";
            using (var command = new MySqlCommand(query, connection))

            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    string name = reader.GetString("name");
                    Guid uuid = Guid.Parse(reader.GetString("id"));
                    string imageUrl = reader.GetString("imageUrl");
                    decimal price = reader.GetDecimal("price");
                    string description = reader.GetString("description");
                    // Crear objetos Product y agregarlos a la lista
                    products.Add(new Product { Uuid = uuid, Name = name, Price = price, ImageUrl = imageUrl, Description = description });
                }
            }
        }

        Store.Instance = new Store(products, 13);
    }


    public Sale Purchase(Cart cart)
    {
        if (cart.ProductIds.Count == 0) throw new ArgumentException("Cart must contain at least one product.");
        if (string.IsNullOrWhiteSpace(cart.Address)) throw new ArgumentException("Address must be provided.");

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