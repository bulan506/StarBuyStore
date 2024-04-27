using System;
using System.Data.Common;
using System.IO.Compression;
using System.Reflection.Metadata;
using MySqlConnector;
using storeApi.Models;

namespace storeApi.DataBase
{
    public sealed class SaleDataBase
    {
        public void Save(Sale sale)
        {
            using (MySqlConnection connection = new MySqlConnection("Server=localhost;Database=store;Uid=root;Pwd=123456;"))
            {
                connection.Open();

                using (MySqlCommand command = connection.CreateCommand())
                {
                    using (var transaction = connection.BeginTransaction())
                    {
                        try
                        {
                            command.Transaction = transaction;

                            command.CommandText = @"
                                    INSERT INTO sales (purchase_date, total, payment_method, purchase_id)
                                    VALUES (@purchase_date, @total, @payment_method, @purchase_id);";

                            command.Parameters.AddWithValue("@purchase_date", DateTime.Now);
                            command.Parameters.AddWithValue("@total", sale.Amount);
                            command.Parameters.AddWithValue("@payment_method", (int)sale.PaymentMethod);
                            command.Parameters.AddWithValue("@purchase_id", sale.PurchaseNumber);

                            command.ExecuteNonQuery();

                            command.Parameters.Clear(); // limpia los parametros 

                            foreach (var productId in sale.Products)
                            {
                                command.CommandText = @"
                                    INSERT INTO linesSales (purchase_id, product_id, quantity, price)
                                    VALUES (@purchase_id, @product_id, @quantity, @price);";

                                command.Parameters.AddWithValue("@purchase_id", sale.PurchaseNumber);
                                command.Parameters.AddWithValue("@product_id", productId.id);
                                command.Parameters.AddWithValue("@quantity", productId.cant);
                                command.Parameters.AddWithValue("@price", productId.price);

                                command.ExecuteNonQuery();
                                command.Parameters.Clear(); // limpia los parametros para cada producto nuevo
                            }
                            transaction.Commit();
                        }
                        catch (Exception)
                        {
                            transaction.Rollback();
                            throw;
                        }
                    }//transaction
                }//command
            }//connection
        }//save
        public List<SalesData> GetSalesByDate(DateTime date)
        {
            List<SalesData> salesList = new List<SalesData>();

            string connectionString = "Server=localhost;Database=store;Uid=root;Pwd=123456;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = @"
                        SELECT s.purchase_date, s.total, s.purchase_id, ls.quantity, p.name
                        FROM sales s
                        INNER JOIN linesSales ls ON s.purchase_id = ls.purchase_id
                        INNER JOIN products p ON ls.product_id = p.id
                        WHERE DATE(s.purchase_date) = DATE(@purchase_date)";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@purchase_date", date);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            DateTime purchaseDate = reader.GetDateTime("purchase_date");
                            decimal total = reader.GetDecimal("total");
                            string purchaseId = reader.GetString("purchase_id");
                            int quantity = reader.GetInt32("quantity");
                            string productName = reader.GetString("name");

                            // Crear una instancia de ProductQuantity para cada producto
                            ProductQuantity productQuantity = new ProductQuantity (productName,quantity);

                            // Buscar si ya existe una instancia de SalesData para esta compra
                            SalesData salesData = salesList.Find(s => s.PurchaseNumber == purchaseId);
                            if (salesData == null)
                            {
                                // Si no existe, crear una nueva instancia de SalesData y agregarla a la lista
                                salesData = new SalesData(purchaseDate, purchaseId, total, 0, new List<ProductQuantity>());
                                salesList.Add(salesData);
                            }

                            // Agregar el ProductQuantity a la lista de ProductAnnotation de SalesData
                            salesData.ProductsAnnotation.Add(productQuantity);

                            // Actualizar la cantidad total de productos en la venta
                            salesData.AmountProducts += quantity;
                        }
                    }
                }
            }

            return salesList;
        }
        public List<SaleAnnotation> GetSalesWeek(DateTime date)
        {
            List<SaleAnnotation> salesByDay = new List<SaleAnnotation>();

            string connectionString = "Server=localhost;Database=store;Uid=root;Pwd=123456;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = @"
                            SELECT DAYNAME(s.purchase_date) AS day, SUM(s.total) AS total
                            FROM sales s
                            WHERE YEARWEEK(s.purchase_date) = YEARWEEK(@purchase_date)
                            GROUP BY DAYNAME(s.purchase_date)";
                
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@purchase_date", date);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            string day = reader.GetString("day");
                            decimal total = reader.GetDecimal("total");
                            salesByDay.Add(new SaleAnnotation(day, total));
                        }
                    }
                }
            }
            return salesByDay;
        }
    }//class
}
