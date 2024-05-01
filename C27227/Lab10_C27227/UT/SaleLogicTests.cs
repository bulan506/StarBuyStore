using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KEStoreApi;
using Core;
using static KEStoreApi.SaleLogic;

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
            Assert.That(result.Date, Is.EqualTo(date));
            Assert.IsNotNull(result.Sales);
            Assert.IsNotNull(result.SalesByWeek);
            Assert.IsTrue(result.Sales.Any(), "No hay ventas en el informe.");
        }

        [Test]
        public async Task GetReportSalesAsync_WithInvalidDate_ThrowsException()
        {
            // Arrange
            DateTime? invalidDate = DateTime.MaxValue;
                    
            // Act & Assert
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => _saleLogic.GetReportSalesAsync(invalidDate));
        }

        [Test]
        public void GetReportSalesAsync_WithNullDate_ThrowsException()
        {
            DateTime? fechaNullable = null;
            Assert.ThrowsAsync<ArgumentNullException>(() => _saleLogic.GetReportSalesAsync(fechaNullable)); 
        }

    }
    
}
