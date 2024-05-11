using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using StoreAPI.Database;

namespace StoreAPI.models;


public class Products
{
    private IEnumerable<Product> allProducts;
    private Dictionary<int, List<Product>> productsDictionary;
    public Products() { }
    private Products(IEnumerable<Product> allProducts, Dictionary<int, List<Product>> productsDictionary)
    {
        if (allProducts == null || allProducts.Count() == 0) throw new ArgumentNullException($"The list of products {nameof(allProducts)}can't be null.");
        if (productsDictionary == null || productsDictionary.Count() == 0) throw new ArgumentNullException($"The products dictionary {nameof(productsDictionary)}by category can't be null.");
        this.allProducts = allProducts;
        this.productsDictionary = productsDictionary;
    }
    public static Products Instance;


    static Products()
    {

        var products = Store.LoadProducts();
        Dictionary<int, List<Product>> productsDictionary = new Dictionary<int, List<Product>>();
        foreach (var product in products)
        {
            if (!productsDictionary.TryGetValue(product.ProductCategory.IdCategory, out var categoryProducts))
            {
                categoryProducts = new List<Product>();
                productsDictionary[product.ProductCategory.IdCategory] = categoryProducts;
            }
            categoryProducts.Add(product);


        }

        Products.Instance = new Products(products, productsDictionary);

    }


    public IEnumerable<Product> GetProductsCategory(int categoryId)
    {
        if (categoryId < 0) throw new ArgumentException($"The {nameof(categoryId)} number must be greater than 0");

        if (categoryId == 0) return this.allProducts;

        this.productsDictionary.TryGetValue(categoryId, out var products);
        if (products == null) products = new List<Product>();
        return products;
    }




}