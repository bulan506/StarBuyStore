using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;
using TodoApi.models;

namespace TodoApi.db;
public sealed class SaleDB
{
    public void save(Sale sale)
    {
        using (MySqlConnection connection = new MySqlConnection("Server=localhost;Database=mysql;Uid=root;Pwd=123456;"))
        {
            connection.Open();

            string insertQuery = @"
                INSERT INTO sales (purchase_date, total, payment_method, purchase_number)
                VALUES (@purchase_date, @total, @payment_method, @purchase_number);";

            using (MySqlCommand command = new MySqlCommand(insertQuery, connection))
            {
                command.Parameters.AddWithValue("@purchase_date", DateTime.Now);
                command.Parameters.AddWithValue("@total", sale.Amount);
                command.Parameters.AddWithValue("@payment_method", (int)sale.PaymentMethod.PaymentType);
                command.Parameters.AddWithValue("@purchase_number", sale.PurchaseNumber);

                command.ExecuteNonQuery();
            }
        }
    }
}
