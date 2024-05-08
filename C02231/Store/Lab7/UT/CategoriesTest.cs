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

    [SetUp]
    public void Setup()
    {
        string connectionString = "Server=localhost;Database=store;Port=3306;Uid=root;Pwd=123456;";
        Storage.Init(connectionString);
        saleReportLogic = new SaleReportLogic();
    }
    //Funcionalidad de filtrar categorias 
}

