//API
using MyStoreAPI.DB;
using MyStoreAPI.Models;

namespace MyStoreAPI.Business
{
    public class CartLogic{

        private Cart newCart {get;}

        public CartLogic(Cart newCart){
            this.newCart = newCart;
        }

        public bool validateCart(){

            //Validaciones del carrito
            if (newCart == null){                
                return false;
            }
            if(!validatePaymentMethodFromCart(newCart.PaymentMethod)){
                return false;
            }
            if(!validateProductsFromCart(newCart.allProduct)){
                return false;
            }
            if(!validateDirectionFromCart(newCart.Direction)){
                return false;
            }
            if(!validateTotalFromCart(newCart.Total)){
                return false;
            }
            //El carrito podra ser procesado con la BD
            return true;
        }
        
        private bool validateProductsFromCart(List<Product> products){
            if(products == null || products.Count == 0){
                return false;
            } 
            return true;
        }

        private bool validatePaymentMethodFromCart(PaymentMethod paymentFromCart){
            foreach (var paymentItemList in PaymentMethods.paymentMethodsList){
                if(paymentFromCart.payment == paymentItemList.payment){
                    return true;
                }                
            }
            return false;
        }

        private bool validateTotalFromCart(decimal total){
            return total > 0;
        }

        private bool validateDirectionFromCart(string direction){
            return !string.IsNullOrEmpty(direction);
        }        
    }
}