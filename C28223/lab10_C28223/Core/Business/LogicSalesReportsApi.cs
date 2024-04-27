using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;
using storeApi.DataBase;
using storeApi.Models;

namespace storeApi.Business;
public sealed class LogicSalesReportsApi
{
    public LogicSalesReportsApi() { } // Se usa para la creacion de getSalesReport() 
    public SaleDataBase saleDataBase = new SaleDataBase();
    public SalesReport GetSalesReport(string date)
    {
        if (string.IsNullOrWhiteSpace(date)){throw new ArgumentException("La cadena de fecha no puede estar vacía o nula.", nameof(date));}
        if (!DateTime.TryParse(date, out DateTime selectedDate)){throw new ArgumentException("La cadena de fecha no es un formato de fecha válido.", nameof(date));}
        List<SalesData> listSales = saleDataBase.GetSalesByDate(selectedDate);
        List<SaleAnnotation> weekSales = saleDataBase.GetSalesWeek(selectedDate);
        return new SalesReport(listSales,weekSales);
    }
}
public class SalesReport
{
    public List<SalesData> Sales { get; set; }
    public List<SaleAnnotation> SalesDaysWeek { get; set; }
    public SalesReport(List<SalesData> sales,List<SaleAnnotation> salesDaysWeek){
        if(sales == null || sales.Count==0){throw new ArgumentException("La lista de ventas no puede ser nula o estar vacía.", nameof(sales));}
        if (salesDaysWeek == null || salesDaysWeek.Count == 0){throw new ArgumentException("La lista de anotaciones de ventas por semana no puede ser nula o estar vacía.", nameof(salesDaysWeek));}
        Sales=sales;
        SalesDaysWeek=salesDaysWeek;
    }
}
