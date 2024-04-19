using System;
using System.Collections.Generic;
using System.Linq;
using MySqlConnector;
using StoreAPI.Database;

namespace StoreAPI.models;

public sealed class Store
{
    public List<Product> Products { get; private set; }
    public List<Product> ProductsCarrusel { get; private set; }
    public int TaxPercentage { get; private set; }

    private Store(List<Product> products, List<Product> productsCarrusel, int TaxPercentage)
    {
        Products = products;
        ProductsCarrusel = productsCarrusel;
        this.TaxPercentage = TaxPercentage;
    }



    public readonly static Store Instance;

    static Store()
    {
        List<Product> products = LoadProducts();
        var productsCarrusel = new List<Product>();

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

        Store.Instance = new Store(products, productsCarrusel, 13);

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
                decimal.TryParse(row["price"], out decimal price))
            {
                string name = row["name"];
                string author = row["author"];
                string imageUrl = row["imgUrl"];

                Product product = new Product 
                {
                    Id = id,
                    Name = name,
                    Author = author,
                    Price = price,
                    ImgUrl = imageUrl
                };

                products.Add(product);
            }
        }
    }

    return products;
}


}