using System.Globalization;
using Core;

//API
using MyStoreAPI.DB;
using MyStoreAPI.Models;
namespace MyStoreAPI.Business
{
    public class SaleLogic{
        
        private DB_Sale db_sale {get;}

        public SaleLogic(){            
            this.db_sale = new DB_Sale();            
        }

        public Sale processDataSale(Cart cart){

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
            Sale sale = new Sale(saleId, purchaseNum, cart);
            return sale;
        }
        
        //Metodos para los reportes de Ventas
        public async Task<RegisteredSaleReport> getSalesByDayAndWeekAsync(DateTime dateFormat){                    
            if (dateFormat == DateTime.MinValue) throw new BussinessException("El formato de fecha actual no puede ser la fecha minima");
            //Si las validaciones principales son correctas, hacemos el llamado a la bd para cada tarea
            IEnumerable<RegisteredSale> salesByDayList = await getSalesFromTodayAsync(dateFormat);
            IEnumerable<RegisteredSaleWeek> salesByWeekList = await getSalesFromLastWeekAsync(dateFormat);

            return new RegisteredSaleReport {
                salesByDay = salesByDayList,
                salesByWeek = salesByWeekList
            };
        }

        private async Task<IEnumerable<RegisteredSale>> getSalesFromTodayAsync(DateTime dateFormat){                                                            

            IEnumerable<RegisteredSale> allRegisteredSalesByDay = await db_sale.GetRegisteredSalesByDayAsync(dateFormat);                                                

            if (allRegisteredSalesByDay == null)throw new BussinessException($"{nameof(allRegisteredSalesByDay)} puede ser 0, pero no nula");
            foreach (var thisRegisteredSale in allRegisteredSalesByDay){

                if (thisRegisteredSale.IdSale <= 0)        
                    throw new BussinessException($"{nameof(thisRegisteredSale)} debe contener un IdSale entero positivo.");
        
                if (string.IsNullOrEmpty(thisRegisteredSale.PurchaseNum))        
                    throw new BussinessException($"{nameof(thisRegisteredSale)} no puede contener un codigo de compra nulo o vacío.");        
                
                if (thisRegisteredSale.SubTotal <= 0)
                    throw new BussinessException($"{nameof(thisRegisteredSale)} el Subtotal de la venta no puede ser menor ni igual que cero.");

                if (thisRegisteredSale.Tax < 0)
                    throw new BussinessException($"{nameof(thisRegisteredSale)} el impuesto de la venta no puede ser menor que cero.");
    

                if (thisRegisteredSale.Total <= 0)        
                    throw new BussinessException($"{nameof(thisRegisteredSale)} el total de la venta no puede ser menor ni igual que cero.");
            }
            return allRegisteredSalesByDay;
        }

        private async Task<IEnumerable<RegisteredSaleWeek>> getSalesFromLastWeekAsync(DateTime dateFormat){
            IEnumerable<RegisteredSaleWeek> allRegisteredSalesByWeek = await db_sale.GetRegisteredSalesByWeekAsync(dateFormat);                                                

            if (allRegisteredSalesByWeek == null)throw new BussinessException("La lista de ventas puede ser 0, pero no nula");

            foreach (var thisRegisteredSale in allRegisteredSalesByWeek){
                if (string.IsNullOrEmpty(thisRegisteredSale.dayOfWeek)) throw new BussinessException("Los dias de la semana no son validos");
                if (thisRegisteredSale.total == null) throw new BussinessException($"{nameof(thisRegisteredSale)} el total de ventas de un dia de la semana no puede ser nulo");
                if (thisRegisteredSale.total <= 0) throw new BussinessException($"{nameof(thisRegisteredSale)} el total de ventas de un dia de la semana no puede ser menor a cero");
            }
            return allRegisteredSalesByWeek;
        }        
    }
}