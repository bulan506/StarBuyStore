using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;

namespace TodoApi.Database {

public sealed class StoreDB
{

    internal static void CreateMysql()
    {
        
        var products = store.Products;

        string connectionString = "Server=localhost;Database=mysql;Port=3306;Uid=root;Pwd=123456;";
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();

            // Create the products table if it does not exist
            string createTableQuery = @"
                DROP DATABASE IF EXISTS store;
                CREATE DATABASE store;
                use store;
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    price DECIMAL(10, 2)
                );

               CREATE TABLE IF NOT EXISTS sales (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    productIds VARCHAR(100) NOT NULL,
                    purchase_date DATETIME NOT NULL,
                    total DECIMAL(10, 2) NOT NULL,
                    payment_method INT NOT NULL,
                    purchase_number VARCHAR(50) NOT NULL
                );
                
                 INSERT INTO sales (productIds, purchase_date, total, payment_method, purchase_number)
                VALUES 
                    ('1,2,3', '2024-04-11 10:00:00', 50.00, 1, '12345'),
                    ('3,2,9', '2024-04-11 11:30:00', 75.20, 2, '54321'),
                    ('4,5,8','2024-04-11 13:45:00', 100.50, 1, '98765');";;


            using (var command = new MySqlCommand(createTableQuery, connection))
            {
                int result = command.ExecuteNonQuery();
                bool dbNoCreated = result < 0;
                if(dbNoCreated)
                    throw new Exception("Error creating the bd");
            }

            // Begin a transaction
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                
                    foreach(Product product in products)
                    {
                       
                        
                        string insertProductQuery = @"
                            INSERT INTO products (name, price)
                            VALUES (@name, @price);";

                        using (var insertCommand = new MySqlCommand(insertProductQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@name", product.name);
                            insertCommand.Parameters.AddWithValue("@price", product.price);
                            insertCommand.ExecuteNonQuery();
                        }
                    }

                    // Commit the transaction if all inserts are successful
                    transaction.Commit();
                }
                catch (Exception)
                {
                    // Rollback the transaction if an error occurs
                    transaction.Rollback();
                    throw;
                }
            }
        }
    }
}}