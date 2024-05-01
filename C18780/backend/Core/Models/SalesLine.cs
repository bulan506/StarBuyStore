using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreApi.Models
{
    public sealed class SalesLine
    {
        internal Guid nameProduct;

        [Key]
        public Guid Uuid { get; set; }
        public int Quantity { get; set; }
        public decimal Subtotal { get; set; }
        [ForeignKey("UuidProduct")]
        public Guid UuidProduct { get; set; }
        [ForeignKey("UuidSales")]
        public Guid UuidSales { get; set; }
    }
}