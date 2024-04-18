using MySqlConnector;
using ShopApi.Models;

public sealed class CartDB
{
    public CartDB() { }

    public void inserCart(Sale sale)
    {
        string connectionString = "Server=localhost;Database=mysql;Uid=root;Pwd=123456;";
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();

            // Begin a transaction
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    string insertCartQuery = @"
                            INSERT INTO sales (purchase_date, total, payment_method, purchase_number)
                            VALUES (@purchase_date, @total, @payment_method, @purchase_number);";

                    using (var insertCommand = new MySqlCommand(insertCartQuery, connection, transaction))
                    {
                        insertCommand.Parameters.AddWithValue("@purchase_date", DateTime.Now);
                        insertCommand.Parameters.AddWithValue("@total", sale.total);
                        insertCommand.Parameters.AddWithValue("@payment_method", sale.paymentMethod);
                        insertCommand.Parameters.AddWithValue("@purchase_number", sale.purchase_number);
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