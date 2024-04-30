using System;
using System.Collections.Generic;
using Core;

namespace KEStoreApi
{
    public sealed  class SaleLogic
    {
        private readonly DatabaseSale _databaseSale = new DatabaseSale();

        public SaleLogic(){}

        public async Task<ReportSales> GetReportSalesAsync(DateTime date)
        {
            List<SaleDetails> salesDetails = await _databaseSale.GetDailySalesReport(date);
            List<SalesByDay> salesByDays = await _databaseSale.GetWeeklySalesReport(date);

            ReportSales salesReport = new ReportSales
            {
                Date = date,
                Sales = salesDetails,
                SalesDaysWeek = salesByDays
            };

            return salesReport;
        }
    }

    public class ReportSales
    {
       public DateTime Date { get; set; }
        public List<SaleDetails> Sales { get; set; }
        public List<SalesByDay> SalesDaysWeek { get; set; }
    }
}