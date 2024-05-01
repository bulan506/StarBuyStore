using System;
using System.Collections.Generic;

namespace StoreAPI.models;

public sealed class SalesReport
{
    public string? PurchaseDate { get; set; }

    public decimal Total { get; set; }

    //public DateTime Date { get; set; }
    public string? DayOfWeek { get; set; }


    public SalesReport(string? dayOfWeek, string? purchaseDate, decimal total)
    {
        //if (purchaseDate == null) throw new ArgumentNullException(nameof(purchaseDate), "PurchaseDate cannot be null.");
        //if (dayOfWeek == null) throw new ArgumentNullException(nameof(dayOfWeek), "dayOfWeek cannot be null.");
        // if (total >= 0) throw new ArgumentException("The sale total cannot be negative.", nameof(total));

        DayOfWeek = dayOfWeek;
        PurchaseDate = purchaseDate;
        Total = total;
    }
}




