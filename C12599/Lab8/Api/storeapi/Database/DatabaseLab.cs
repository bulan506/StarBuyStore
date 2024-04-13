using MySqlConnector;

namespace storeapi
{
    public class DatabaseLab
    {
        private readonly string _connectionString = "Server=localhost;Uid=root;Pwd=123456;";

        public void CreateDatabase()
        {
            using (var connection = new MySqlConnection(_connectionString))
            using (var command = connection.CreateCommand())
            {
                connection.Open();
                command.CommandText = "CREATE DATABASE IF NOT EXISTS lab;";
                command.ExecuteNonQuery();
            }
        }
    }
}
