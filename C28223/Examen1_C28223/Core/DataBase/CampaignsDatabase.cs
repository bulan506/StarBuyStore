using Core;
using MySqlConnector;
namespace storeApi.DataBase
{
    public sealed class CampaignsDatabase
    {
        public async Task<Campanna> InsertCampaignAsync(Campanna campanna)
        {
            using (var connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connection.OpenAsync();
                using (var transaction = await connection.BeginTransactionAsync())
                {
                    try
                    {
                        var insertQuery = @"INSERT INTO Campaign (Title, ContentCam,DateCam,IsDeleted) 
                                            VALUES (@Title, @ContentCam,@DateCam,@IsDeleted);
                                            SELECT LAST_INSERT_ID();";
                        using (var insertCommand = new MySqlCommand(insertQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@Title", campanna.Title);
                            insertCommand.Parameters.AddWithValue("@ContentCam", campanna.ContentCam);
                            insertCommand.Parameters.AddWithValue("@DateCam", campanna.DateCam);
                            insertCommand.Parameters.AddWithValue("@IsDeleted", campanna.IsDeleted);

                            var newId = Convert.ToInt32(await insertCommand.ExecuteScalarAsync());
                            campanna.Id = newId;
                            await transaction.CommitAsync();
                        }
                    }
                    catch (Exception ex)
                    {
                        await transaction.RollbackAsync();
                        throw; // Re-lanza la excepción para manejarla en un nivel superior
                    }
                }
            }
            return campanna;
        }
        public async Task<IEnumerable<Campanna>> GetAllCampaigns()
        {
            var campaigns = new List<Campanna>();
            using (var connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                connection.Open();
                var query = "SELECT * FROM Campaign WHERE IsDeleted = 0";
                using (var command = new MySqlCommand(query, connection))
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        campaigns.Add(new Campanna
                        (
                            reader.GetInt32("id"),
                            reader.GetString("Title"),
                            reader.GetString("ContentCam"),
                            reader.GetDateTime("DateCam"), 
                            reader.GetInt32("IsDeleted")
                        ));
                    }
                }
            }
            return campaigns;
        }
        public bool DeleteCampaign(int id)
        {
            using (var connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                connection.Open();
                var query = "UPDATE Campaign SET IsDeleted = 1 WHERE Id = @Id";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

        public async Task<IEnumerable<Campanna>> GetLastTop3Campaigns()
        {
            var campaigns = new List<Campanna>();
            using (var connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connection.OpenAsync();
                var query = @"SELECT * 
                      FROM Campaign WHERE IsDeleted = 0
                      ORDER BY DateCam DESC 
                      LIMIT 3";
                using (var command = new MySqlCommand(query, connection))
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        campaigns.Add(new Campanna
                        (
                            reader.GetInt32("id"),
                            reader.GetString("Title"),
                            reader.GetString("ContentCam"),
                            reader.GetDateTime("DateCam"), 
                            reader.GetInt32("IsDeleted")
                        ));
                    }
                }
            }
            return campaigns;
        }
    }
}