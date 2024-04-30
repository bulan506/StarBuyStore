using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KEStoreApi;
using Core;

namespace UnitTests
{
    public class SaleLogicTests
    {
        private SaleLogic _saleLogic;

        [SetUp]
        public void Setup()
        
        {
             string connectionString = "Server=localhost;Database=store;Uid=root;Pwd=123456;";
            DatabaseConfiguration.Init(connectionString);

            _saleLogic = new SaleLogic();
        }

        [Test]
        public async Task GetReportSalesAsync_ReturnsValidReportSales()
        {
            // Arrange
            DateTime date = DateTime.Now;
            
            // Act
            ReportSales result = await _saleLogic.GetReportSalesAsync(date);
            
            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(date, result.Date);
            Assert.IsNotNull(result.Sales);
            Assert.IsNotNull(result.SalesDaysWeek);
        }

        [Test]
        public async Task GetReportSalesAsync_WithInvalidDate_ReturnsEmptyReportSales()
        {
            // Arrange
            DateTime invalidDate = DateTime.MaxValue;
            
            // Act
            ReportSales result = await _saleLogic.GetReportSalesAsync(invalidDate);
            
            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(invalidDate, result.Date);
            Assert.IsNotNull(result.Sales);
            Assert.IsNotNull(result.SalesDaysWeek);
        }

    }
}
