using Core;
using MySqlConnector;
using storeApi.Models;
using storeApi.Models.Data;
namespace storeApi.DataBase
{
    public sealed class ProductDatabase
    {
        internal async Task SaveNewProductAsync(NewProductData newProductData, LogicProduct.SetNewProductDelegate newProductDelegate = null)
        {
            if (newProductData == null) { throw new ArgumentNullException(nameof(newProductData)); }
            if (string.IsNullOrWhiteSpace(newProductData.Name)) { throw new ArgumentNullException(nameof(newProductData.Name)); }
            if (string.IsNullOrWhiteSpace(newProductData.Description)) { throw new ArgumentNullException(nameof(newProductData.Description)); }
            if (newProductData.Price <= 0) { throw new ArgumentOutOfRangeException(nameof(newProductData.Price)); }
            if (newProductData.Category <= 0) { throw new ArgumentOutOfRangeException(nameof(newProductData.Category)); }

            using (var connectionMyDb = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connectionMyDb.OpenAsync();
                var transaction = await connectionMyDb.BeginTransactionAsync();
                try
                {
                    string insertQuery = @"
                                INSERT INTO products (name, description, price, imageURL, categoryID, deleted)
                                VALUES (@name, @description, @price, @imageURL, @categoryID, @deleted);
                                SELECT LAST_INSERT_ID();";// esta linea es completamente necesaria 
                                                          // ya que el id me lo da la base de datos, no es un paramatro 
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

                        // Si el delegado no es nulo, llamar al delegado con el nuevo producto
                        if (newProductDelegate != null)
                        {
                            var newProduct = new Product
                            {
                                id = insertedProductId,
                                name = newProductData.Name,
                                description = newProductData.Description,
                                price = newProductData.Price,
                                imageURL = newProductData.ImageURL,
                                category = new Categories().GetCategoryById(newProductData.Category),
                                deleted = 0
                            };
                            newProductDelegate(newProduct);
                        }
                    }
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

       

        internal bool DeleteProductByID(int idProduct, LogicProduct.DeleteProductDelegate productToDeleteID = null)
        {
            if (idProduct <= 0) throw new ArgumentException($"El parámetro {nameof(idProduct)} no puede ser 0 o negativo.");
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
                        if (affectedRows > 0 && productToDeleteID != null)
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
