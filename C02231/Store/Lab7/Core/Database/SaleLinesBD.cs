using System;
using MySqlConnector;
using StoreAPI;
using StoreAPI.models;

namespace StoreAPI.Database;
public sealed class SaleLinesBD
{

    public void InsertSaleLines(SaleLine saleLine)
    {

        using (var connection = new MySqlConnection("Server=localhost;Database=store;Port=3306;Uid=root;Pwd=123456;"))
        {
            connection.Open();

            using (var transaction = connection.BeginTransaction())
            {
                try
                {

                    foreach (var product in saleLine.Products)
                    {
                        string insertSaleLineQuery = @"
                        INSERT INTO sale_lines (sale_id, product_id, final_price)
                        VALUES (@saleId, @productId, @finalPrice);";

                        using (var insertCommand = new MySqlCommand(insertSaleLineQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@saleId", saleLine.Sale.Id);
                            insertCommand.Parameters.AddWithValue("@productId", product.Id);
                            insertCommand.Parameters.AddWithValue("@finalPrice", saleLine.FinalPrice);
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



