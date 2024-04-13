using StoreApi.Data;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class SinpeRepository : ISinpeRepository
    {
        private readonly DbContextClass _dbContext;
        public SinpeRepository(DbContextClass dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Sinpe> AddSinpeAsync(Sinpe sinpe)
        {
            var result = _dbContext.Sinpe.Add(sinpe);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }
    }
}