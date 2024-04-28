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

        public SaleLogic(){            
        }

        public Sale processDataSale(){

            try
            {
                // Utilizamos la lógica del carrito y sus validaciones
                CartLogic cartLogic = new CartLogic(cart);
                cartLogic.validateCart(); // Esta llamada puede lanzar excepciones

                // Si la información del carrito es válida, empezamos a generar la venta
                return createSale(cart);
            }
            catch (NotImplementedException nie){
                Console.WriteLine($"Error desde SaleLogic: {nie}");
                throw;
            }
            catch (Exception ex){                
                Console.WriteLine($"Error desde SaleLogic: {ex.Message}");
                throw;
            }
        }
                                                 
        private Sale createSale(Cart cart){
            //Insertamos los datos del carrito en la tabla Sale
            //Retornamos el id en la tabla y el codigo de compra unico
           (string purchaseNum, int saleId) = DB_Sale.InsertSale(cart);
            sale = new Sale(saleId, purchaseNum, cart);
            return sale;
        }


        public List<RegisteredSale> getSalesFromToday(string dateFormat){
            List<RegisteredSale> allRegisteredSales = DB_Sale.GetRegisteredSalesToday(dateFormat);            
            // var isSalesListFull = allRegisteredSales != null && allRegisteredSales.Count > 0;
            var isSalesListFull = allRegisteredSales != null;
            Console.WriteLine("isSalesListFull: " + isSalesListFull);            
            if(isSalesListFull){
                return allRegisteredSales;
            }else{
                throw new NotImplementedException("No valid");
            }            
        }
    }
}