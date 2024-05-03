using System;

namespace Store_API.Models
{
    public class SaleAttribute
    {
        public int SaleId { get; set; }
        public string PurchaseNumber { get; set; }
        public decimal Total { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Product { get; set; }
        public string SaleByDay { get; set; }
        public int SaleCounter { get; set; }

        public SaleAttribute(int saleId, string purchaseNumber, decimal total, DateTime purchaseDate, string product, string saleByDay, int saleCounter)
        {
            SaleId = saleId;
            PurchaseNumber = purchaseNumber ?? throw new ArgumentNullException(nameof(purchaseNumber), "El número de compra no puede ser nulo.");
            Total = total;
            PurchaseDate = purchaseDate;
            Product = product ?? throw new ArgumentNullException(nameof(product), "El nombre del producto no puede ser nulo.");
            SaleByDay = saleByDay ?? throw new ArgumentNullException(nameof(saleByDay), "El día la de venta no puede ser nulo.");
            SaleCounter = saleCounter;
        }

        public SaleAttribute() { }

    }
}