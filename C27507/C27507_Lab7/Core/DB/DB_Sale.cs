
using System;
using System.Transactions;
using System.Collections.Generic;//para usar list
//API
using MyStoreAPI.Models;
using MySqlConnector;
namespace MyStoreAPI.DB
{
    public class DB_Sale{

        public static (string, int) InsertSale(Cart purchasedCart){
            try{                                        

                using (TransactionScope scopeTransaction = new TransactionScope()){
                    
                    string purchaseNum = "";
                    int thisIdSale = 0;

                    //El bloque using(MySql....) es una buena practica ya que conecta y desconecta de la bd, liberando recursos
                    //y evitar dejando conexiones abiertas
                    using (MySqlConnection connectionWithDB = new MySqlConnection(DB_Connection.INIT_CONNECTION_DB())){
                        connectionWithDB.Open();                    

                        //Hacemos el insert
                        string insertSale = @"
                        INSERT INTO Sales (Total,PurchaseNum, Subtotal, Direction, IdPayment,DateSale)
                        VALUES (@total, @purchaseNum, @subtotal, @direction, @idPayment,@dateSale);
                        ";

                        //id global unico para el comprobante                    
                        purchaseNum = Guid.NewGuid().ToString();                    
                        MySqlCommand command = new MySqlCommand(insertSale, connectionWithDB);
                        command.Parameters.AddWithValue("@total", purchasedCart.Total);
                        command.Parameters.AddWithValue("@purchaseNum", purchaseNum);
                        command.Parameters.AddWithValue("@subtotal", purchasedCart.Subtotal);
                        command.Parameters.AddWithValue("@direction", purchasedCart.Direction);                  
                        command.Parameters.AddWithValue("@idPayment", purchasedCart.PaymentMethod.payment);
                        command.Parameters.AddWithValue("@dateSale", DateTime.Now);
                        command.ExecuteNonQuery();

                         //Devolver el id de la venta generada (porque es IDENTITY(1,1))
                        string selectThisId = "SELECT IdSale FROM Sales WHERE PurchaseNum = @purchaseNum";
                        command = new MySqlCommand(selectThisId, connectionWithDB);
                        command.Parameters.AddWithValue("@purchaseNum", purchaseNum);
                        thisIdSale = Convert.ToInt32(command.ExecuteScalar());
                                            
                        DB_SaleLine.InsertSalesLine(connectionWithDB,purchaseNum,purchasedCart);
                    }     
                    //encapsula los metodos rollback y commit de Transaction
                    scopeTransaction.Complete();
                    Console.WriteLine("Exito al realizar la compra, guadado en Sales: ");    

                    //Si la transaccion se cumple con exito, devolvemos el codigo y el id para la instancia de Sale   
                    return (purchaseNum, thisIdSale);
                }
            }catch (Exception ex){
                Console.WriteLine("Error al generar InsertSale: " + ex);    
                throw;                
            }            
        }
        
    }
}