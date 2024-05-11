using MyStoreAPI.Models;
namespace Core;

public class ProductsLogic{
        
    public Products dataFromStore {get;}
    
    public ProductsLogic(){
        this.dataFromStore = new Products();
        
        if(dataFromStore == null) 
            throw new BussinessException($"{nameof(dataFromStore)} no puede ser nulo");        
    }

    public IEnumerable<Product> filterProductsByCategory(int categoryId){        

        if (categoryId <= 0 )
            throw new BussinessException($"{nameof(categoryId)} id de categoría no válido");
        //verificar que la categoria exista en el struct 
        var thisCategoryExist = dataFromStore.categoriesFromStore.Any(c => c.id == categoryId);
        if (!thisCategoryExist)
            throw new BussinessException($"{nameof(categoryId)} no existe");

        var filteredProducts = dataFromStore.productsFromStore.Where(p => p.category.id == categoryId).ToList();

        //Si se permiten listas vacias
        if (filteredProducts ==  null)
            throw new BussinessException($"{nameof(filteredProducts)} no puede ser nulo");        
        return filteredProducts;

    }
}
