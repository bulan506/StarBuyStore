namespace Core;

public class Products{
    
    public List<Product> productsFromStore {get;}
    public ArrayList categoriesFromStore {get;}
    public Dictionary<int, List<Product>> productsByCategorire {get;private set;}    

    public Products(){
        //Obtenemos los datos que estan en memoria en Store.Instance
        productsFromStore = Store.Instance.Products;
        categoriesFromStore = Store.Instance.StoreCategories;
    }
}
