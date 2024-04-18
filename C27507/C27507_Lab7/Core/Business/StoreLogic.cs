//API
using MyStoreAPI.DB;
using MyStoreAPI.Models;
namespace MyStoreAPI.Business
{
    public class StoreLogic{

        //Validar el status de la tienda antes de enviar su informacion por la API
        public bool validateStatusStore(){
            
            //Se indica si existen tablas o fueron creadas con exito
            //segun el atributo de Store
            bool isThereConnection = Store.Instance.StoreConnectedWithDB;
            if(!isThereConnection) return false;                        
            fillStoreData();

            
            return true;
        }        

        //Si no existe al menos un dato, rellenar las tablas
        private void fillStoreData(){            
            Console.WriteLine("Estamos en validateStatusStore, existe tabla payment: " + DB_PaymentMethod.PaymentMethodsInTableExist());
            if(DB_PaymentMethod.PaymentMethodsInTableExist() == false ) DB_PaymentMethod.InsertPaymentMethod();
            //mantengo este  metodo para validaciones de futuras tablas
        }
    }
}