using System.Collections.Generic;

namespace MyStoreAPI.Models{
    public sealed class RegisteredSale{
        public int IdSale { get; set; }
        public string PurchaseNum { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public string Direction { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public DateTime DateTimeSale{ get; set; }
        
        public RegisteredSale(int idSale, string purchaseNum, decimal subtotal, decimal tax, decimal total, string direction, PaymentMethod paymentMethod,DateTime dateTimeSale){
            IdSale = idSale;
            PurchaseNum = purchaseNum;
            SubTotal = subtotal;
            Tax = tax;
            Total = total;
            Direction = direction;
            PaymentMethod = paymentMethod;
            DateTimeSale = dateTimeSale;
        }

        public RegisteredSale(){            
        }
    }
}