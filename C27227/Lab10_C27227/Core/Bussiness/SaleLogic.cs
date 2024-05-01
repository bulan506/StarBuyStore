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

        public async Task<ReportSales> GetReportSalesAsync(DateTime? date)
        {
            if (date == null)
            {
                throw new ArgumentNullException("La fecha no estar vacía o nula.", nameof(date));
            }
            if (date > DateTime.Now)
            {
                throw new ArgumentOutOfRangeException(nameof(date), "La fecha no puede ser posterior a la fecha actual.");
            }

            DateTime fechaMinima = new DateTime(1900, 1, 1);
            if (date < fechaMinima)
            {
                throw new ArgumentOutOfRangeException(nameof(date), "La fecha no puede ser anterior a una fecha mínima específica.");
            }

            IEnumerable<SaleDetails> salesDetails = await _databaseSale.GetDailySalesReport(date);
            IEnumerable<SalesByDay> salesByDays = await _databaseSale.GetWeeklySalesReport(date);


            ReportSales salesReport = new ReportSales
            {
                Date = (DateTime)date,
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
