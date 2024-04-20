using MySqlConnector;
using ShopApi.Models;

public sealed class SaleDB
{
    public SaleDB() { }

    private const string connectionString = "Server=localhost;Port=3306;Database=store;Uid=root;Pwd=123456;";

    public void insertSale(Sale sale)
    {
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

                        long saleId = insertCommand.LastInsertedId;

                        insertSaleProducts(saleId, sale.products);
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

    private void insertSaleProducts(long saleId, IEnumerable<Product> products)
    {
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();

            // Begin a transaction
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    string insertSaleLineQuery = @"
                        INSERT INTO sale_product (sale_id, product_id, final_price)
                        VALUES (@saleId, @productId, @finalPrice);";

                    foreach (var product in products)
                    {

                        using (var insertCommand = new MySqlCommand(insertSaleLineQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@saleId", saleId);
                            insertCommand.Parameters.AddWithValue("@productId", product.id);
                            insertCommand.Parameters.AddWithValue("@finalPrice", product.price);
                            insertCommand.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw new Exception("An error occurred while saving the sale. Please check the logs for more details.");
                }
            }

        }
    }
}