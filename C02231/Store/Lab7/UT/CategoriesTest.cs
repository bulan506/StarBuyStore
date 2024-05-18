using Core;
using StoreAPI.Business;
using StoreAPI.Database;
using StoreAPI.models;

namespace UT;

public class CategoriesTest
{

    private SaleReportLogic saleReportLogic;
    private StoreDB storeDB;
    private Categories categories;
    private Store store;
    private Products products1;


    [SetUp]
    public void Setup()
    {
        string connectionString = "Server=localhost;Database=store;Port=3306;Uid=root;Pwd=123456;";
        Storage.Init(connectionString);
        saleReportLogic = new SaleReportLogic();

        // Inicializar las instancias necesarias para las pruebas
        storeDB = new StoreDB();
        store = Store.Instance; // Aquí obtienes la instancia existente de Store
        products1 = Products.Instance;
        categories = Categories.Instance;
    }

    [Test]
    public void CategoryProducts_ReturnsCorrectProducts()
    {
        // Arrange
        int categoryId = 3; // Categoría de ciencia ficción en este ejemplo

        // Act
        IEnumerable<Product> products = products1.GetProductsCategory(categoryId);

        // Assert
        Assert.IsNotNull(products);
        Assert.IsTrue(products.Any()); // Verificar que haya al menos un producto
        Assert.IsTrue(products.All(p => p.ProductCategory.IdCategory == categoryId)); // Verificar que todos los productos sean de la categoría especificada
    }

    [Test]
    public void CategoryProducts_ThrowsArgumentException_WhenNegativeCategoryId()
    {
        // Arrange
        int categoryId = -1;

        // Act & Assert
        Assert.Throws<ArgumentException>(() =>products1.GetProductsCategory(categoryId));

    }



    [Test]
    public void GetCategories_ReturnsCorrectCount()
    {
        // Arrange
        int expectedCount = 10; // Suponiendo que hay 9 categorías en la lista

        // Act
        var _categories = categories.GetCategories();

        // Assert
        Assert.That(_categories.Count(), Is.EqualTo(expectedCount));
    }

    [Test]
    public void GetCategories_ReturnsNotNull()
    {
        // Act
        var _categories = categories.GetCategories();

        // Assert
        Assert.IsNotNull(_categories);
        Assert.IsTrue(_categories.Any());
    }

    [Test]
    public void GetCategories_ReturnsOrderedCategories()
    {
        // Arrange
        var expectedCategories = new List<string> { "Adventure", "Dystopian", "Fantasy", "Fiction", "Gift", "Mystery", "NonFiction", "Romance", "Science Fiction", "Young Adult" };

        // Act
        var _categories = categories.GetCategories();

        // Assert
        CollectionAssert.AreEqual(expectedCategories, _categories.Select(c => c.Name));
    }

}

