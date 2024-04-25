using StoreApi.Models;

namespace StoreApi.Repositories
{
    public interface IDailySalesRepository
    {
        public Task<List<DailySales>> GetDailySalesListAsync(DateTime dateTime);
    }
}
