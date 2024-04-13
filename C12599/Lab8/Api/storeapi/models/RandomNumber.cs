using System;

namespace storeapi
{
    public class randomNumber
    {
        private static Random random = new Random();

        // Método para generar un número de compra único
        public int GenerateUniquePurchaseNumber()
        {
            long ticks = DateTime.Now.Ticks;
            int randomNumber = random.Next();
            int uniqueNumber = (int)(ticks & 0xFFFFFFFF) ^ randomNumber;
            return uniqueNumber;
        }
    }
}
