public class SalesByDay
{
    public string SaleDayOfWeek { get; set; } 
    public int SaleCount { get; set; } 

    public SalesByDay() { }

    public SalesByDay(string saleDayOfWeek, int saleCount)
    {
        SaleDayOfWeek = saleDayOfWeek;
        SaleCount = saleCount;
    }
}
