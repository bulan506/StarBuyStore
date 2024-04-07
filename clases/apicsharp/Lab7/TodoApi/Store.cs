using System;
using MySqlConnector;

namespace TodoApi;
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

        // Generate 30 sample products
        for (int i = 1; i <= 30; i++)
        {
            products.Add(new Product
            {
                Name = $"Product {i}",
                ImageUrl = $"https://example.com/image{i}.jpg",
                Price = 10.99m * i,
                Description = $"Description of Product {i}",
                Uuid = Guid.NewGuid()
            });
        }

        Store.Instance = new Store(products, 13);

        string connectionString = "Server=your_server;Database=your_database;Uid=your_username;Pwd=your_password;";
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();

            // Create the products table if it does not exist
            string createTableQuery = @"
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    price DECIMAL(10, 2)
                );";

            using (var command = new MySqlCommand(createTableQuery, connection))
            {
                command.ExecuteNonQuery();
            }

            // Begin a transaction
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    // Insert 30 products into the table
                    int i =0;
                    foreach(Product prodduct in products)
                    {
                        i++;
                        string productName = $"Product {i}";
                        decimal productPrice = i * 10.0m;

                        string insertProductQuery = @"
                            INSERT INTO products (name, price)
                            VALUES (@name, @price);";

                        using (var insertCommand = new MySqlCommand(insertProductQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@name", productName);
                            insertCommand.Parameters.AddWithValue("@price", productPrice);
                            insertCommand.ExecuteNonQuery();
                        }
                    }

                    // Commit the transaction if all inserts are successful
                    transaction.Commit();
                    Console.WriteLine("Products inserted successfully.");
                }
                catch (Exception ex)
                {
                    // Rollback the transaction if an error occurs
                    transaction.Rollback();
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }
        }
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