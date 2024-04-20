using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;
using Store_API.Models;

namespace Store_API.Database
{
    public class DB_API
    {
        private readonly string connectionString = "server=localhost;user=root;password=123456;database=Store_API";

        public void ConnectDB()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string createTablePaymentMethod = @"
                        CREATE TABLE IF NOT EXISTS PaymentMethod (
                           PaymentMethodId INT AUTO_INCREMENT PRIMARY KEY,
                           PaymentMethodName VARCHAR(10) NOT NULL
                        );";

                    using (MySqlCommand command = new MySqlCommand(createTablePaymentMethod, connection))
                    {
                        command.ExecuteNonQuery();
                    }

                    string createTableSales = @"
                        CREATE TABLE IF NOT EXISTS Sales (
                            IdSale INT AUTO_INCREMENT PRIMARY KEY,                            
                            PurchaseNumber VARCHAR(50) NOT NULL,                           
                            Total DECIMAL(10, 2) NOT NULL,
                            Subtotal DECIMAL(10, 2) NOT NULL,                                                
                            Address VARCHAR(255) NOT NULL,
                            PaymentMethodId INT NOT NULL,
                            DateSale DATETIME NOT NULL,
                            FOREIGN KEY (PaymentMethodId) REFERENCES PaymentMethod(PaymentMethodId)
                        );";

                    using (MySqlCommand command = new MySqlCommand(createTableSales, connection))
                    {
                        command.ExecuteNonQuery();
                    }

                    string createTableProducts = @"
                        CREATE TABLE IF NOT EXISTS Products (
                            IdProduct INT AUTO_INCREMENT PRIMARY KEY,
                            Name VARCHAR(255) NOT NULL,
                            ImageURL VARCHAR(255),
                            Price DECIMAL(10, 2) NOT NULL
                        );";

                    using (MySqlCommand command = new MySqlCommand(createTableProducts, connection))
                    {
                        command.ExecuteNonQuery();
                    }

                    string createTableSalesLines = @"
                        CREATE TABLE IF NOT EXISTS SalesLines (
                            IdSaleLine INT AUTO_INCREMENT PRIMARY KEY,
                            IdSale INT NOT NULL,
                            IdProduct INT NOT NULL,
                            Price DECIMAL(10, 2) NOT NULL,
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
                            INSERT INTO Products (Name, ImageURL, Price)
                            VALUES (@name, @imageURL, @price);
                        ";

                        using (MySqlCommand command = new MySqlCommand(insertQuery, connection))
                        {
                            command.Parameters.AddWithValue("@name", actualProduct.Name);
                            command.Parameters.AddWithValue("@imageURL", actualProduct.ImageURL);
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
                        SELECT IdProduct, Name, ImageURL, Price
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
                                    ImageURL = readerTable["ImageURL"].ToString(),
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

        public string InsertSale(Sale sale)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        string insertSale = @"
                            INSERT INTO Sales (Total, Subtotal, PurchaseNumber, Address, PaymentMethodId, DateSale)
                            VALUES (@total, @subtotal, @purchaseNumber, @address, @paymentMethod, @dateSale);
                        ";

                        string purchaseNumber = GeneratePurchaseNumber();

                        using (MySqlCommand command = new MySqlCommand(insertSale, connection))
                        {
                            command.Parameters.AddWithValue("@total", sale.Amount);
                            command.Parameters.AddWithValue("@subtotal", sale.Amount);
                            command.Parameters.AddWithValue("@purchaseNumber", purchaseNumber);
                            command.Parameters.AddWithValue("@address", sale.Address);
                            command.Parameters.AddWithValue("@paymentMethod", (int)sale.PaymentMethod);
                            command.Parameters.AddWithValue("@dateSale", DateTime.Now);
                            command.ExecuteNonQuery();
                        }

                        InsertSalesLines(connection, transaction, purchaseNumber, sale.Products);

                        transaction.Commit();

                        return purchaseNumber;
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }

        private void InsertSalesLines(MySqlConnection connection, MySqlTransaction transaction, string purchaseNumber, List<Product> products)
        {
            string selectIdSale = "SELECT IdSale FROM Sales WHERE PurchaseNumber = @purchaseNumber";
            decimal idSaleFromSelect;

            using (MySqlCommand command = new MySqlCommand(selectIdSale, connection, transaction))
            {
                command.Parameters.AddWithValue("@purchaseNumber", purchaseNumber);
                idSaleFromSelect = Convert.ToDecimal(command.ExecuteScalar());
            }

            string insertSalesLine = @"
                INSERT INTO SalesLines (IdSale, IdProduct, Price)
                VALUES (@idSale, @idProduct, @price);
            ";

            foreach (var product in products)
            {
                using (MySqlCommand command = new MySqlCommand(insertSalesLine, connection, transaction))
                {
                    command.Parameters.AddWithValue("@idSale", idSaleFromSelect);
                    command.Parameters.AddWithValue("@idProduct", product.Id);
                    command.Parameters.AddWithValue("@price", product.Price);
                    command.ExecuteNonQuery();
                }
            }
        }

        private string GeneratePurchaseNumber()
        {
            Random random = new Random();
            return random.Next(100, 999).ToString();
        }
    }
}