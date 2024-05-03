using StoreApi.Models;
using StoreApi.Repositories;
using StoreApi.Queries;
using StoreApi.Handler;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Commands;

namespace StoreApiTests
{
    public class ProductTests
    {
        private IProductRepository _productRepository;
        private GetProductListHandler _getProductListHandler;
        private GetProductByIdHandler _getProductByIdHandler;
        private CreateProductHandler _createProductHandler;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<DbContextClass>()
                .UseInMemoryDatabase(databaseName: "TestDB")
                .Options;

            _productRepository = new ProductRepository(new DbContextClass(options));
            _getProductListHandler = new GetProductListHandler(_productRepository);
            _getProductByIdHandler = new GetProductByIdHandler(_productRepository);
            _createProductHandler = new CreateProductHandler(_productRepository);
        }

        [Test]
        public async Task GetProductListAsync_ShouldReturnProducts()
        {
            // Arrange
            var product1 = new Product { Uuid = Guid.NewGuid(), Name = "Product 1", Description = "Description 1", Price = 10.99m, ImageUrl = "https://example.com/product1.jpg" };
            var product2 = new Product { Uuid = Guid.NewGuid(), Name = "Product 2", Description = "Description 2", Price = 15.99m, ImageUrl = "https://example.com/product2.jpg" };
            await _productRepository.AddProductAsync(product1);
            await _productRepository.AddProductAsync(product2);

            // Act
            var result = await _getProductListHandler.Handle(new GetProductListQuery(), CancellationToken.None);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.Contains(product1, result);
            Assert.Contains(product2, result);
        }

        [Test]
        public async Task GetProductByIdAsync_ShouldReturnProduct()
        {
            // Arrange
            var expectedProduct = new Product
            {
                Uuid = Guid.NewGuid(),
                Name = "Product 1",
                Description = "Description 1",
                Price = 9999,
                ImageUrl = "https://example.com/product1.jpg"
            };
            await _productRepository.AddProductAsync(expectedProduct);

            // Act
            var result = await _getProductByIdHandler.Handle(new GetProductByIdQuery { Uuid = expectedProduct.Uuid }, CancellationToken.None);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(expectedProduct.Uuid, result.Uuid);
            Assert.AreEqual(expectedProduct.Name, result.Name);
            Assert.AreEqual(expectedProduct.Description, result.Description);
            Assert.AreEqual(expectedProduct.Price, result.Price);
            Assert.AreEqual(expectedProduct.ImageUrl, result.ImageUrl);
        }

        [Test]
        public async Task CreateProductAsync_ShouldReturnCreatedProduct()
        {
            // Arrange
            var productToCreate = new Product
            {
                Name = "New Product",
                Description = "Description of new product",
                Price = 9999,
                ImageUrl = "https://example.com/new-product.jpg"
            };

            // Act
            var result = await _createProductHandler.Handle(new CreateProductCommand(
                productToCreate.Name,
                productToCreate.ImageUrl,
                productToCreate.Price,
                productToCreate.Description), CancellationToken.None);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(productToCreate.Name, result.Name);
            Assert.AreEqual(productToCreate.Description, result.Description);
            Assert.AreEqual(productToCreate.Price, result.Price);
            Assert.AreEqual(productToCreate.ImageUrl, result.ImageUrl);
        }
    }
}
