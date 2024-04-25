using System.Collections.Generic;

namespace MyStoreAPI.Models
{
    public sealed class Sale    
    {
        public int idSale {get;}
        public string purchaseNum {get;}
        public Cart cart {get;}
        //public IEnumerable<Product> products {get;}    
        public Sale(int idSale, string purchaseNum,Cart cart){
            this.idSale = idSale;
            this.purchaseNum = purchaseNum;
            this.cart = cart;
        }        
    }
}