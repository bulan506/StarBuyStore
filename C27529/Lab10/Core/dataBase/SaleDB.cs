using System;
using MySqlConnector;
using storeApi.Models;

namespace storeApi.Database
{
    public sealed class SaleDB
    {
        public void Save(Sale sale)
        {
            if(sale == null) throw new ArgumentException("Sale must contain at least one product.");
            using (MySqlConnection connection = new MySqlConnection("Server=localhost;Port=3306;Database=mysql;Uid=root;Pwd=123456;"))
            {
                connection.Open();
                using (MySqlTransaction transaction = connection.BeginTransaction())
                {
                    try
                    {

                        string insertQuery = @"
                            use store;

                            INSERT INTO sales (purchase_date, total, payment_method, purchase_number)
                            VALUES (@purchase_date, @total, @payment_method, @purchase_number);"
                            ;

                        using (MySqlCommand command = new MySqlCommand(insertQuery, connection, transaction))
                        {
                            command.Parameters.AddWithValue("@purchase_date", DateTime.Now);
                            command.Parameters.AddWithValue("@total", sale.Amount);
                            command.Parameters.AddWithValue("@payment_method", sale.PaymentMethod);
                            command.Parameters.AddWithValue("@purchase_number", sale.PurchaseNumber);
                            command.ExecuteNonQuery();
                        }

                        string insertQueryLineDB = @"
                            use store;
                            INSERT INTO saleLines (productId, purchaseNumber, price)
                            VALUES (@product_Id, @purchase_Number, @product_Price)";
                        foreach (var product in sale.Products)
                        {
                            using (var insertCommand = new MySqlCommand(insertQueryLineDB, connection, transaction))
                            {


                                insertCommand.Parameters.AddWithValue("@product_Id", product.Id);
                                insertCommand.Parameters.AddWithValue("@purchase_Number", sale.PurchaseNumber);
                                insertCommand.Parameters.AddWithValue("@product_Price", product.Price);
                                insertCommand.ExecuteNonQuery();



                            }
                        }
                        transaction.Commit();
                        Console.WriteLine("Sale saved to database successfully.");
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        Console.WriteLine("An error occurred while saving sale to database: " + ex.Message);
                    }
                }
            }
        }
        public Dictionary<string, decimal> getWeekSales(DateTime date)
        {
            Dictionary<string, decimal> weekSales = new Dictionary<string, decimal>();

            using (MySqlConnection connection = new MySqlConnection("Server=localhost;Port=3306;Database=mysql;Uid=root;Pwd=123456;"))
            {
                connection.Open();

                string selectQuery = @"
                use store;

                SELECT DAYNAME(sale.purchase_date) AS day,
                sale.purchase_number,
                SUM(sale.total) AS total
                FROM sales sale 
                WHERE YEARWEEK(sale.purchase_date) = YEARWEEK(@date)
                GROUP BY DAYNAME(sale.purchase_date), sale.purchase_number; ";

                using (var command = new MySqlCommand(selectQuery, connection))
                {
                    command.Parameters.AddWithValue("@date", date);

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            string day = reader.GetString("day");
                            decimal total = reader.GetDecimal("total");
                            string key = day ; 
                            weekSales.Add(key, total);
                        }

                    }
                }
            }

            return weekSales;
        }

    }
}












