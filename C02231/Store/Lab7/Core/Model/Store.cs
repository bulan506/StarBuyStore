using System;
using System.Collections.Generic;
using System.Linq;
using MySqlConnector;
using StoreAPI.Database;

namespace StoreAPI.models;

public sealed class Store
{
    public List<Product> Products { get; private set; } //hacer un diccionario de productos por categoria
    public List<Product> ProductsCarrusel { get; private set; }
    public IEnumerable<Category> CategoriesList { get; private set; }
    public int TaxPercentage { get; private set; }

    private Store(List<Product> products, List<Product> productsCarrusel, IEnumerable<Category> categories, int TaxPercentage)
    {
        if (products == null || products.Count == 0) throw new ArgumentException($"The list of {nameof(products)} cannot be null or empty.");
        if (productsCarrusel == null || productsCarrusel.Count == 0) throw new ArgumentException($"The list of {nameof(products)} for the carousel cannot be null or empty.");
        if (categories == null || !categories.Any()) throw new ArgumentException($"The collection of {nameof(categories)} cannot be null or empty.");
        if (TaxPercentage < 0) throw new ArgumentException($"The {nameof(TaxPercentage)} must be greater than or equal to zero.");

        Products = products;
        ProductsCarrusel = productsCarrusel;
        CategoriesList = categories;
        this.TaxPercentage = TaxPercentage;
    }



    public readonly static Store Instance;

    static Store()
    {
        List<Product> products = LoadProducts();
        var productsCarrusel = new List<Product>();
        IEnumerable<Category> categories = Categories.Instance.GetCategories();

        productsCarrusel.Add(new Product
        {
            Name = "Bookmarks",
            Author = "Perfect for not to lose where your story goes",
            ImgUrl = "1.png",
            Price = 9500,
            Id = 0
        });

        productsCarrusel.Add(new Product
        {
            Name = "Pins",
            Author = "Adding a touch of literary flair to any outfit or accessory",
            ImgUrl = "2.png",
            Price = 9500,
            Id = 1
        });

        productsCarrusel.Add(new Product
        {
            Name = "Necklace",
            Author = "A beautifull Necklace for all day wear",
            ImgUrl = "3.png",
            Price = 9500,
            Id = 2
        });

        Store.Instance = new Store(products, productsCarrusel, categories, 13);

    }
    public IEnumerable<Product> CategoryProducts(int idCategory)
    {
        if (idCategory < 0) throw new ArgumentException($"A Category {nameof(idCategory)} is required");

        return Instance.Products.Where(product => product.ProductCategory.IdCategory == idCategory);
    }
    private static List<Product> LoadProducts()
    {
        List<Dictionary<string, string>> productData = StoreDB.RetrieveDatabaseInfo();
        List<Product> products = new List<Product>();

        foreach (var row in productData)
        {
            if (row.ContainsKey("id") && row.ContainsKey("price"))
            {
                if (int.TryParse(row["id"], out int id) &&
                    decimal.TryParse(row["price"], out decimal price) &&
                    int.TryParse(row["idCategory"], out int idCategory)) // Conversión de idCategory a int

                {
                    string name = row["name"];
                    string author = row["author"];
                    string imageUrl = row["imgUrl"];

                    Category category = Categories.Instance.GetCategories().SingleOrDefault(c => c.IdCategory == idCategory);

                    if (!category.Equals(default(Category)))
                    {
                        Product product = new Product
                        {
                            Id = id,
                            Name = name,
                            Author = author,
                            Price = price,
                            ProductCategory = category,
                            ImgUrl = imageUrl
                        };

                        products.Add(product);
                    }
                    else
                    {
                        throw new Exception($"No se encontró la categoría correspondiente al ID {idCategory}.");
                    }
                }
            }
        }

        return products;
    }


}