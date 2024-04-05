namespace StoreAPI;
public class Product : ICloneable
{
    public string Name { get; set; }
     public string Author { get; set; }
    public string ImgUrl { get; set; }
    public decimal Price { get; set; }
   
    public Guid Uuid { get; set; }
    
    // Implementation of the ICloneable interface
    public object Clone()
    {
        return new Product
        {
            Uuid = this.Uuid,
            Name = this.Name,
            Author = this.Author,
            ImgUrl = this.ImgUrl,
            Price = this.Price,
            
        };
    }
}