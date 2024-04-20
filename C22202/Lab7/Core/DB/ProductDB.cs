using MySqlConnector;
using ShopApi.Models;

public sealed class ProductDB
{
    public ProductDB() { }

    public void inserProduct(Product product)
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
                    // name VARCHAR(100),
                    // price DECIMAL(10, 2),
                    // imgSource VARCHAR(100)
                    string insertProductQuery = @"
                            INSERT INTO products (name, price, imgSource)
                            VALUES (@name, @price, @imgSource);";

                    using (var insertCommand = new MySqlCommand(insertProductQuery, connection, transaction))
                    {
                        insertCommand.Parameters.AddWithValue("@name", product.name);
                        insertCommand.Parameters.AddWithValue("@price", product.price);
                        insertCommand.Parameters.AddWithValue("@imgSource", product.imgSource);
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

    /*public List<Product> getProducts(){
        string connectionString = "Server=localhost;Database=mysql;Uid=root;Pwd=123456;";
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();

            // Begin a transaction
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    // name VARCHAR(100),
                    // price DECIMAL(10, 2),
                    // imgSource VARCHAR(100)
                    string insertProductQuery = @"SELECT * FROM products";

                    using (var insertCommand = new MySqlCommand(insertProductQuery, connection, transaction))
                    {
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
    }*/

}