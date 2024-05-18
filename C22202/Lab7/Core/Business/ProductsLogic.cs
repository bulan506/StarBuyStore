using System.Drawing;
using ShopApi.Models;

public class ProductsLogic
{
    public IEnumerable<Product> products { get; }
    private Dictionary<int, List<Product>> productsDictionary;

    private ProductsLogic(IEnumerable<Product> products, Dictionary<int, List<Product>> productsDictionary)
    {
        this.products = products;
        this.productsDictionary = productsDictionary;
    }

    public static ProductsLogic Instance;
    static ProductsLogic()
    {
        var products = ProductDB.getProducts();
        Dictionary<int, List<Product>> productsDictionary = new Dictionary<int, List<Product>>();

        foreach (var product in products)
        {
            if (!productsDictionary.TryGetValue(product.category, out var categoryProducts))
            {
                categoryProducts = new List<Product>();
                productsDictionary[product.category] = categoryProducts;
            }
            categoryProducts.Add(product);
        }

        ProductsLogic.Instance = new ProductsLogic(products, productsDictionary);

    }

    /*public IEnumerable<Product> searchProducts(IEnumerable<Product> products, string search){
        List<Product> productsToFilter = products.ToList<Product>();
        List<Product> searchResult = new List<Product>();

        Product searchProduct = new Product{
            name = search,
            id = 1,
            imgSource = "",
            price = 0,
            category = 0
            };
        int searchIndex = productsToFilter.BinarySearch(searchProduct, new ProductoComparer());

        while (searchIndex > 0){
            searchResult.Add(productsToFilter[searchIndex]);
            productsToFilter.RemoveAt(searchIndex);
            searchIndex = productsToFilter.BinarySearch(searchProduct, new ProductoComparer());
        }

        return searchResult;
    }*/

    public IEnumerable<Product> searchProducts(IEnumerable<Product> productos, string search)
    {
        // Primero ordenamos la lista de productos por nombre
        var productosOrdenados = productos.OrderBy(p => p.name).ToList();

        // Usamos una lista para almacenar los resultados
        List<Product> resultados = new List<Product>();

        Product searchProduct = new Product{
            name = search,
            id = 1,
            imgSource = "",
            price = 0,
            category = 0
            };

        // Realizamos una búsqueda binaria para encontrar un elemento que contenga el filtro
        int index = productosOrdenados.BinarySearch(searchProduct, new ProductoComparer());

        if (index < 0)
        {
            // Si no encuentra un producto exacto, BinarySearch retorna un valor negativo que indica el índice complementario.
            index = ~index;
        }

        // A partir de este índice, buscamos hacia adelante y hacia atrás para encontrar todos los productos que contengan el filtro
        for (int i = index; i < productosOrdenados.Count && productosOrdenados[i].name.IndexOf(search, StringComparison.OrdinalIgnoreCase) >= 0; i++)
        {
            if (productosOrdenados[i].name.IndexOf(search, StringComparison.OrdinalIgnoreCase) >= 0)
            {
                resultados.Add(productosOrdenados[i]);
            }
        }

        for (int i = index - 1; i >= 0 && productosOrdenados[i].name.IndexOf(search, StringComparison.OrdinalIgnoreCase) >= 0; i--)
        {
            if (productosOrdenados[i].name.IndexOf(search, StringComparison.OrdinalIgnoreCase) >= 0)
            {
                resultados.Add(productosOrdenados[i]);
            }
        }

        return resultados;
    }

    public IEnumerable<Product> GetProductsCategory(List<int> categoryIds)
    {
        if (categoryIds.Count <= 0) throw new ArgumentException($"The {nameof(categoryIds)} number must be greater than 0");

        if(categoryIds.Contains(0)) return this.products;

        List<Product> products = new List<Product>();
        foreach (int item in categoryIds)
        {
            this.productsDictionary.TryGetValue(item, out var productsTmp);
            if (productsTmp == null) productsTmp = new List<Product>();
            products.AddRange(productsTmp);
            
        }
        return products;
    }

}

public class ProductoComparer : IComparer<Product>
    {
        public int Compare(Product x, Product y)
        {
            return string.Compare(x.name, y.name, StringComparison.OrdinalIgnoreCase);
        }
    }
