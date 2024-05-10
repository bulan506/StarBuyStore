using System.Collections;
using System.Diagnostics.SymbolStore;

namespace storeApi.Models.Data;

public class Category
{
    private CategoryStr categoryStruct;
    private List<CategoryStr> listCategories;

    public Category()
    {
        categoryStruct = new CategoryStr();
        listCategories = new List<CategoryStr>();
        makeCategories();
    }
    private void makeCategories()
    {
        listCategories.Add(categoryStruct.crearCategoria(1, "Electronica"));
        listCategories.Add(categoryStruct.crearCategoria(2, "Moda"));
        listCategories.Add(categoryStruct.crearCategoria(3, "Hogar y jardín"));
        listCategories.Add(categoryStruct.crearCategoria(4, "Deportes"));
        listCategories.Add(categoryStruct.crearCategoria(5, "Belleza"));
        listCategories.Add(categoryStruct.crearCategoria(6, "Alimentación"));
        listCategories.Add(categoryStruct.crearCategoria(7, "Tecnología"));
        listCategories.Add(categoryStruct.crearCategoria(8, "Actividades al aire libre"));
        listCategories.Add(categoryStruct.crearCategoria(9, "Entretenimiento"));
    }
    public CategoryStr GetCategoryById(int categoryId)
    {
        if (categoryId<1)throw new ArgumentException($"No se permiten categorias con ID negativo o cero, ID:{categoryId}.");
        var category = listCategories.FirstOrDefault(cat => cat.CategoryID == categoryId);
        if (category.CategoryID == 0)throw new InvalidOperationException($"No se encontró ninguna categoría con el ID {categoryId}.");
        return category;
    }
    public IEnumerable<CategoryStr> GetCategories()
    {
        return listCategories.OrderBy(category => category.NameCategory);
    }
}

public struct CategoryStr
{
    public string NameCategory { private set; get; }
    public int CategoryID {private set; get; }
    public CategoryStr crearCategoria(int id, string name)
    {
        if (id < 1) throw new ArgumentException("Se necesita un id valido, para crear la categoria");
        if (string.IsNullOrWhiteSpace(name) || name.Trim() == "") throw new ArgumentException("Se necesita un nombre para la categoria");
        return new CategoryStr { CategoryID = id, NameCategory = name };
    }
}
