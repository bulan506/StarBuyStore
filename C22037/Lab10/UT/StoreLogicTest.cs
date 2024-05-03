using System.Security.Cryptography.X509Certificates;
using TodoApi;
using TodoApi.Business;
using TodoApi.Database;
using TodoApi.Models;
namespace UT;

public class StoreLogicTest
{

    [SetUp]
    public void Setup()
    {
        Storage.Init("Server=localhost;Port=3407;Database=store;Uid=root;Pwd=123456;");
    }

    [Test]
    public async Task Validate_Products_Empty()
    {
        StoreLogic storeLogic = new StoreLogic();
        Cart cart = new Cart() { ProductIds = new List<string>(), Address = "" };
        Assert.ThrowsAsync<ArgumentException>(async () => await storeLogic.Purchase(cart));
    }

    [Test]
    public async Task Validate_Address_Empty()
    {
        StoreLogic storeLogic = new StoreLogic();
        var list = new List<string> { "1" };
        Cart cart = new Cart() { ProductIds = list, Address = "" };
        Assert.ThrowsAsync<ArgumentException>(async () => await storeLogic.Purchase(cart));
    }

    [Test]
    public async Task HappyPath()
    {
        StoreLogic storeLogic = new StoreLogic();
        var list = new List<string>();
        list.Add("1");
        Cart cart = new Cart() { ProductIds = list, Address = "Santiago" };
        var sale = await storeLogic.Purchase(cart);
        Assert.IsNotNull(sale.PurchaseNumber);
    }
}