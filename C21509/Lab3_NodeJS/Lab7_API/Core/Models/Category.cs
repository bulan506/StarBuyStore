using System;
using System.Collections.Generic;
using System.Linq;

namespace Core.Models
{
    public struct ProductCategoryStruct
    {
        public string NameCategory { get; }
        public int IdCategory { get; }

        public ProductCategoryStruct(int idCategory, string nameCategory)
        {
            if (idCategory < 1)
            {
                throw new ArgumentException($"Invalid category ID: {idCategory}");
            }

            if (string.IsNullOrWhiteSpace(nameCategory))
            {
                throw new ArgumentException($"Category name cannot be null or empty.");
            }

            IdCategory = idCategory;
            NameCategory = nameCategory;
        }
    }

    public class Category
    {
        private readonly List<ProductCategoryStruct> categories = new List<ProductCategoryStruct>
        {
            new ProductCategoryStruct(1, "Electrónica"),
            new ProductCategoryStruct(2, "Moda"),
            new ProductCategoryStruct(3, "Hogar y jardín"),
            new ProductCategoryStruct(4, "Deportes y actividades al aire libre"),
            new ProductCategoryStruct(5, "Belleza y cuidado personal"),
            new ProductCategoryStruct(6, "Alimentación y bebidas"),
            new ProductCategoryStruct(7, "Libros y entretenimiento"),
            new ProductCategoryStruct(8, "Tecnología"),
            new ProductCategoryStruct(9, "Deportes")
        };

        public static Category Instance { get; } = new Category();
        private Category() { }

        public static ProductCategoryStruct GetCategoryById(int categoryId)
        {
            var category = Instance.categories.FirstOrDefault(category => category.IdCategory == categoryId);
            if (category.IdCategory == 0)
            {
                throw new InvalidOperationException($"No category found with ID: {categoryId}");
            }
            return category;
        }

        public static IEnumerable<ProductCategoryStruct> GetCategories()
        {
            return Instance.categories.OrderBy(category => category.NameCategory);
        }
    }
}