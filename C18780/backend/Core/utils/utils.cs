namespace StoreApi.utils
{
    public class Utils
    {
        public static string GetPurchaseNumber()
        {
            DateTime today = DateTime.Today;
            Random random = new Random();
            string number = "";
            for (int i = 0; i < 2 ; i++)
            {
                number += (char)random.Next(65, 91);
                number += random.Next(0, 100);
            }

            return today.Year.ToString("0000") + today.Month.ToString("00") + today.Day.ToString("00") + number;
        }
    }
}