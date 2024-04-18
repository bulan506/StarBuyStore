using System;
using MySqlConnector;

namespace storeapi
{
    public sealed class PaymentDB
    {
        private readonly string _connectionString = "Server=localhost;Database=lab;Uid=root;Pwd=123456;";

        public PaymentDB()
        {
        }

        public void InitializePaymentMethods()
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string createTableQuery = @"
                    CREATE TABLE IF NOT EXISTS paymentMethods (
                        id INT PRIMARY KEY,
                        name VARCHAR(20)
                    )";

                using (var createTableCommand = new MySqlCommand(createTableQuery, connection))
                {
                    createTableCommand.ExecuteNonQuery();
                }
            }

            // Insertar métodos de pago definidos en PaymentMethods
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                // Iterar sobre los tipos de métodos de pago definidos en PaymentMethods.Type
                foreach (PaymentMethods.Type paymentType in Enum.GetValues(typeof(PaymentMethods.Type)))
                {
                    PaymentMethods paymentMethod = PaymentMethods.Find(paymentType);

                    if (paymentMethod != null)
                    {
                        string insertQuery = @"
                            INSERT INTO paymentMethods (id, name)
                            VALUES (@id, @name)";

                        using (var insertCommand = new MySqlCommand(insertQuery, connection))
                        {
                            insertCommand.Parameters.AddWithValue("@id", (int)paymentType);
                            insertCommand.Parameters.AddWithValue("@name", paymentType.ToString());
                            insertCommand.ExecuteNonQuery();
                        }
                    }
                }
            }
        }
    }
}
