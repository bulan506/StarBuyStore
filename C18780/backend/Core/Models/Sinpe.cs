using System.ComponentModel.DataAnnotations;

namespace StoreApi.Models
{
    public class Sinpe
    {
        [Key]
        public Guid Uuid { get; set; }
        public Guid UuidSales { get; set; }
        public string ConfirmationNumber { get; set; }
    }
}