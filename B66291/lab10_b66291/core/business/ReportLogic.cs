
using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace core.Business{
public sealed class ReportLogic
{
    public ReportLogic() { }

   public static List<object> TransformarDatos(List<Report> sales) 
   {
    if (sales == null)
    {
        throw new ArgumentNullException(nameof(sales), "The sales list cannot be null.");
    }

    List<object> responseData = new List<object>();

    foreach (var report in sales)
    {
        if (report.purchaseNumber != null && report.purchase_date != null && report.total != null)
        {
            var data = new
            {
                purchaseNumber = report.purchaseNumber,
                purchaseDate = report.purchase_date,
                total = report.total
            };

            responseData.Add(data);
        }
        else
        {
            throw new ArgumentException("Invalid report data: One or more required fields are null.");
        }
    }

    return responseData;
}
   public static List<object>[] listarReportes(List<object> dailySales, List<object> weeklySales)
    {
    if (dailySales == null)
    {
        throw new ArgumentNullException(nameof(dailySales), "The daily sales list cannot be null.");
    }

    if (weeklySales == null)
    {
        throw new ArgumentNullException(nameof(weeklySales), "The weekly sales list cannot be null.");
    }

    List<object>[] reportList = new List<object>[2];
    reportList[0] = dailySales;
    reportList[1] = weeklySales;
    return reportList;
    }

}
}