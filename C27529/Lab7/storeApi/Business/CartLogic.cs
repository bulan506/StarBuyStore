using MySqlConnector;
using System;

namespace storeApi
{
    public sealed class CartLogic
    {
        private readonly string connectionString = "Server=localhost;Database=mysql;Uid=root;Pwd=123456;";

        public CartLogic()
        {
          
        }

        public void SaveCartToDatabase(Cart cart)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                // Crear la tabla si no existe
                string createTableQuery = @"
                    use lab;
                    CREATE TABLE IF NOT EXISTS carts (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        productIds VARCHAR(15),
                        address VARCHAR(255),
                        paymentMethod VARCHAR(50)
                    );";

                using (var createTableCommand = new MySqlCommand(createTableQuery, connection))
                {
                    createTableCommand.ExecuteNonQuery();
                }

                // Insertar datos del carrito
                string insertCartQuery = @"
                    INSERT INTO carts (productIds, address, paymentMethod)
                    VALUES (@productIds, @address, @paymentMethod);";

                using (var insertCommand = new MySqlCommand(insertCartQuery, connection))
                {
                    insertCommand.Parameters.AddWithValue("@productIds", string.Join(",", cart.ProductIds));
                    insertCommand.Parameters.AddWithValue("@address", cart.Address);
                    insertCommand.Parameters.AddWithValue("@paymentMethod", cart.PaymentMethod.ToString());
                    insertCommand.ExecuteNonQuery();
                }

                Console.WriteLine("Cart saved to database successfully.");
            }
        }
    }
}
