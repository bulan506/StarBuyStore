using StoreAPI.models;
using StoreAPI.Database;

namespace StoreAPI.Business
{
    public sealed class SaleReportLogic
    {

        private readonly StoreDB storeDB;

        public SaleReportLogic()
        {
            storeDB = new StoreDB();
        }

        public async Task<SalesReport> GetSalesReportAsync(DateTime date)
        {
            if (date == DateTime.MinValue) throw new ArgumentException($"Invalid date provided: {nameof(date)}");
            StoreDB storeDB = new StoreDB();

            List<WeekSalesReport> weeklySales = (List<WeekSalesReport>)await storeDB.GetWeeklySalesAsync(date);
            List<DaySalesReports> dailySales = (List<DaySalesReports>)await storeDB.GetDailySalesAsync(date);
            SalesReport salesReport = new SalesReport(dailySales, weeklySales);
            return salesReport;
        }

    }
    public class SalesReport
    {

        public List<DaySalesReports> DailySales { get; set; }
        public List<WeekSalesReport> WeeklySales { get; set; }
        public SalesReport(List<DaySalesReports> dailySales, List<WeekSalesReport> weeklySales)
        {
            if (dailySales == null || weeklySales == null) throw new  ArgumentNullException("Parameters cannot be null");
    
            DailySales = dailySales;
            WeeklySales = weeklySales;
        }
    }
}
