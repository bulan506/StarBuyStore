using System.ComponentModel.DataAnnotations;

namespace StoreApi.Models
{
    public class SalesLine
    {
        [Key]
        public Guid Uuid { get; set; }
        public int Quantity { get; set; }
        public decimal Subtotal { get; set; }
        public Guid UuidProduct { get; set; }
        public Guid UuidSales { get; set; }
    }
}