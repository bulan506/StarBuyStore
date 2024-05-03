namespace StoreAPI.models;

public sealed class DaySalesReports
{
    public DateTime PurchaseDate { get; set; }
    public string PurchaseNumber { get; set; }
    public decimal Total { get; set; }

    public DaySalesReports(DateTime purchaseDate, string purchaseNumber, decimal total)
    {

        if (purchaseDate == DateTime.MinValue) throw new ArgumentException("Invalid date provided.", nameof(purchaseDate));
        if (total == null) throw new ArgumentException("The sale total is required.");

        PurchaseDate = purchaseDate;
        PurchaseNumber = purchaseNumber;
        Total = total;
    }
}




