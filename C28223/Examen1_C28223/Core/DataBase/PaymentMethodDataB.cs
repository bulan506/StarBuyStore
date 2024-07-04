using MySqlConnector;
using Core;

namespace storeApi.DataBase
{
    public sealed class PaymentMethodDataB
    {
        public async Task<IEnumerable<PaymentMethodData>> GetAllPaymentMethodsAsync()
        {
            var paymentMethods = new List<PaymentMethodData>();

            using (var connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("SELECT id, method_name, isActive FROM paymentMethod", connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            paymentMethods.Add(new PaymentMethodData(reader.GetInt32("id"),
                            reader.GetString("method_name"), reader.GetInt32("isActive")));
                        }
                    }
                }
            }
            return paymentMethods;
        }

        public async Task<bool> UpdatePaymentMethodStatusAsync(int id, int isActive)
        {
            if (id < 0) throw new ArgumentException($"{nameof(id)} must be a positive integer.");
            if (isActive != 0 && isActive != 1)throw new ArgumentException($"{nameof(isActive)} must be either 0 (inactive) or 1 (active).");
            using (var connection = new MySqlConnection(Storage.Instance.ConnectionString))
            {
                await connection.OpenAsync();
                using (var command = new MySqlCommand("UPDATE paymentMethod SET isActive = @isActive WHERE id = @id", connection))
                {
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@isActive", isActive);
                    int affectedRows = await command.ExecuteNonQueryAsync();
                    return affectedRows > 0;
                }
            }
        }
    }
}

public class PaymentMethodData
{
    public int Id { get; private set; }
    public string MethodName { get; private set; }
    public int IsActive { get; private set; }

    public PaymentMethodData() { }
    public PaymentMethodData(int id, string methodName, int isActive)
    {
        if (id < 0) throw new ArgumentException("Id must be a positive integer.", nameof(id));
        if (string.IsNullOrWhiteSpace(methodName)) throw new ArgumentException("Method name cannot be null or whitespace.", nameof(methodName));
        if (methodName.Length > 50) throw new ArgumentException("Method name cannot exceed 50 characters.", nameof(methodName));
        if (isActive != 0 && isActive != 1) throw new ArgumentException("IsActive must be either 0 (inactive) or 1 (active).", nameof(isActive));
        Id = id;
        MethodName = methodName;
        IsActive = isActive;
    }
}
