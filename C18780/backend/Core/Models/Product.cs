using System.ComponentModel.DataAnnotations;

namespace StoreApi.Models
{
    public sealed class Product : ICloneable
    {
        [Key]
        public Guid Uuid { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public required string Description { get; set; }

        // Implementation of the ICloneable interface
        public object Clone()
        {
            return new Product
            {
                Uuid = this.Uuid,
                Name = this.Name,
                ImageUrl = this.ImageUrl,
                Price = this.Price,
                Description = this.Description
            };
        }
    }
}