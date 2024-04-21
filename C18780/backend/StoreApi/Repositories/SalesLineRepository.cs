using StoreApi.Data;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class SalesLineRepository : ISalesLineRepository
    {
        private readonly DbContextClass _dbContext;
        public SalesLineRepository(DbContextClass dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<SalesLine> AddSalesLineAsync(SalesLine salesLine)
        {
            var result = _dbContext.SalesLine.Add(salesLine);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }
    }
}