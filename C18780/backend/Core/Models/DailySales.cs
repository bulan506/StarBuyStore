using StoreApi.utils;

namespace StoreApi.Models
{
    public sealed class DailySales
    {
        public DateTime Date { get; set; }
        public string PaymentMethod { get; set; }

        public List<SalesLinesCustom> SalesLinesCustom { get; set; }
        public DailySales()
        {
            SalesLinesCustom = new List<SalesLinesCustom>();
        }
    }
}
