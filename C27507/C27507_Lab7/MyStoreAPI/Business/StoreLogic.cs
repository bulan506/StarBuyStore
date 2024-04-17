//API
using MyStoreAPI.DB;
using MyStoreAPI.Models;
namespace MyStoreAPI.Business
{
    public class StoreLogic{

        public bool validateStatusStore(){
            
            //Validar que haya conection con la DB
            bool isThereConnection = Store.Instance.StoreConnectedWithDB;
            if(!isThereConnection) return false;            
            //Validar que la tienda productos            
            if(Store.Instance.Products == null || Store.Instance.Products.Count == 0) return false;                        
            //Validar que haya tablas creadas
            return true;
        }        
    }
}