using System.Security.Cryptography.X509Certificates;
using StoreAPI.Business;
using StoreAPI.models;

namespace UT;

public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void Validate_Products_Empty()
    {
        StoreLogic storeLogic = new StoreLogic();
        Cart cart= new Cart(){ProductIds = new List<string>(), Address=""};
        Assert.Throws<ArgumentException>(() => storeLogic.Purchase(cart));
    }
    
    [Test]
    public void Validate_Addrress_Empty()
    {
        StoreLogic storeLogic = new StoreLogic();
        var list= new List<string>();
        list.Add("aaaaa");
        Cart cart= new Cart(){ProductIds = list, Address=""};
        Assert.Throws<ArgumentException>(() => storeLogic.Purchase(cart));
    }

     [Test]
    public void Path()
    {
        StoreLogic storeLogic = new StoreLogic();
        var list= new List<string>();
        list.Add("aaaaa");
        Cart cart= new Cart(){ProductIds = list, Address="Santiago"};
        var sale = storeLogic.Purchase(cart);
        Assert.NotNull(sale.NumberOrder);
    }
}