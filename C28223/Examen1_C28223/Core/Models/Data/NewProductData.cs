namespace storeApi.Models.Data;

public class NewProductData
{
    public string Name { get; private set; }
    public string ImageURL { get; private set; }
    public decimal Price { get; private set; }
    public string Description { get; private set; }
    public int Category { get; private set; }
    public NewProductData(string name, string imageURL, decimal price, string description, int category)
    {
        if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("El nombre del producto no puede estar vacío o ser nulo.", nameof(name));
        if (string.IsNullOrWhiteSpace(imageURL)) throw new ArgumentException("La URL de la imagen del producto no puede estar vacía o ser nula.", nameof(imageURL));
        if (price <= 0) throw new ArgumentOutOfRangeException("El precio del producto debe ser mayor que cero.", nameof(price));
        if (string.IsNullOrWhiteSpace(description)) throw new ArgumentException("La descripción del producto no puede estar vacía o ser nula.", nameof(description));
        if (category <= 0) throw new ArgumentOutOfRangeException("El ID de la categoría del producto debe ser mayor que cero.", nameof(category));
        this.Name = name;
        this.ImageURL = imageURL;
        this.Price = price;
        this.Description = description;
        this.Category = category;
    }
}
