using ShopApi.db;

namespace UT;

public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void Test1()
    {
        StoreDB.CreateMysql();
    }
}