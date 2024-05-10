using MyStoreAPI.Models;
namespace Core;

public class Products{
    
    public IEnumerable<Product> productsFromStore {get;}
    public IEnumerable<Category> categoriesFromStore {get;}
    public Dictionary<int, List<Product>> productsByCategory {get;private set;}    

    public Products(){
        //Obtenemos los datos que estan en memoria en Store.Instance        
        productsFromStore = Store.Instance.Products;
        categoriesFromStore = Categories.Instance.CategoryList;

        if(productsFromStore == null || productsFromStore.Count() == 0)
            throw new ArgumentException($"{nameof(productsFromStore)} no es valido" );
        if(categoriesFromStore == null || categoriesFromStore.Count() == 0)
            throw new ArgumentException($"{nameof(categoriesFromStore)} no es valido" );
    }
}
