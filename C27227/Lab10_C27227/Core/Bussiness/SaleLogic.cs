using System;
using System.Collections.Generic;
using Core;

namespace KEStoreApi
{
    public sealed class SaleLogic
    {
        private  DatabaseSale _databaseSale = new();

        public SaleLogic()
        {
        }

        public SaleLogic(DatabaseSale databaseSale)
        {
            _databaseSale = databaseSale ?? throw new ArgumentNullException(nameof(databaseSale));
        }

        public async Task<ReportSales> GetReportSalesAsync(DateTime date)
        {
            if (date < DateTime.MinValue)
            {
                throw new ArgumentException("La fecha no puede ser DateTime.MinValue.", nameof(date));
            }
            if (date > DateTime.Now)
            {
                throw new ArgumentOutOfRangeException(nameof(date), "La fecha no puede ser posterior a la fecha actual.");
            }

            IEnumerable<SaleDetails> salesDetails = await _databaseSale.GetDailySalesReportAsync(date);
            IEnumerable<SalesByDay> salesByDays = await _databaseSale.GetWeeklySalesReportAsync(date);

            ReportSales salesReport = new ReportSales
            {
                Date = date,
                Sales = salesDetails,
                SalesByWeek = salesByDays 
            };

            return salesReport;
        }
        public class ReportSales
        {
            public DateTime Date { get; set; }
            public IEnumerable<SaleDetails> Sales { get; set; }
            public IEnumerable<SalesByDay> SalesByWeek { get; set; }

            public int Count()
            {
                throw new NotImplementedException();
            }
        }
    }
}
