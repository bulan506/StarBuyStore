using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;
using TodoApi.Models;

namespace TodoApi.Database;
public sealed class SaleDB
{
    public void save(DateTime date, decimal total, int paymentMethod, string purchaseNumber)
    {
        using (MySqlConnection connection = new MySqlConnection("Server=localhost;Database=mysql;Uid=root;Pwd=123456;"))
        {
            connection.Open();

            string createTableQuery = @"
                DROP DATABASE IF EXISTS store;
                CREATE DATABASE store;
                use store;

                CREATE TABLE IF NOT EXISTS sales (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    purchase_date DATETIME NOT NULL,
                    total DECIMAL(10, 2) NOT NULL,
                    payment_method INT NOT NULL,
                    purchase_number VARCHAR(50) NOT NULL
                );
                
                INSERT INTO sales (purchase_date, total, payment_method, purchase_number)
                VALUES 
                    ('2024-04-11 10:00:00', 50.00, 1, '12345'),
                    ('2024-04-11 11:30:00', 75.20, 2, '54321'),
                    ('2024-04-11 13:45:00', 100.50, 1, '98765');";

            using (var command = new MySqlCommand(createTableQuery, connection))
            {
                int result = command.ExecuteNonQuery();
                bool dbNoCreated = result < 0;
                if (dbNoCreated)
                    throw new Exception("Error creating the bd");
            }

            string insertQuery = @"
                INSERT INTO sales (purchase_date, total, payment_method, purchase_number)
                VALUES (@purchase_date, @total, @payment_method, @purchase_number);";

            using (MySqlCommand command = new MySqlCommand(insertQuery, connection))
            {
                command.Parameters.AddWithValue("@purchase_date", date);
                command.Parameters.AddWithValue("@total", total);
                command.Parameters.AddWithValue("@payment_method", paymentMethod);
                command.Parameters.AddWithValue("@purchase_number", purchaseNumber);
                command.ExecuteNonQuery();
            }
            
        }
    }
}