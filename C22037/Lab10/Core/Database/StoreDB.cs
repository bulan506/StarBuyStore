using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;
using TodoApi.Models;

namespace TodoApi.Database;
public sealed class StoreDB
{
    public static void CreateMysql()
    {
        var products = new List<Product>
            {
                new Product
                {
                    Id= 1,
                    Name= "Producto 1",
                    Description= "Descripción 1",
                    ImageURL= "https://images-na.ssl-images-amazon.com/images/I/71JSM9i1bQL.AC_UL160_SR160,160.jpg",
                    Price= 10
                },
                new Product
                {
                    Id= 2,
                    Name= "Producto 2",
                    Description= "Descripción 2",
                    ImageURL= "https://images-na.ssl-images-amazon.com/images/I/418UoVylqyL._AC_UL160_SR160,160_.jpg",
                    Price= 20
                },
                new Product
                {
                    Id= 3,
                    Name= "Producto 3",
                    Description= "Descripción 3",
                    ImageURL= "https://images-na.ssl-images-amazon.com/images/I/81WsSyAYxHL._AC_UL160_SR160,160_.jpg",
                    Price= 30
                },
                new Product
                {
                    Id= 4,
                    Name= "Producto 4",
                    Description= "Descripción 4",
                    ImageURL= "https://images-na.ssl-images-amazon.com/images/I/51-lOBlIrFL._AC_UL160_SR160,160_.jpg",
                    Price= 40
                },
                new Product
                {
                    Id= 5,
                    Name= "Producto 2",
                    Description= "Descripción 5",
                    ImageURL= "https://images-na.ssl-images-amazon.com/images/I/51wD-xrtyWL._AC_UL160_SR160,160_.jpg",
                    Price= 50
                },

                new Product
                {
                    Id= 6,
                    Name= "Producto 6",
                    Description= "Descripción 6",
                    ImageURL= "https://images-na.ssl-images-amazon.com/images/I/71EZAE6fljL._AC_UL160_SR160,160_.jpg",
                    Price= 60
                },
                new Product
                {
                    Id= 7,
                    Name= "Producto 7",
                    Description= "Descripción 7",
                    ImageURL= "https://m.media-amazon.com/images/I/817EyM89DtL._AC_SY100_.jpg",
                    Price= 70
                },
                new Product
                {
                    Id= 8,
                    Name= "Producto 8",
                    Description= "Descripción 8",
                    ImageURL= "https://m.media-amazon.com/images/I/61J0e7d0GEL._AC_SY100_.jpg",
                    Price= 80
                },
                new Product
                {
                    Id= 9,
                    Name= "Producto 9",
                    Description= "Descripción 9",
                    ImageURL= "https://m.media-amazon.com/images/I/81mzvAGkHkL._AC_SY100_.jpg",
                    Price= 90
                },
                new Product
                {
                    Id= 10,
                    Name= "Producto 10",
                    Description= "Descripción 10",
                    ImageURL= "https://m.media-amazon.com/images/I/51YlAYwPx6L._AC_SY100_.jpg",
                    Price= 100
                },
                new Product
                {
                    Id= 11,
                    Name= "Producto 11",
                    Description= "Descripción 11",
                    ImageURL= "https://m.media-amazon.com/images/I/71cj5cNm7ZL._AC_UY218_.jpg",
                    Price= 110
                },
                new Product
                {
                    Id= 12,
                    Name= "Producto 12",
                    Description= "Descripción 12",
                    ImageURL= "https://m.media-amazon.com/images/I/7148mbvrbWL._AC_UL320_.jpg",
                    Price= 120
                },
                new Product
                {
                    Id = 13,
                    Name = "Producto 12",
                    Description = "Descripción 13",
                    ImageURL = "https://m.media-amazon.com/images/I/71Pf0aGicBL._AC_UY218_.jpg",
                    Price = 130
                },
                new Product
                {
                    Id= 14,
                    Name= "Producto 14",
                    Description= "Descripción 14",
                    ImageURL= "https://m.media-amazon.com/images/I/71P84KYUfrL._AC_UL320_.jpg",
                    Price= 140
                },
                new Product
                {
                    Id= 15,
                    Name= "Producto 15",
                    Description= "Descripción 15",
                    ImageURL= "https://m.media-amazon.com/images/I/51gJxciP-qL._AC_UY218_T2F_.jpg",
                    Price= 150
                },
                new Product
                {
                    Id= 16,
                    Name= "Producto 16",
                    Description= "Descripción 16",
                    ImageURL= "https://m.media-amazon.com/images/I/61OI1MNjZZL._AC_UY218_T2F_.jpg",
                    Price= 160
                }
            };

        using (var connection = new MySqlConnection(Storage.Instance.ConnectionString))
        {
            connection.Open();

            // Create the products table if it does not exist
            string createTableQuery = @"
                DROP DATABASE IF EXISTS store;
                CREATE DATABASE store;
                use store;

                CREATE TABLE IF NOT EXISTS paymentMethods (
                    paymentId INT PRIMARY KEY,
                    paymentName VARCHAR(30) NOT NULL
                );
                
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    price DECIMAL(10, 2)
                );
                
                CREATE TABLE IF NOT EXISTS sales (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    purchase_date DATETIME NOT NULL,
                    total DECIMAL(10, 2) NOT NULL,
                    payment_method INT NOT NULL,
                    purchase_number VARCHAR(50) NOT NULL,
                    INDEX idx_purchase_number (purchase_number), 
                    FOREIGN KEY (payment_method) REFERENCES paymentMethods(paymentId)
                );

                CREATE TABLE IF NOT EXISTS saleLines (
                    productId INT,
                    purchaseNumber VARCHAR(50),
                    price DECIMAL(10,2) NOT NULL,
                    PRIMARY KEY (productId, purchaseNumber),
                    FOREIGN KEY (productId) REFERENCES products(id),
                    CONSTRAINT fk_purchaseNumber FOREIGN KEY (purchaseNumber) REFERENCES sales(purchase_number)
                );

                INSERT INTO paymentMethods (paymentId, paymentName)
                VALUES 
                    (0, 'Cash'),
                    (1, 'Sinpe');
                    
                INSERT INTO sales (purchase_date, total, payment_method, purchase_number) 
                VALUES
                    ('2024-04-27 08:00:00', 50.00, 1, 'A123456789'),
                    ('2024-04-27 12:30:00', 35.75, 0, 'B987654321'),
                    ('2024-04-28 10:15:00', 75.20, 1, 'C246813579'),
                    ('2024-04-28 14:45:00', 20.50, 0, 'D135792468'),
                    ('2024-04-29 09:20:00', 45.60, 0, 'E987654321'),
                    ('2024-04-29 16:00:00', 90.00, 1, 'F123456789'),
                    ('2024-04-30 11:45:00', 60.30, 0, 'G246813579'),
                    ('2024-04-30 13:20:00', 25.75, 1, 'H135792468'),
                    ('2024-05-01 08:30:00', 55.00, 0, 'I987654321'),
                    ('2024-05-01 15:10:00', 70.25, 1, 'J123456789');

                INSERT INTO sales (purchase_date, total, payment_method, purchase_number) 
                VALUES
                    ('2024-04-18 09:00:00', 40.00, 1, 'X123456789'),
                    ('2024-04-18 14:30:00', 55.25, 0, 'Y987654321'),
                    ('2024-04-19 11:45:00', 70.80, 1, 'Z246813579'),
                    ('2024-04-19 16:15:00', 30.50, 0, 'W135792468'),
                    ('2024-04-20 08:20:00', 65.40, 0, 'V987654321'),
                    ('2024-04-20 12:00:00', 80.00, 1, 'U123456789'),
                    ('2024-04-21 10:30:00', 50.70, 0, 'T246813579'),
                    ('2024-04-21 13:45:00', 35.25, 1, 'S135792468'),
                    ('2024-04-22 09:15:00', 60.00, 0, 'R987654321'),
                    ('2024-04-22 15:40:00', 75.25, 1, 'Q123456789');";


            using (var command = new MySqlCommand(createTableQuery, connection))
            {
                int result = command.ExecuteNonQuery();
                bool dbNoCreated = result < 0;
                if (dbNoCreated)
                    throw new Exception("Error creating the bd");
            }

            // Begin a transaction
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    foreach (Product product in products)
                    {
                        string insertProductQuery = @"
                            INSERT INTO products (name, price)
                            VALUES (@name, @price);";

                        using (var insertCommand = new MySqlCommand(insertProductQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@name", product.Name);
                            insertCommand.Parameters.AddWithValue("@price", product.Price);
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
}