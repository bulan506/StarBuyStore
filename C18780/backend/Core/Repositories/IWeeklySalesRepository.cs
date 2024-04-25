using StoreApi.Models;

namespace StoreApi.Repositories
{
    public interface IWeeklySalesRepository
    {
        public Task<List<WeeklySales>> GetWeeklySalesByDateAsync(DateTime dateTime);
    }
}
