//API
using MyStoreAPI.DB;
using MyStoreAPI.Models;
namespace MyStoreAPI.Business
{
    public class SaleLogic{

        private Sale sale {get;set;}
        private Cart cart {get;}
        public SaleLogic(Cart cart){
            this.cart = cart;
        }

        public Sale processDataSale(){

            //Utilizamos la logica del carrito y sus validaciones
            CartLogic cartLogic = new CartLogic(cart);

            if(!cartLogic.validateCart()){
                return null;
            }

            //Si la informacion del carrito es valida, empezamos a generar la venta
            //Y retornamos la venta como tal
            return createSale(cart);
        }
                                                 
        private Sale createSale(Cart cart){
            //Insertamos los datos del carrito en la tabla Sale
            //Retornamos el id en la tabla y el codigo de compra unico
           (string purchaseNum, int saleId) = DB_Sale.InsertSale(cart);
            sale = new Sale(saleId, purchaseNum, cart);

            return sale;
        }
    }
}