
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KEStoreApi.Bussiness;
using KEStoreApi;
using static KEStoreApi.Product;
using Core;

namespace UnitTests
{
    public class StoreLogicTests
    {
        private StoreLogic _storeLogic;

        [SetUp]
        public void Setup()
        {
            string connectionString = "Server=localhost;Database=store;Uid=root;Pwd=123456;";
            DatabaseConfiguration.Init(connectionString);
            _storeLogic = new StoreLogic();
        }


        [Test]
        public void Purchase_WithEmptyCart_ThrowsArgumentException()
        {
            // Arrange
            Cart cart = new Cart
            {
                Product = new List<ProductQuantity>(),
                address = "123 Main St",
                PaymentMethod =  PaymentMethods.Type.SINPE // or any other payment method
            };

            // Act & Assert
            Assert.ThrowsAsync<ArgumentException>(async () => await _storeLogic.Purchase(cart));
        }

        [Test]
        public void Purchase_WithMissingAddress_ThrowsArgumentException()
        {
            // Arrange
            Cart cart = new Cart
            {
                Product = new List<ProductQuantity>
                {
                    new ProductQuantity { Id = 1, Quantity = 2 },
                    new ProductQuantity { Id = 2, Quantity = 1 }
                },
                address = "",
                PaymentMethod =  PaymentMethods.Type.CASH // or any other payment method
            };

            // Act & Assert
            Assert.ThrowsAsync<ArgumentException>(async () => await _storeLogic.Purchase(cart));
        }

    }
}
