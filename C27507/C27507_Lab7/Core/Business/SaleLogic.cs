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
        
        //Metodos para los reportes de Ventas
        public async Task<RegisteredSaleReport> getSalesByDayAndWeekAsync(string dateFormat){
            if (string.IsNullOrEmpty(dateFormat)) throw new BussinessException("El formato de fecha actual no es valido");
            //Machote para validar si el string obtenido del datePicker es valido
            DateTime defaultDateTime;
            bool isDateFormatValid = DateTime.TryParseExact(dateFormat, "yyyy-MM-dd", CultureInfo.CurrentCulture, DateTimeStyles.None, out defaultDateTime);
            if (!isDateFormatValid){
                throw new BussinessException("El formato de fecha actual no es válido");
            }
            DateTime newDateFormat = DateTime.ParseExact(dateFormat, "yyyy-MM-dd", CultureInfo.CurrentCulture);
            if (newDateFormat == null) throw new BussinessException("El formato de fecha actual no puede ser nulo");
            if (newDateFormat == DateTime.MinValue) throw new BussinessException("El formato de fecha actual no puede ser la fecha minima");

            //Si las validaciones principales son correctas, hacemos el llamado a la bd para cada tarea
            List<RegisteredSale> salesByDayList = await getSalesFromTodayAsync(newDateFormat);
            List<RegisteredSaleWeek> salesByWeekList = await getSalesFromLastWeekAsync(newDateFormat);

            //await Task.WhenAll(salesByDayList, salesByWeekList);

            return new RegisteredSaleReport {
                salesByDay = salesByDayList,
                salesByWeek = salesByWeekList
            };
        }

        private async Task<List<RegisteredSale>> getSalesFromTodayAsync(DateTime dateFormat){                                                            

            List<RegisteredSale> allRegisteredSalesByDay = await DB_Sale.GetRegisteredSalesByDayAsync(dateFormat);                                                

            if (allRegisteredSalesByDay == null)throw new BussinessException("La lista de ventas puede ser 0, pero no nula");
            foreach (var thisRegisteredSale in allRegisteredSalesByDay){

                if (thisRegisteredSale.IdSale <= 0)        
                    throw new ArgumentException("El Id de la venta debe ser un número entero positivo.");        
        
                if (string.IsNullOrEmpty(thisRegisteredSale.PurchaseNum))        
                    throw new ArgumentException("El número de compra no puede ser nulo o vacío.");        
                
                if (thisRegisteredSale.SubTotal <= 0)
                    throw new BussinessException("El subtotal de la venta no puede ser menor ni igual que cero.");

                if (thisRegisteredSale.Tax < 0)
                    throw new BussinessException("El impuesto de la venta no puede ser menor que cero.");
    

                if (thisRegisteredSale.Total <= 0)        
                    throw new BussinessException("El total de la venta no puede ser menor ni igual que cero.");
            }
            return allRegisteredSalesByDay;
        }

        private async Task<List<RegisteredSaleWeek>> getSalesFromLastWeekAsync(DateTime dateFormat){
            List<RegisteredSaleWeek> allRegisteredSalesByWeek = await DB_Sale.GetRegisteredSalesByWeekAsync(dateFormat);                                                

            if (allRegisteredSalesByWeek == null)throw new BussinessException("La lista de ventas puede ser 0, pero no nula");

            foreach (var thisRegisteredSale in allRegisteredSalesByWeek){
                if (string.IsNullOrEmpty(thisRegisteredSale.dayOfWeek)) throw new BussinessException("Los dias de la semana no son validos");
                if (thisRegisteredSale.total == null) throw new BussinessException("El total de ventas de un dia de la semana no puede ser nulo");
                if (thisRegisteredSale.total <= 0) throw new BussinessException("El total de ventas de un dia de la semana no puede ser menor a cero");
            }
            return allRegisteredSalesByWeek;
        }
    }
}