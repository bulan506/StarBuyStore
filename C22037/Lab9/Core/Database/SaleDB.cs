using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;
using TodoApi.Models;

namespace TodoApi.Database
{
    public sealed class SaleDB
    {
        public void Save(Sale sale)
        {
            using (MySqlConnection connection = new MySqlConnection("Server=localhost;Port=3407;Database=mysql;Uid=root;Pwd=123456;"))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        string insertQuery = @"
                        use store;

                        INSERT INTO sales (purchase_date, total, payment_method, purchase_number)
                        VALUES (@purchase_date, @total, @payment_method, @purchase_number);";

                        using (var insertCommand = new MySqlCommand(insertQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@purchase_date", DateTime.Now);
                            insertCommand.Parameters.AddWithValue("@total", sale.Amount);
                            insertCommand.Parameters.AddWithValue("@payment_method", sale.PaymentMethod);
                            insertCommand.Parameters.AddWithValue("@purchase_number", sale.PurchaseNumber);
                            insertCommand.ExecuteNonQuery();
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
}