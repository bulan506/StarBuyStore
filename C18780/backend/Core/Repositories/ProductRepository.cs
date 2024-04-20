using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DbContextClass _dbContext;
        public ProductRepository(DbContextClass dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Product> AddProductAsync(Product product)
        {
            var result = _dbContext.Product.Add(product);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<int> DeleteProductAsync(Guid uuid)
        {
            var filteredData = _dbContext.Product.Where(x => x.Uuid == uuid).FirstOrDefault();
            _dbContext.Product.Remove(filteredData);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<Product> GetProductByIdAsync(Guid uuid)
        {
            return await _dbContext.Product.Where(x => x.Uuid == uuid).FirstOrDefaultAsync();
        }

        public async Task<List<Product>> GetProductListAsync()
        {
            return await _dbContext.Product.ToListAsync();
        }

        public async Task<int> UpdateProductAsync(Product product)
        {
            _dbContext.Product.Update(product);
            return await _dbContext.SaveChangesAsync();        
        }
    }
}
