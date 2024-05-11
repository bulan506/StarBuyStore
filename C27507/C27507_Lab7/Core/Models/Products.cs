using MyStoreAPI.Models;
namespace Core;

public class Products{
    
    public IEnumerable<Product> productsFromStore {get;}
    public IEnumerable<Category> categoriesFromStore {get;}    

    public Products(){
        //Obtenemos los datos que estan en memoria en Store.Instance        
        productsFromStore = Store.Instance.Products;
        categoriesFromStore = Categories.Instance.CategoryList;

        if(productsFromStore == null || productsFromStore.Count() == 0)
            throw new ArgumentException($"{nameof(productsFromStore)} no es válido" );
        if(categoriesFromStore == null || categoriesFromStore.Count() == 0)
            throw new ArgumentException($"{nameof(categoriesFromStore)} no es válido" );
    }
}
