namespace ShopApi.Models;
public class Product : ICloneable
{
    public required string name { get; set; }
    public required string imgSource { get; set; }
    public decimal price { get; set; }
    public required string description { get; set; }
    public int id {get; set;}

        // Implementation of the ICloneable interface
    public object Clone()
    {
        return new Product
        {
            id = this.id,
            name = this.name,
            imgSource = this.imgSource,
            price = this.price,
            description = this.description
        };
    }
}