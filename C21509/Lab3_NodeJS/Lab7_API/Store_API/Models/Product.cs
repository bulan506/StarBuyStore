namespace Store_API.Models;

public class Product : ICloneable
{
    public string Name { get; set; }
    public string ImageURL { get; set; }
    public decimal Price { get; set; }
    public Guid Uuid { get; set; }

        // Implementation of the ICloneable interface
    public object Clone()
    {
        return new Product
        {
            Uuid = this.Uuid,
            Name = this.Name,
            ImageURL = this.ImageURL,
            Price = this.Price,
        };
    }
}