using System;
using System.Collections.Generic;
using MySqlConnector;
using storeapi.Models;
using core;

namespace storeapi.Database
{
    public sealed class StoreDB
    {
        public static void CreateMysql()
        {
            var storeDB = new StoreDB();

            using (MySqlConnection connection = new MySqlConnection(DataConnection.Instance.ConnectionStringMyDb))
            {
                connection.Open();

                string createTableQuery = @"
                    CREATE TABLE IF NOT EXISTS products (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100),
                        price DECIMAL(10, 2),
                        image VARCHAR(255),
                        description VARCHAR(255)
                    )";

                using (var createTableCommand = new MySqlCommand(createTableQuery, connection))
                {
                    createTableCommand.ExecuteNonQuery();
                }
            }

            var products = new List<Product>();

            for (int i = 1; i <= 12; i++)
            {
                products.Add(new Product
                {
                    Name = $"Product {i}",
                    ImageUrl = $"https://example.com/image_{i}.jpg",
                    Price = 10.99m * i,
                    Description = $"Description of Product {i}"
                });
            }

            if (products.Count == 0)
            {
                throw new ArgumentException("La lista de productos no puede estar vacía.", nameof(products));
            }

            using (MySqlConnection connection = new MySqlConnection(DataConnection.Instance.ConnectionStringMyDb))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        foreach (Product product in products)
                        {
                            storeDB.ValidateProductForInsert(product);

                            string insertProductQuery = @"
                                INSERT INTO products (name, price, description, image)
                                VALUES (@name, @price, @description, @image);";

                            using (var insertCommand = new MySqlCommand(insertProductQuery, connection, transaction))
                            {
                                insertCommand.Parameters.AddWithValue("@name", product.Name);
                                insertCommand.Parameters.AddWithValue("@price", product.Price);
                                insertCommand.Parameters.AddWithValue("@description", product.Description);
                                insertCommand.Parameters.AddWithValue("@image", product.ImageUrl);

                                insertCommand.ExecuteNonQuery();
                            }
                        }

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception($"Error inserting products into database: {ex.Message}");
                    }
                }
            }
        }

        public static List<string[]> RetrieveDatabaseInfo()
        {
            List<string[]> databaseInfo = new List<string[]>();
            using (MySqlConnection connection = new MySqlConnection(DataConnection.Instance.ConnectionStringMyDb))
            {
                connection.Open();

                string sql = "SELECT * FROM products";

                using (var command = new MySqlCommand(sql, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int fieldCount = reader.FieldCount;
                            string[] row = new string[fieldCount];
                            for (int i = 0; i < fieldCount; i++)
                            {
                                row[i] = reader.GetValue(i).ToString();
                            }
                            databaseInfo.Add(row);
                        }
                    }
                }
            }

            return databaseInfo;
        }

        private void ValidateProductForInsert(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product), "El producto no puede ser nulo.");
            }

            if (string.IsNullOrWhiteSpace(product.Name))
            {
                throw new ArgumentException("El nombre del producto no puede ser nulo o vacío.", nameof(product.Name));
            }

            if (product.Price < 0)
            {
                throw new ArgumentException("El precio del producto no puede ser negativo.", nameof(product.Price));
            }
        }
    }
}
