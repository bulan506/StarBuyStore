using System;
using MySqlConnector;
using StoreAPI;
using StoreAPI.models;

namespace StoreAPI.Database;
//transaccionar
public sealed class SaleLinesBD
{

    public void InsertSaleLines( int saleId, List<int> productIds, List<decimal> finalPrice)
    {

        using (var connection = new MySqlConnection("Server=localhost;Database=store;Port=3306;Uid=root;Pwd=123456;"))
        {
            connection.Open();

            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    // Insert sale lines for each product
                    for (int i = 0; i < productIds.Count; i++)
                    {
                        string insertSaleLineQuery = @"
                        INSERT INTO sale_lines (sale_id, product_id, final_price)
                        VALUES (@saleId, @productId, @finalPrice);";

                        using (var insertCommand = new MySqlCommand(insertSaleLineQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@saleId", saleId);
                            insertCommand.Parameters.AddWithValue("@productId", productIds[i]);
                            insertCommand.Parameters.AddWithValue("@finalPrice", finalPrice[i]);
                            insertCommand.ExecuteNonQuery();
                        }
                    }
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }
    }
}



