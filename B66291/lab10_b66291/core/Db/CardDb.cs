using MySqlConnector;
using System;
using System.Threading.Tasks;
using core.Models;

namespace core.DataBase
{
    public class CartDb
    {
        private readonly string connectionString = "Server=localhost;Database=geekStoreDB;Uid=root;Pwd=123456;";

        public async Task procesarOrden(Sale saleTask)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync().ConfigureAwait(false);

                using (MySqlCommand command = connection.CreateCommand())
                {
                    using (var transaction = await connection.BeginTransactionAsync().ConfigureAwait(false))
                    {
                        try
                        {
                            command.Transaction = transaction;
                            await InsertSale(command, saleTask).ConfigureAwait(false);
                            await InsertSaleLines(command, saleTask).ConfigureAwait(false);
                            await transaction.CommitAsync().ConfigureAwait(false);
                        }
                        catch (Exception)
                        {
                            await transaction.RollbackAsync().ConfigureAwait(false);
                        }
                    }
                }
            }
        }

        public async Task InsertSale(MySqlCommand command, Sale sale) 
        {
            command.CommandText = @"
                INSERT INTO sales (purchase_date, total, payment_type, purchase_number)
                VALUES (@purchase_date, @total, @payment_type, @purchase_number);";
            
            command.Parameters.AddWithValue("@purchase_number", sale.PurchaseNumber);
            command.Parameters.AddWithValue("@purchase_date", DateTime.Now);
            command.Parameters.AddWithValue("@total", sale.Amount);
            command.Parameters.AddWithValue("@payment_type", (int)sale.PaymentMethod);

            await command.ExecuteNonQueryAsync().ConfigureAwait(false);
        }

        internal async Task InsertSaleLines(MySqlCommand command, Sale sale) 
        {
            foreach (var product in sale.Products)
            {
                command.CommandText = @"
                    INSERT INTO salesLine (purchase_id,  product_id, quantity, price)
                    VALUES (@purchase_id, @product_id, @quantity, @price);"; 

                command.Parameters.AddWithValue("@purchase_id", sale.PurchaseNumber);
                command.Parameters.AddWithValue("@product_id", product.id);
                command.Parameters.AddWithValue("@quantity", product.pcant); 
                command.Parameters.AddWithValue("@price", product.price);

                await command.ExecuteNonQueryAsync().ConfigureAwait(false);
                command.Parameters.Clear(); 
            }
        }
    }
}