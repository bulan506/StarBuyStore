namespace UT;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Core;
using storeApi.Models.Data;
using storeApi.Models;
using storeApi.DataBase;

public class LogicSalesReportsApiTests
{
    private LogicSalesReportsApi _logicSalesReportsApi;
    private SaleDataBase _saleDataBase;
    [SetUp]
    public void Setup()
    {
        var dbtestDefault = "Server=localhost;Database=mysql;Uid=root;Pwd=123456;";
        var myDbtest = "Server=localhost;Database=store;Uid=root;Pwd=123456;";

        Storage.Init(dbtestDefault, myDbtest);
        _logicSalesReportsApi = new LogicSalesReportsApi();
        _saleDataBase= new SaleDataBase();
    }

    [Test]
    public void GetSalesReport_NullDate_ThrowsArgumentException()
    {
        // Arrange
        DateTime? nullDate = null;
        // Act & Assert
        Assert.ThrowsAsync<ArgumentException>(() => _logicSalesReportsApi.GetSalesReportAsync(nullDate));
    }
    [Test]
    public async Task GetSalesReport_InvalidDateFormat_ThrowsArgumentException()
    {
        // Arrange 
        DateTime emptyDate = DateTime.MinValue;
        // Act & Assert
        Assert.ThrowsAsync<ArgumentException>(() => _logicSalesReportsApi.GetSalesReportAsync(emptyDate));
    }
    [Test]
    public async Task GetSalesReport_NoSalesData_ReturnsEmptySalesReport()
    {
        // Arrange
        DateTime validDate = new DateTime(2024, 4, 24);// fuera de rango, sin datos
        // Act
        SalesReport result = await _logicSalesReportsApi.GetSalesReportAsync(validDate);
        // Assert
        Assert.AreEqual(0, result.Sales.Count());
        Assert.AreEqual(0, result.SalesDaysWeek.Count());
    }
    [Test]
    public async Task GetSalesReport_WithSalesData_ReturnsPopulatedSalesReport()
    {
        // Arrange
        DateTime validDate = new DateTime(2024, 04, 01);
        List<SalesData> salesData = new List<SalesData>
    {
        new SalesData(DateTime.Parse("2024-04-01 10:00:00"), "BVS01", 150.00m, 3, new List<ProductQuantity>
        {
            new ProductQuantity("1", 2),
            new ProductQuantity("2", 1)
        }),
        new SalesData(DateTime.Parse("2024-04-01 12:00:00"), "PUR02", 200.00m, 3, new List<ProductQuantity>
        {
            new ProductQuantity("3", 3)
        }),
    };

        List<SaleAnnotation> salesWeekData = new List<SaleAnnotation>
    {
        new SaleAnnotation(DayOfWeek.Monday.ToString(), 300),
        new SaleAnnotation(DayOfWeek.Tuesday.ToString(), 400),
        new SaleAnnotation(DayOfWeek.Wednesday.ToString(), 300),
        new SaleAnnotation(DayOfWeek.Thursday.ToString(), 400),
        new SaleAnnotation(DayOfWeek.Friday.ToString(), 400),
        };
        // Act
        SalesReport result = await _logicSalesReportsApi.GetSalesReportAsync(validDate);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(salesData.Count(), result.Sales.Count());
        Assert.AreEqual(salesWeekData.Count(), result.SalesDaysWeek.Count());
    }

    [Test]
    public async Task GetSalesByDateAsync_ReturnsCorrectSalesData()
    {
        DateTime date = new DateTime(2024, 4, 1);
        Task<List<SalesData>> result = _saleDataBase.GetSalesByDateAsync(date);
        List<SalesData> listWeekSales = await result;
         List<SalesData> listSaleTest= new List<SalesData>{
            new SalesData(date, "BVS01",150.00m, 3,new List<ProductQuantity>{new ProductQuantity("1",2),new ProductQuantity("2",1)}),
            new SalesData(date, "PUR099",150.00m, 3,new List<ProductQuantity>{new ProductQuantity("1",2),new ProductQuantity("2",1)})
        }; 
        
        // Act & Assert
        Assert.AreEqual(listSaleTest.Count(), listWeekSales.Count());
        Assert.AreEqual(listWeekSales[0].AmountProducts,listWeekSales[0].AmountProducts);
    }
      [Test]
    public async Task GetSalesByDateAsync_ReturnsCorrectSalesWeekData()
    {
        DateTime date = new DateTime(2024, 4, 1);
        Task<List<SaleAnnotation>> result = _saleDataBase.GetSalesWeekAsync(date);
        List<SaleAnnotation> listWeekSales = await result;
         List<SaleAnnotation> listSaleTest= new List<SaleAnnotation>{
            new SaleAnnotation("Monday", 300.00m),
            new SaleAnnotation("Friday", 250.00m),
            new SaleAnnotation("Tuesday", 200.00m),
            new SaleAnnotation("Thursday", 400.00m),
            new SaleAnnotation("Saturday", 180.00m),
        }; 
        
        // Act & Assert
        Assert.AreEqual(listSaleTest.Count(), listWeekSales.Count());
         Assert.AreEqual(listSaleTest.Count(), listWeekSales.Count());
        for (int i = 0; i < listSaleTest.Count; i++)
        {
            Assert.AreEqual(listSaleTest[i].Day, listWeekSales[i].Day);
            Assert.AreEqual(listSaleTest[i].Total, listWeekSales[i].Total);
        }
    }
    
}