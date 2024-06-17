namespace UT;
using storeApi.Models.Data;

public class LogicProductTest
{

     [SetUp]
    public void Setup()
    {
       
    }
    [TestCase("", "Test description", 9.99, "https://example.com/image.jpg", 1, TestName = "AddNewProductAsync_EmptyName_ThrowsArgumentException")]
    [TestCase("Test Product", "", 9.99, "https://example.com/image.jpg", 1, TestName = "AddNewProductAsync_NullDescription_ThrowsArgumentException")]
    [TestCase("Test Product", "", 9.99, "https://example.com/image.jpg", 1, TestName = "AddNewProductAsync_EmptyDescription_ThrowsArgumentException")]
    [TestCase("Test Product", "Test description", 9.99, "", 1, TestName = "AddNewProductAsync_NullImageURL_ThrowsArgumentException")]
    [TestCase("Test Product", "Test description", 9.99, "", 1, TestName = "AddNewProductAsync_EmptyImageURL_ThrowsArgumentException")]
    public void Constructor_InvalidData_ThrowsException(string name, string description, decimal price, string imageUrl, int category)
    {
        // Act & Assert
        Assert.Throws<ArgumentException>(() => new NewProductData(name, imageUrl, price, description, category));
    }
    [TestCase("Test Product", "Test description", 0, "https://example.com/image.jpg", 1, TestName = "AddNewProductAsync_ZeroPrice_ThrowsArgumentOutOfRangeException")]
    [TestCase("Test Product", "Test description", -1, "https://example.com/image.jpg", 1, TestName = "AddNewProductAsync_NegativePrice_ThrowsArgumentOutOfRangeException")]
    [TestCase("Test Product", "Test description", 9.99, "https://example.com/image.jpg", 0, TestName = "AddNewProductAsync_ZeroCategory_ThrowsArgumentOutOfRangeException")]
    public void Constructor_InvalidData_ThrowsExceptionOutRange(string name, string description, decimal price, string imageUrl, int category)
    {
        // Act & Assert
        Assert.Throws<ArgumentOutOfRangeException>(() => new NewProductData(name, imageUrl, price, description, category));
    }
   
}