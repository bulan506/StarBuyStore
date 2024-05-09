namespace Core;

public class ProductsLogic{
        
    private Products dataFromStore {get;};
    
    public ProductsLogic(){                       
    }

    public IEnumerable<Product> filterProductsByCategorie(string categoryProp){        

        if (string.IsNullOrEmpty(categoryProp))
            throw new BussinessException($"{nameof(categoryProp)} no puede ser nulo ni vacio");            
        //verificar que la categoria exista en el struct 
        var flag = -1;
        foreach (var c in dataFromStore.categoriesFromStore){
            if(c.name == categoryProp) flag = 1;
        }
        if(flag === -1)throw new BussinessException($"{nameof(categoryProp)} no existe");            
        var filteredProudcts = dataFromStore.productsFromStore.Where(p => p.idCategorie.Contains(categoryProp, StringComparer.OrdinalIgnoreCase)).ToList();

        if (filteredProudcts ==  null)
            throw new BussinessException($"{nameof(filteredProudcts)} no puede ser nulo");        
        return filteredProudcts;
    }
}
