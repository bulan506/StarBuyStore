namespace core;
using System.Collections;

public class Category{

    private CategoryStruct[] categories = new CategoryStruct[]
    {
        new CategoryStruct(1, "Perifericos"),
        new CategoryStruct(2, "Hardware"),
        new CategoryStruct(3, "Moda"),
        new CategoryStruct(4, "Videojuegos"),
        new CategoryStruct(5, "Entretenimiento"),
        new CategoryStruct(6, "Decoracion")
    };

    internal CategoryStruct obtenerCategoria(int numCategory) 
    {
        if (numCategory <= 0)
        {
            throw new ArgumentException("El número de categoría debe ser un entero positivo.");
        }
        CategoryStruct cat = new CategoryStruct(); 
        foreach (var category in categories)
        {
            if (numCategory == category.id)
            {
                cat = category;
            }
        }
        return cat;
    }

    public struct CategoryStruct
    {
    public int id { get; set; }
    public string Name { get; set; }
    
    public CategoryStruct (int catID, string name){ 
        this.id = catID;
        this.Name = name;
    }    

    }

}