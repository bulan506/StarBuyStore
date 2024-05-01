using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;
using storeApi.DataBase;
using storeApi.Models.Data;

namespace storeApi.Models;
public sealed class LogicSalesReportsApi
{
    public LogicSalesReportsApi() { } // Se usa para la creacion de getSalesReport() 
    private readonly SaleDataBase saleDataBase = new SaleDataBase();
    public async Task<SalesReport> GetSalesReportAsync(DateTime? date)
        {
            if (date == null){throw new ArgumentException("La cadena de fecha no puede estar vacía o nula.", nameof(date));}
            if (date > DateTime.Now){return new SalesReport();}
            if (date == DateTime.MinValue || date==DateTime.MaxValue) { throw new ArgumentException("La fecha no puede ser DateTime.MinValue o DateTime.MaxValue.", nameof(date)); }
            Task<List<SalesData>> salesByDateTask = saleDataBase.GetSalesByDateAsync(date);
            Task<List<SaleAnnotation>> salesWeekTask = saleDataBase.GetSalesWeekAsync(date);
            await Task.WhenAll(salesByDateTask, salesWeekTask);
            List<SalesData> listSales = await salesByDateTask;
            List<SaleAnnotation> weekSales = await salesWeekTask;
            return new SalesReport { Sales = listSales, SalesDaysWeek = weekSales };
        }
    }

    public class SalesReport
    {
        public List<SalesData> Sales { get; set; }
        public List<SaleAnnotation> SalesDaysWeek { get; set; }
    }
