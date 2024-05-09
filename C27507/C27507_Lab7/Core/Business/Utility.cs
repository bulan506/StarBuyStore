namespace Core;

public class Utility{

    public Utility(){
        
    }
    

    public string generateRandomPurchaseNum(){            
            Guid purchaseNum = Guid.NewGuid();            
            string largeString = purchaseNum.ToString().Replace("-", "");            
            Random random = new Random();            
            string randomCharacter = "";            
            for (int i = 0; i < 8; i += 2){                
                int randomIndex = random.Next(i, i + 2);
                randomCharacter += largeString[randomIndex];
            }
            return randomCharacter;
        }

}

public class CategoryComparer : IComparer<Category>
{
    public int Compare(Category x, Category y)
    {
        return x.Description.CompareTo(y.Description);
    }
}
