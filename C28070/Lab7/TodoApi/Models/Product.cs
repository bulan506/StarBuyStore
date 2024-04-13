namespace TodoApi;
public class Product : ICloneable
{
    public int id { get; set; }
     public string name { get; set; }
    public string image { get; set; }
    public decimal price { get; set; }
    public string description { get; set; }

  //  public Guid Uuid { get; set; }

        // Implementation of the ICloneable interface, cada vez que llamo a clone se crea instancia nueva.
    public object Clone() 
    {
        return new Product
        {
            id=this.id,
            name = this.name,
            image = this.image,
            price = this.price,
            description = this.description
        };
    }
}