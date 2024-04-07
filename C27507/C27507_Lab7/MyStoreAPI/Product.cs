namespace MyStoreAPI
{
    public class Product: ICloneable
    {
        public string name { get; set; }
        public string imageUrl { get; set; }
        public decimal price { get; set; }
        public decimal quantity { get; set; }        
        public string description { get; set; }        
        public Guid uuid { get; set; }

        public object Clone()
        {
            return new Product{
                uuid = this.uuid,
                name = this.name,
                imageUrl = this.imageUrl,
                price = this.price,
                quantity = this.quantity,                
                description = this.description
            };
        }
    }
}