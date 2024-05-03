using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Models;
using StoreApi.utils;

namespace StoreApi.Repositories
{
    public class weeklySalesRepository : IWeeklySalesRepository
    {
        private readonly DbContextClass _dbContext;
        public weeklySalesRepository(DbContextClass dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<WeeklySales>> GetWeeklySalesByDateAsync(DateTime dateTime)
        {
            var weeklySalesList = new List<WeeklySales>();
            var startDate = Utils.GetFirstDayOfTheWeek(dateTime);
            var endDate = startDate.AddDays(6);

            var salesForWeek = await _dbContext.Sales
                .Where(s => s.Date >= startDate && s.Date <= endDate)
                .ToListAsync();

            for (DateTime day = startDate; day <= endDate; day = day.AddDays(1))
            {
                var salesForDate = salesForWeek.Where(s => s.Date.Date == day.Date);

                var weeklySales = new WeeklySales
                {
                    Date = day.ToString("dddd dd MMMM yyyy"),
                    Total = salesForDate.Sum(s => s.Total)
                };

                weeklySalesList.Add(weeklySales);
            }

            return weeklySalesList;
        }
    }
}