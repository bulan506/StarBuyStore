using NUnit.Framework;
using core;
using System;
using System.Threading.Tasks;
using core.DataBase;
using core.Models;

namespace UT{
public class ReportDBTesting
{
  [TestFixture]
        public class ReportDbTests
        {
			private ReportDb _reportDb;

			[SetUp]
			public void Setup()
			{
				_reportDb = new ReportDb();
			}
        
			[Test]
			public async Task ExtraerVentasDiarias_EscenarioExitoso()
			{
				DateTime date = new DateTime(2024, 5, 1); 
				List<Report> salesList;
				salesList = await ReportDb.ExtraerVentasDiarias(date);
				Assert.IsNotNull(salesList);
			}

			[Test]
			public async Task TestExtraerVentasDiarias_ReturnsValidData()
			{
				DateTime date = new DateTime(2024, 5, 3); 
				ReportDb reportDb = new ReportDb();
				List<Report> dailySales = await ReportDb.ExtraerVentasDiarias(date);
				Assert.IsNotNull(dailySales);
				Assert.IsTrue(dailySales.Count > 0);
			}

			[Test]
			public async Task ExtraerVentasDiarias_ArgumentoVacio()
			{
				DateTime date = new DateTime(2024, 5, 1); 
				List<Report> salesList;
				salesList = await ReportDb.ExtraerVentasDiarias(date);
				Assert.IsNotNull(salesList);
			}
        

			[Test]
			public async Task ExtraerVentasSemanal_EscenarioExitoso()
			{
				DateTime selectedDate = new DateTime(2024, 5, 1);
				List<Report> salesList;
				salesList = await ReportDb.ExtraerVentasSemanal(selectedDate);
				Assert.IsNotNull(salesList);
			}

			[Test]
			public async Task TestExtraerVentasSemanal_VentaSemanalExistent()
			{
				DateTime selectedDate = new DateTime(2024, 5, 3); 
				ReportDb reportDb = new ReportDb();
				List<Report> weeklySales = await ReportDb.ExtraerVentasSemanal(selectedDate);
				Assert.IsNotNull(weeklySales);
				Assert.IsTrue(weeklySales.Count > 0);
			}
        }
    }
}
