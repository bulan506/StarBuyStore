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
    private SaleDataBase saleDataBase = new SaleDataBase();
    public SalesReport GetSalesReport(string date)
    {
        if (string.IsNullOrWhiteSpace(date)){throw new ArgumentException("La cadena de fecha no puede estar vacía o nula.", nameof(date));}
        if (!DateTime.TryParse(date, out DateTime selectedDate)){throw new ArgumentException("La cadena de fecha no es un formato de fecha válido.", nameof(date));}
        if (selectedDate>DateTime.Now){return new SalesReport();}
        List<SalesData> listSales = saleDataBase.GetSalesByDate(selectedDate);
        List<SaleAnnotation> weekSales = saleDataBase.GetSalesWeek(selectedDate);
        return new SalesReport{Sales=listSales,SalesDaysWeek=weekSales};
    }
}
public class SalesReport
{
    public List<SalesData> Sales { get; set; }
    public List<SaleAnnotation> SalesDaysWeek { get; set; }
}
