using System.Collections.Generic;
using MyStoreAPI.Business;

namespace MyStoreAPI.Models
{
    public sealed class Sale    
    {
        public int idSale {get;}
        public string purchaseNum {get;}
        public Cart cart {get;}
        //public IEnumerable<Product> products {get;}    
        public Sale(int idSale, string purchaseNum,Cart cart){

            if (idSale <= 0)
                throw new ArgumentException($"{nameof(idSale)} no puede ser negativo ni igual a cero.");
    
            if (string.IsNullOrWhiteSpace(purchaseNum))
                throw new ArgumentException($"{nameof(purchaseNum)} no puede estar vacío.");
            
            CartLogic cartLogic = new CartLogic(cart);
            cartLogic.validateCart();

            this.idSale = idSale;
            this.purchaseNum = purchaseNum;
            this.cart = cart;
        }        
    }
}