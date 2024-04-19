using System;
using MySqlConnector;
using StoreAPI.models;

namespace StoreAPI.Database
{
    public sealed class SaleBD
    {
        public void Save(Sale sale)
        {
            using (var connection = new MySqlConnection("Server=localhost;Database=store;Port=3306;Uid=root;Pwd=123456;"))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        string insertQuery = @"
                            INSERT INTO sales (purchase_date, total, payment_method, purchase_number)
                            VALUES (@date, @total, @PaymentMethod, @orderNumber);";

                        using (var command = new MySqlCommand(insertQuery, connection, transaction))
                        {
                            command.Parameters.AddWithValue("@date", DateTime.Now);
                            command.Parameters.AddWithValue("@total", sale.Amount);
                            command.Parameters.AddWithValue("@PaymentMethod", sale.PaymentMethod);
                            command.Parameters.AddWithValue("@orderNumber", sale.NumberOrder);

                            command.ExecuteNonQuery();
                            long saleId = command.LastInsertedId;

                            InsertSaleLines(saleId, sale.Products.ToList(), connection, transaction);

                        }



                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw; // Propaga la excepción para que sea manejada en niveles superiores
                    }
                }
            }
        }
        private void InsertSaleLines(long saleId, List<Product> products, MySqlConnection connection, MySqlTransaction transaction)
        {
            try
            {
                foreach (var product in products)
                {
                    string insertSaleLineQuery = @"
                        INSERT INTO sale_lines (sale_id, product_id, final_price)
                        VALUES (@saleId, @productId, @finalPrice);";

                    using (var insertCommand = new MySqlCommand(insertSaleLineQuery, connection, transaction))
                    {
                        insertCommand.Parameters.AddWithValue("@saleId", saleId);
                        insertCommand.Parameters.AddWithValue("@productId", product.Id);
                        insertCommand.Parameters.AddWithValue("@finalPrice", product.Price);
                        insertCommand.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
                // Si ocurre un error, deshace la transacción
                transaction.Rollback();
                throw new Exception("An error occurred while saving the sale. Please check the logs for more details.");
            }
        }
    }
}