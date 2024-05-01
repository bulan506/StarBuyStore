using StoreAPI.models;
using StoreAPI.Database;
using System.Text.Json;

namespace StoreAPI.Business
{
    public sealed class SaleReportLogic
    {
        public static class SalesFormatter
        {
            public static List<SalesReport> FormatDailySales(List<SalesReport> dailySales)
            {
                List<SalesReport> formattedSales = new List<SalesReport>();

                foreach (var sale in dailySales)
                {
                    string purchaseDate = DateTime.Parse(sale.PurchaseDate).ToString("yyyy-MM-dd");
                    formattedSales.Add(new SalesReport(null, purchaseDate, sale.Total));
                }

                return formattedSales;
            }
        }
    }
}