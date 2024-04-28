namespace UT;

using Microsoft.VisualStudio.TestPlatform.TestHost;
using Core;
using storeApi.Business;
using storeApi.Models;
using storeApi;
using storeApi.DataBase;

public class LogicSalesReportsApiTests
{
    private LogicSalesReportsApi _logicSalesReportsApi;

    [SetUp]
    public void Setup()
    {
        _logicSalesReportsApi = new LogicSalesReportsApi();
    }

    [Test]
    public void GetSalesReport_NullDate_ThrowsArgumentException()
    {
        // Arrange
        string nullDate = null;
        // Act & Assert
        Assert.Throws<ArgumentException>(() => _logicSalesReportsApi.GetSalesReport(nullDate));
    }

    [Test]
    public void GetSalesReport_EmptyDate_ThrowsArgumentException()
    {
        // Arrange
        string emptyDate = string.Empty;
        // Act & Assert
        Assert.Throws<ArgumentException>(() => _logicSalesReportsApi.GetSalesReport(emptyDate));
    }

    [Test]
    public void GetSalesReport_InvalidDateFormat_ThrowsArgumentException()
    {
        // Arrange
        string invalidDateFormat = "invalid-date";
        // Act & Assert
        Assert.Throws<ArgumentException>(() => _logicSalesReportsApi.GetSalesReport(invalidDateFormat));
    }

    [Test]
    public void GetSalesReport_NoSalesData_ReturnsEmptySalesReport()
    {
        // Arrange
        string validDate = "2023-04-01";// fuera de rango
        // Act
        SalesReport result = _logicSalesReportsApi.GetSalesReport(validDate);

        // Assert
        Assert.IsNotNull(result);
    }

    [Test]
    public void GetSalesReport_WithSalesData_ReturnsPopulatedSalesReport()
    {
        // Arrange
        string validDate = "2024-04-01"; // Usa una fecha válida según tus datos de ventas
        List<SalesData> salesData = new List<SalesData>
    {
        new SalesData(DateTime.Parse("2024-04-01 10:00:00"), "PUR01", 150.00m, 3, new List<ProductQuantity>
        {
            new ProductQuantity("1", 2),
            new ProductQuantity("2", 1)
        }),
        new SalesData(DateTime.Parse("2024-04-01 12:00:00"), "PUR02", 200.00m, 3, new List<ProductQuantity>
        {
            new ProductQuantity("3", 3)
        }),
        // Agrega más objetos SalesData según tus datos de ventas
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
        SalesReport result = _logicSalesReportsApi.GetSalesReport(validDate);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(salesData.Count, result.Sales.Count);
        Assert.AreEqual(salesWeekData.Count, result.SalesDaysWeek.Count);
    }
    [Test]
    public void GetSalesReport_InvalidDate_NullResponse()
    {
        // Arrange
        string validDate = "2050-04-01";// fecha fuera de rango
        //Act 
        SalesReport result = _logicSalesReportsApi.GetSalesReport(validDate);
        // Assert
        Assert.IsNull(result.Sales);
        Assert.IsNull(result.SalesDaysWeek);
    }
       [Test]
    public void GetSalesReport_WithoutValidDate_ReturnsZeroResponse()
    {
        // Arrange
        string validDate = "2024-04-23";// esta semana no tiene ventas (por default)
        //Act 
        SalesReport result = _logicSalesReportsApi.GetSalesReport(validDate);
        // Assert
        Assert.AreEqual(0,result.Sales.Count);
        Assert.AreEqual(0,result.SalesDaysWeek.Count);
    }
}