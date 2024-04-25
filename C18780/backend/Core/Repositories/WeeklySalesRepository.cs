using System.Linq;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class weeklySalesRepository : IWeeklySalesRepository
    {
        private readonly DbContextClass _dbContext;
        public weeklySalesRepository(DbContextClass dbContext)
        {
            _dbContext = dbContext;
        }

        /*
        Traer las ventas por semana
        Entrada
        fecha

        Salida lista
        Nombre del producto
        Total de venta del producto


        paso 1 obtener todos los sales de la fecha que necesito
        */

        public async Task<List<WeeklySales>> GetWeeklySalesByDateAsync(DateTime dateTime)
        {
            var weeklySalesList = new List<WeeklySales>();
            var day = utils.Utils.GetFirstDayOfTheWeek(dateTime);

            for (int i = 0; i < 7; i++)
            {
                var salesForDate = await _dbContext.Sales
                .Where(s => s.Date.Date == day.Date)
                .ToListAsync();

                var weeklySales = new WeeklySales
                {
                    Date = day.ToString("dddd") + " " + day.Day + " " + day.ToString("MMMM") + " " + day.Year,
                    Total = salesForDate.Sum(s => s.Total)
                };

                weeklySalesList.Add(weeklySales);
                day = day.AddDays(1);
            }

            return weeklySalesList;
        }
    }
}