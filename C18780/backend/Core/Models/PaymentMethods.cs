using System.ComponentModel.DataAnnotations;

namespace StoreApi.Models
{
    public sealed class PaymentMethod
    {
        [Key]
        public Guid Uuid { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }

    }
}