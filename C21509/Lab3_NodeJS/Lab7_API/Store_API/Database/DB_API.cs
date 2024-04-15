using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;

namespace Store_API.Database
{
    public class DB_API
    {
        private readonly string connectionString = "server=localhost;user=root;password=123456;database=MyStoreAPI";

        public void ConnectDB()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string createTableSales = @"
                        CREATE TABLE IF NOT EXISTS Sales (
                            IdSale INT AUTO_INCREMENT PRIMARY KEY,                            
                            PurchaseNumber VARCHAR(50) NOT NULL,                           
                            Total DECIMAL(10, 2) NOT NULL,
                            Subtotal DECIMAL(10, 2) NOT NULL,                                                
                            Direction VARCHAR(255) NOT NULL,
                            PaymentMethod INT NOT NULL,
                            DateSale DATETIME NOT NULL
                        );";

                    using (MySqlCommand command = new MySqlCommand(createTableSales, connection))
                    {
                        command.ExecuteNonQuery();
                    }

                    string createTableProducts = @"
                        CREATE TABLE IF NOT EXISTS Products (
                            IdProduct INT AUTO_INCREMENT PRIMARY KEY,
                            Name VARCHAR(255) NOT NULL,
                            ImageUrl VARCHAR(255),
                            Price DECIMAL(10, 2) NOT NULL,
                        );";

                    using (MySqlCommand command = new MySqlCommand(createTableProducts, connection))
                    {
                        command.ExecuteNonQuery();
                    }

                    string createTableSalesLines = @"
                        CREATE TABLE IF NOT EXISTS SalesLines (
                            IdSale INT NOT NULL,
                            IdProduct INT NOT NULL,
                            FOREIGN KEY (IdSale) REFERENCES Sales(IdSale),
                            FOREIGN KEY (IdProduct) REFERENCES Products(IdProduct)
                        );";

                    using (MySqlCommand command = new MySqlCommand(createTableSalesLines, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void InsertProductsStore(List<Product> allProducts)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    foreach (var actualProduct in allProducts)
                    {
                        string insertQuery = @"
                            INSERT INTO Products (Name, ImageUrl, Price)
                            VALUES (@name, @imageUrl, @price);
                        ";

                        using (MySqlCommand command = new MySqlCommand(insertQuery, connection))
                        {
                            command.Parameters.AddWithValue("@name", actualProduct.Name);
                            command.Parameters.AddWithValue("@imageUrl", actualProduct.ImageUrl);
                            command.Parameters.AddWithValue("@price", actualProduct.Price);

                            command.ExecuteNonQuery();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<Product> SelectProducts()
        {
            List<Product> productListToStoreInstance = new List<Product>();

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string selectProducts = @"
                        SELECT IdProduct, Name, ImageUrl, Price
                        FROM Products;
                        ";

                    using (MySqlCommand command = new MySqlCommand(selectProducts, connection))
                    {
                        using (MySqlDataReader readerTable = command.ExecuteReader())
                        {
                            while (readerTable.Read())
                            {
                                productListToStoreInstance.Add(new Product
                                {
                                    Id = Convert.ToInt32(readerTable["IdProduct"]),
                                    Name = readerTable["Name"].ToString(),
                                    ImageUrl = readerTable["ImageUrl"].ToString(),
                                    Price = Convert.ToDecimal(readerTable["Price"])
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return productListToStoreInstance;
        }

        public string InsertSale(Cart purchasedCart)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string insertSale = @"
                        INSERT INTO Sales (Total,PurchaseNum, Subtotal, Direction, PaymentMethod,DateSale)
                        VALUES (@total, @purchaseNumber, @subtotal, @direction, @paymentMethod,@dateSale);
                    ";

                    string purchaseNumber = Guid.NewGuid().ToString();
                    MySqlCommand command = new MySqlCommand(insertSale, connection);
                    command.Parameters.AddWithValue("@total", purchasedCart.Total);
                    command.Parameters.AddWithValue("@purchaseNumber", purchaseNumber);
                    command.Parameters.AddWithValue("@subtotal", purchasedCart.Subtotal);
                    command.Parameters.AddWithValue("@direction", purchasedCart.Direction);
                    command.Parameters.AddWithValue("@paymentMethod", (int)purchasedCart.PaymentMethod.payment);
                    command.Parameters.AddWithValue("@dateSale", DateTime.Now);
                    command.ExecuteNonQuery();

                    InsertSalesLine(purchaseNumber, purchasedCart);

                    return purchaseNumber;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private void InsertSalesLine(string guid, Cart purchasedCart)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string selectIdSale = "SELECT IdSale FROM Sales WHERE PurchaseNumber = @purchaseNumber";
                    decimal IdSaleFromSelect = 0;

                    using (MySqlCommand command = new MySqlCommand(selectIdSale, connection))
                    {
                        command.Parameters.AddWithValue("@purchaseNumber", guid);
                        object existIdSale = command.ExecuteScalar();
                        if (existIdSale == null)
                        {
                            return;
                        }
                        IdSaleFromSelect = Convert.ToInt32(existIdSale);
                    }

                    string insertSalesLine = @"
                        INSERT INTO SalesLines (IdSale, IdProduct)
                        VALUES (@saleId, @productId);";

                    using (MySqlCommand command = new MySqlCommand(insertSalesLine, connection))
                    {
                        foreach (var actualProductId in purchasedCart.allProduct)
                        {
                            command.Parameters.Clear();
                            command.Parameters.AddWithValue("@saleId", IdSaleFromSelect);
                            command.Parameters.AddWithValue("@productId", actualProductId.Id);
                            command.ExecuteNonQuery();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}