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

        if (categoryId < 0 )
            throw new BussinessException($"{nameof(categoryId)} id de categoría no válido");
        //verificar que la categoria exista en el struct 
        var thisCategoryExist = dataFromStore.categoriesFromStore.Any(c => c.id == categoryId);
        if (!thisCategoryExist)
            throw new BussinessException($"{nameof(categoryId)} no existe");


        //Si se permiten listas vacias
        if(categoryId == 0){            
            return dataFromStore.productsFromStore.ToList();
        }        
        var filteredProducts = dataFromStore.productsFromStore.Where(p => p.category.id == categoryId).ToList();                
        if (filteredProducts ==  null)
            throw new BussinessException($"{nameof(filteredProducts)} no puede ser nulo");        
        return filteredProducts;

    }

    public IEnumerable<Product> filterProductsBySearchAndCategory(string searchText, int[] categoryIds){
        //El texto del buscador si puede ser vacío
        if(searchText == null) throw new BussinessException($"{nameof(searchText)} no puede ser nulo");
        if(categoryIds == null) throw new BussinessException($"{nameof(filteredProducts)} no puede ser nulo");

        var filteredProducts = new List<Product>();

        //Si la lista de categorias donde buscar esta vacío, devolvemos todos los productos
        if(categoryIds.length == 0){
            filteredProducts = dataFromStore.productsFromStore;       
        }else{
            //Si hay categorias especificadas
            foreach (var id in categoryIds){
                if (dataFromStore.dictionaryOfProducts.ContainsKey(id)){
                    //Guardamos todos los productos asociados a un id especifico            
                    filteredProducts.AddRange(dataFromStore.dictionaryOfProducts[id]);
                }
            }
        }

        //Ordenamos la lista con los productos para la busqueda binaria (por nombre de los productos)
        filteredProducts.Sort( (x,y) => string.Compare(x.name, y.name) );        

        if(string.IsNullOrEmpty(searchText)){
            return filteredProducts;
        }    
        //Busqueda binaria:
        int totalProducts = filteredProducts.Count();
        int leftIndex = -1;
        int rightIndex = filteredProducts.Count - 1;
        int midIndex = 0;
        //Productos que hagan match completo o parcial con searchText
        var foundProducts = new List<Product>();
        while(leftIndex <= rightIndex){

            int midIndex = (leftIndex + rightIndex) / 2;            
            //producto para comparar
            Product midProduct = filteredProducts[midIndex];

            int comparisonResult = string.Compare(midProduct.name, searchText, StringComparison.OrdinalIgnoreCase);
            
            if (comparisonResult == 0){

                foundProducts.Add(midProduct);
                //nos empezamos a mover a la izq del indice donde se encontro el primer match, para encontrar
                //otros productos que puedan tener coincidencias flexibles
                //int left = midIndex - 1;
                // while (leftIndex >= 0 && filteredProducts[leftIndex].name.IndexOf(searchText, StringComparison.OrdinalIgnoreCase) >= 0){
                //     foundProducts.Add(filteredProducts[leftIndex]);
                //     leftIndex--;
                // }
                //nos empezamos a mover a la derecha del indice donde se encontro el primer match, para encontrar
                //otros productos que puedan tener coincidencias flexibles
                //int right = midIndex + 1;
                // while (rightIndex < filteredProducts.Count && filteredProducts[rightIndex].name.IndexOf(searchText, StringComparison.OrdinalIgnoreCase) >= 0){
                //     foundProducts.Add(filteredProducts[rightIndex]);
                //     rightIndex++;
                // }

                break;

            }else if (comparisonResult < 0){
                //nos movemos hacia la derecha
                leftIndex = midIndex  + 1;

            }else{
                //nos movemos hacia la izquierda
                rightIndex = midIndex  - 1;
            }
        }

        return foundProducts;

        //https://stackoverflow.com/questions/41019464/c-sharp-binary-search-a-sorted-dictionary
    }
}
