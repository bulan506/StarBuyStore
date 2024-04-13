using MySqlConnector;
using System;

namespace storeapi
{
    public class CartSave
    {
        private readonly string _connectionString = "Server=localhost;Database=lab;Uid=root;Pwd=123456;";

        public void SaveToDatabase(decimal total, DateTime date, int purchaseNumber, int paymentMethod)
        {
            try
            {
                EnsureComprasTableExists(); // Asegurar que la tabla 'Compras' exista

                // Insertar el carrito en la base de datos
                using (var connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    string insertQuery = @"
                        INSERT INTO Compras (total, date, purchaseNumber, Paymethod)
                        VALUES (@total, @date, @purchaseNumber, @Paymethod);";

                    using (var command = new MySqlCommand(insertQuery, connection))
                    {
                        command.Parameters.AddWithValue("@total", total);
                        command.Parameters.AddWithValue("@date", date);
                        command.Parameters.AddWithValue("@purchaseNumber", purchaseNumber);
                        command.Parameters.AddWithValue("@Paymethod", paymentMethod);

                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al guardar en la base de datos: {ex.Message}");
            }
        }

        private void EnsureComprasTableExists()
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    // Crear la tabla 'Compras' si no existe
                    string createTableQuery = @"
                        CREATE TABLE IF NOT EXISTS Compras (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            total DECIMAL(10, 2) NOT NULL,
                            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            purchaseNumber INT NOT NULL,
                            Paymethod INT
                        );";

                    using (var command = new MySqlCommand(createTableQuery, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al asegurar la existencia de la tabla 'Compras': {ex.Message}");
            }
        }
    }
}
