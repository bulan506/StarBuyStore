using MySql.Data.MySqlClient;
using System;
using System.Transactions;
using System.Collections.Generic;//para usar list
//API
using MyStoreAPI.Models;
namespace MyStoreAPI.DB
{
    public class DB_Sale{

        public static string InsertSale(Cart purchasedCart){
            try{                                        

                using (TransactionScope scopeTransaction = new TransactionScope()){
                    
                    string purchaseNum = "";

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
                                            
                        DB_SaleLine.InsertSalesLine(connectionWithDB,purchaseNum,purchasedCart);
                    }     
                    //encapsula los metodos rollback y commit de Transaction
                    scopeTransaction.Complete();
                    Console.WriteLine("Exito al realizar la compra, guadado en Sales: ");       
                    return purchaseNum;
                }
            }catch (Exception ex){
                throw;                
            }            
        }
        
    }
}