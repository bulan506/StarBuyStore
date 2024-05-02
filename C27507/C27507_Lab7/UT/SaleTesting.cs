using Core;
using MyStoreAPI.Business;
using MyStoreAPI.DB;
using MyStoreAPI.Models;
using NUnit.Framework;

namespace UT{

    [TestFixture]
    public class SaleTesting{

        [SetUp]
        public void SetUp(){
            
            //var productsFromDB = DB.SelectProducts();
            var productsFromDB = Store.Instance.Products;
            List<Product> someProductsFromDB = new List<Product>();
            someProductsFromDB.add(productsFromDB[0]);
            someProductsFromDB.add(productsFromDB[1]);
        }


        //Test para los datos de consultas de ventas
        [Test]
        public void SaleDaaTesting(){

            var cartTest = new Cart{
                allProduct = someProductsFromDB,
                Subtotal = 1,
                Total = 1,
                Direction = "Costa Rica",
                PaymentMethod = PaymentMethods.paymentMethodsList.First(p => p.payment == PaymentMethodNumber.CASH)
            };

            //Asumimos que los datos del carrito se procesan como una venta
            SaleLogic saleLogic = new SaleLogic(cartTest);
            Sale saleConfirmed = saleLogic.processDataSale();
            var purchaseNum = saleConfirmed.purchaseNum;
            
            Assert.NotNull(saleConfirmed);
            Assert.NotNull(saleConfirmed.purchaseNum);
            Assert.AreEqual(cartTest, saleConfirmed.cart);
        }
    }
}