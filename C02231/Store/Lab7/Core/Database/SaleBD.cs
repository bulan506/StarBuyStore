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

                // Inicia una transacción
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
                        }

                        int saleId;
                        using (var getIdCommand = new MySqlCommand("SELECT LAST_INSERT_ID();", connection, transaction))
                        {
                            saleId = Convert.ToInt32(getIdCommand.ExecuteScalar());
                        }
                        List<int> productIds = new List<int>();
                        List<decimal> finalPrices = new List<decimal>();
                        foreach (var product in sale.Products)
                        {
                            productIds.Add(product.Id);
                            finalPrices.Add(product.Price);
                        }

                        SaleLinesBD saleLinesDB = new SaleLinesBD();
                        saleLinesDB.InsertSaleLines(saleId, productIds, finalPrices);

                        // Si todo ha ido bien, confirma la transacción
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        // Si ocurre un error, deshace la transacción
                        transaction.Rollback();
                        throw; // Propaga la excepción para que sea manejada en niveles superiores
                    }
                }
            }
        }
    }
}