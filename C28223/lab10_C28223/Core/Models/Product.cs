namespace storeApi.Models;
public class Product : ICloneable
{
    public string name { get; set; }
    public string imageURL { get; set; }
    public decimal price { get; set; }
    public string description { get; set; }
    public int id { get; set; }
    public int cant { get; set; }

    // Implementation of the ICloneable interface
    public object Clone()
    {
        return new Product
        {
            id = this.id,
            name = this.name,
            imageURL = this.imageURL,
            price = this.price,
            description = this.description,
            cant = this.cant
        };
    }
}
public class ProductQuantity
{
    public string ProductId { get; set; }
    public int Quantity { get; set; }
    public ProductQuantity(string productId, int quantity)
    {
        if (string.IsNullOrWhiteSpace(productId)) { throw new ArgumentException("El ID del producto no puede estar vacío o nulo.", nameof(productId)); }
        if (quantity < 0) { throw new ArgumentOutOfRangeException(nameof(quantity), "La cantidad no puede ser menor que cero."); }
        ProductId = productId;
        Quantity = quantity;
    }
}