using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class SalesRepository : ISalesRepository
    {
        private readonly DbContextClass _dbContext;
        public SalesRepository(DbContextClass dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Sales> AddSalesAsync(Sales sales)
        {
            var result = _dbContext.Sales.Add(sales);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Sales> GetSalesByIdAsync(Guid uuid)
        {
            return await _dbContext.Sales.Where(x => x.Uuid == uuid).FirstOrDefaultAsync();
        }

        public async Task<Sales> GetSalesByPurchaseNumberAsync(string purchaseNumber)
        {
            return await _dbContext.Sales.Where(x => x.PurchaseNumber == purchaseNumber).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateSalesAsync(Sales sales)
        {
            _dbContext.Sales.Update(sales);
            return await _dbContext.SaveChangesAsync();
        }
    }
}