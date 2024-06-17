using Core;
using MySqlConnector;
using storeApi.Models;
using storeApi.Models.Data;
namespace storeApi.DataBase
{
    public sealed class ProductDatabase
    {
        internal async Task<int> SaveNewProductAsync(NewProductData newProductData)
        {
            if (newProductData == null) { throw new ArgumentNullException($"El parámetro {nameof(newProductData)} no puede ser nulo."); }
            if (string.IsNullOrWhiteSpace(newProductData.Name)) { throw new ArgumentNullException($"El parámetro {nameof(newProductData.Name)} no puede ser nulo o vacio."); }
            if (string.IsNullOrWhiteSpace(newProductData.Description)) { throw new ArgumentNullException($"El parámetro {nameof(newProductData.Description)} no puede ser nulo o vacio."); }
            if (newProductData.Price <= 0) { throw new ArgumentNullException($"El parámetro {nameof(newProductData.Price)} no puede ser 0 o negativo."); }
            if (newProductData.Category <= 0) { throw new ArgumentNullException($"El parámetro {nameof(newProductData.Category)} no puede ser 0 o negativo."); }
            using (var connectionMyDb = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connectionMyDb.OpenAsync();
                var transaction = await connectionMyDb.BeginTransactionAsync();
                try
                {
                    string insertQuery = @"
                                INSERT INTO products (name, description, price, imageURL, categoryID, deleted)
                                VALUES (@name, @description, @price, @imageURL, @categoryID, @deleted);
                                SELECT LAST_INSERT_ID();";

                    using (var command = new MySqlCommand(insertQuery, connectionMyDb, transaction))
                    {
                        command.Parameters.AddWithValue("@name", newProductData.Name);
                        command.Parameters.AddWithValue("@description", newProductData.Description);
                        command.Parameters.AddWithValue("@price", newProductData.Price);
                        command.Parameters.AddWithValue("@imageURL", newProductData.ImageURL);
                        command.Parameters.AddWithValue("@categoryID", newProductData.Category);
                        command.Parameters.AddWithValue("@deleted", 0);
                        int insertedProductId = Convert.ToInt32(await command.ExecuteScalarAsync());
                        await transaction.CommitAsync();
                        // Devolvemos el ID del producto insertado
                        return insertedProductId;
                    }
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        internal async Task LastProductByIdAsync(int productId, LogicProduct.SetNewProductDelegate newProduct = null)
        {
            var categoryList = new Categories();
            using (var connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connection.OpenAsync();
                string query = @"
                                SELECT id, name, description, price, imageURL, categoryID, deleted
                                FROM products
                                WHERE id = @productId";

                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@productId", productId);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            int categoryIdFromDB = reader.GetInt32("categoryID");
                            Category category = categoryList.GetCategoryById(categoryIdFromDB);
                            var lastProductInsert = new Product
                            {
                                id = reader.GetInt32("id"),
                                name = reader.GetString("name"),
                                description = reader.GetString("description"),
                                price = reader.GetDecimal("price"),
                                imageURL = reader.GetString("imageURL"),
                                category = category,
                                deleted = reader.GetInt32("deleted")
                            };
                            newProduct(lastProductInsert);
                        }
                    }
                }
            }
        }

        internal bool DeleteProductByID(int idProduct,LogicProduct. DeleteProductDelegate productToDeleteID = null )
        {
            if (idProduct <= 0)throw new ArgumentException($"El parámetro {nameof(idProduct)} no puede ser 0 o negativo.");
            using (var connectionMyDb = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                connectionMyDb.Open();
                var transaction = connectionMyDb.BeginTransaction();
                try
                {
                   string updateQuery = @"
                                UPDATE products
                                SET deleted = 1
                                WHERE id = @idProduct";

                    using (var command = new MySqlCommand(updateQuery, connectionMyDb, transaction))
                    {
                        command.Parameters.AddWithValue("@idProduct", idProduct);
                        int affectedRows = command.ExecuteNonQuery();
                        transaction.Commit();
                        // Si se afectaron filas, la eliminación fue exitosa
                        if(affectedRows > 0 && productToDeleteID != null) 
                        { 
                            productToDeleteID(idProduct);
                        }
                        return affectedRows > 0;
                    }
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
