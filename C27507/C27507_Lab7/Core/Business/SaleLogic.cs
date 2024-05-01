using System.Globalization;
using Core;

//API
using MyStoreAPI.DB;
using MyStoreAPI.Models;
namespace MyStoreAPI.Business
{
    public class SaleLogic{

        private Sale sale {get;set;}
        private Cart cart {get;}
        private DB_Sale DB_Sale {get;}
        public SaleLogic(Cart cart){
            this.cart = cart;            
        }

        public SaleLogic(){                        
        }


        public Sale processDataSale(){

            // Utilizamos la lógica del carrito y sus validaciones
            CartLogic cartLogic = new CartLogic(cart);
            cartLogic.validateCart(); // Esta llamada puede lanzar excepciones

            // Si la información del carrito es válida, empezamos a generar la venta
            return createSale(cart);

        }
                                                 
        private Sale createSale(Cart cart){
            //Insertamos los datos del carrito en la tabla Sale
            //Retornamos el id en la tabla y el codigo de compra unico
           (string purchaseNum, int saleId) = DB_Sale.InsertSale(cart);
            sale = new Sale(saleId, purchaseNum, cart);
            return sale;
        }

        //Aqui los datos del carrito ya fueron validados por CartLogic en CartController
        public Sale createAndProcessSale(){
            //Insertamos los datos del carrito en la tabla Sale
            //Retornamos el id en la tabla y el codigo de compra unico
            //Los errores capturados en DB_Sale.InsertSale(cart); seran enviado a CartController
           (string purchaseNum, int saleId) = DB_Sale.InsertSale(cart);
            sale = new Sale(saleId, purchaseNum, cart);
            return sale;
        }

        
        //Metodos para los reportes de Ventas
        public async Task<List<RegisteredSale>> getSalesFromTodayAsync(string dateFormat){

            if (string.IsNullOrEmpty(dateFormat)) throw new ArgumentException("El formato de fecha actual no es valido");
            
            DateTime defaultDateTime;
            bool isDateFormatValid = DateTime.TryParseExact(dateFormat, "yyyy-MM-dd", CultureInfo.CurrentCulture, DateTimeStyles.None, out defaultDateTime);
            if (!isDateFormatValid){
                throw new ArgumentException("El formato de fecha actual no es válido");
            }
            DateTime newDateFormat = DateTime.ParseExact(dateFormat, "yyyy-MM-dd", CultureInfo.CurrentCulture);
            
            if (newDateFormat == null) throw new ArgumentException("El formato de fecha actual no puede ser nulo");
            if (newDateFormat == DateTime.MinValue) throw new ArgumentException("El formato de fecha actual no puede ser la fecha minima");            

            List<RegisteredSale> allRegisteredSales = await DB_Sale.GetRegisteredSalesTodayAsync(newDateFormat);                                                
            if (allRegisteredSales == null)throw new BussinessException("La lista de ventas puede ser 0, pero no nula");
            return allRegisteredSales;
        }
    }
}