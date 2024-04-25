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

            //Validaciones manejadas a partir de ahora con try catch
             if (newCart == null){
                throw new NotImplementedException("Not valid");
            }

            if (!validatePaymentMethodFromCart(newCart.PaymentMethod)){
                throw new NotImplementedException("Not valid");
            }
            if (!validateProductsFromCart(newCart.allProduct)){
                throw new NotImplementedException("Not valid");
            }
            if (!validateDirectionFromCart(newCart.Direction)){
                throw new NotImplementedException("Not valid");
            }
            if (!validateTotalFromCart(newCart.Total)){
                throw new NotImplementedException("Not valid");
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