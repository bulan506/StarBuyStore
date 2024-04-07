namespace KEStoreApi;
public sealed class Store
{
    public List<Product> Products { get; private set; }
    public int TaxPercentage { get; private set; }

    private Store( List<Product> products, int TaxPercentage )
    {
        this.Products = products;
        this.TaxPercentage = TaxPercentage;
    }

    public readonly static Store Instance;
    // Static constructor
    static Store()
    {
        var products = new List<Product>
{
    new Product
    {
        Id = 1,
        Name = "Xbox",
        Price = 349,
        ImageUrl = "https://m.media-amazon.com/images/I/71ImGywfeQL._AC_UY218_.jpg"
    },
    new Product
    {
        Id = 2,
        Name = "PlayStation 4",
        Price = 212,
        ImageUrl = "https://m.media-amazon.com/images/I/51ROi4d4puL._AC_UY218_.jpg"
    },
    new Product
    {
        Id = 3,
        Name = "Hogwarts Legacy",
        Price = 47,
        ImageUrl = "https://m.media-amazon.com/images/I/81cou8GvIfL._AC_UY218_.jpg"
    },
    new Product
    {
        Id = 4,
        Name = "Keyboard Corsair",
        Price = 79,
        ImageUrl = "https://m.media-amazon.com/images/I/61P-smPq+cL._AC_UY218_.jpg"
    },
    new Product
    {
        Id = 5,
        Name = "Xbox",
        Price = 349,
        ImageUrl = "https://m.media-amazon.com/images/I/71ImGywfeQL._AC_UY218_.jpg"
    },
    new Product
    {
        Id = 7,
        Name = "Xbox",
        Price = 349,
        ImageUrl = "https://m.media-amazon.com/images/I/71ImGywfeQL._AC_UY218_.jpg"
    },
    new Product
    {
        Id = 8,
        Name = "Xbox",
        Price = 349,
        ImageUrl = "https://m.media-amazon.com/images/I/71ImGywfeQL._AC_UY218_.jpg"
    },
    new Product
    {
        Id = 9,
        Name = "Celular",
        Price = 100,
        ImageUrl = "https://www.elsoldepuebla.com.mx/finanzas/tecnologia/ihnp3f-es-comun-que-los-telefonos-celulares-muestren-simbolos-a-los-que-nos-les-prestemos-atencion.jpg/ALTERNATES/LANDSCAPE_960/Es%20com%C3%BAn%20que%20los%20tel%C3%A9fonos%20celulares%20muestren%20s%C3%ADmbolos%20a%20los%20que%20nos%20les%20prestemos%20atenci%C3%B3n.jpg"
    },
    new Product
    {
        Id = 10,
        Name = "Celular",
        Price = 100,
        ImageUrl = "https://www.elsoldepuebla.com.mx/finanzas/tecnologia/ihnp3f-es-comun-que-los-telefonos-celulares-muestren-simbolos-a-los-que-nos-les-prestemos-atencion.jpg/ALTERNATES/LANDSCAPE_960/Es%20com%C3%BAn%20que%20los%20tel%C3%A9fonos%20celulares%20muestren%20s%C3%ADmbolos%20a%20los%20que%20nos%20les%20prestemos%20atenci%C3%B3n.jpg"
    },
    new Product
    {
        Id = 11,
        Name = "Celular",
        Price = 100,
        ImageUrl = "https://www.elsoldepuebla.com.mx/finanzas/tecnologia/ihnp3f-es-comun-que-los-telefonos-celulares-muestren-simbolos-a-los-que-nos-les-prestemos-atencion.jpg/ALTERNATES/LANDSCAPE_960/Es%20com%C3%BAn%20que%20los%20tel%C3%A9fonos%20celulares%20muestren%20s%C3%ADmbolos%20a%20los%20que%20nos%20les%20prestemos%20atenci%C3%B3n.jpg"
    },
    new Product
    {
        Id = 12,
        Name = "Celular",
        Price = 100,
        ImageUrl = "https://www.elsoldepuebla.com.mx/finanzas/tecnologia/ihnp3f-es-comun-que-los-telefonos-celulares-muestren-simbolos-a-los-que-nos-les-prestemos-atencion.jpg/ALTERNATES/LANDSCAPE_960/Es%20com%C3%BAn%20que%20los%20tel%C3%A9fonos%20celulares%20muestren%20s%C3%ADmbolos%20a%20los%20que%20nos%20les%20prestemos%20atenci%C3%B3n.jpg"
    },
    new Product
    {
        Id = 13,
        Name = "Logitech Superlight",
        Price = 126,
        ImageUrl = "https://extremetechcr.com/tienda/24033-thickbox_default/logitech-g-pro-x-superlight-rojo.jpg"
    },
    new Product
    {
        Id = 14,
        Name = "AMD RYZEN 9 7950X3D",
        Price = 626,
        ImageUrl = "https://m.media-amazon.com/images/I/51jNS8epPeL._AC_UY218_.jpg"
    },
     new Product
    {
        Id = 15,
        Name = "GIGABYTE GeForce RTX 4060 AERO OC 8G Graphics Card",
        Price = 319,
        ImageUrl = "https://m.media-amazon.com/images/I/71exYzoMrqL._AC_SX679_.jpg"
    }
};
        Store.Instance = new Store(products, 13);
    }


}