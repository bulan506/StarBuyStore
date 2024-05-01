using StoreApi.Models;

public sealed class Reports
{
    public List<DailySales> dailySalesList { get; set; }
    public List<WeeklySales> weeklySalesList { get; set; }

    public Reports(List<DailySales> dailySalesList, List<WeeklySales> weeklySalesList)
    {
        this.dailySalesList = dailySalesList;
        this.weeklySalesList = weeklySalesList;
    }
}