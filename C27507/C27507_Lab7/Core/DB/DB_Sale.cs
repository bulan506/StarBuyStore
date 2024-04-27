
using System;
using System.Transactions;
using System.Collections.Generic;//para usar list
//API
using MyStoreAPI.Models;
using MySqlConnector;
using System.Runtime.InteropServices.Marshalling;
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
                        purchaseNum = generateRandomPurchaseNum();
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

        public static List<RegisteredSale> GetRegisteredSalesToday(){       

            List<RegisteredSale>  registeredSalesToday =new List<RegisteredSale>();                        

            try{
                using(MySqlConnection connectionWithDB = new MySqlConnection(DB_Connection.INIT_CONNECTION_DB())){
                    connectionWithDB.Open();
                    // IdSale INT AUTO_INCREMENT PRIMARY KEY,                            
                    // PurchaseNum VARCHAR(50) NOT NULL,                           
                    // Total DECIMAL(10, 2) NOT NULL,
                    // Subtotal DECIMAL(10, 2) NOT NULL,                                                
                    // Direction VARCHAR(255) NOT NULL,
                    // IdPayment INT NOT NULL,
                    // DateSale DATETIME NOT NULL,
                    //Extraemos solo la fecha (ignoramos horas-segundos...)
                    string selectSales = @"
                    SELECT IdSale,PurchaseNum, Total,Subtotal, Direction, IdPayment,DateSale 
                    FROM Sales                    
                    Where DateSale BETWEEN '2024-04-27 00:00:00' AND '2024-04-27 23:59:59';
                    ";
                    // WHERE CAST(DateSale AS DATE) = CURRENT_DATE();
                    // Where DateSale BETWEEN '2024-04-26 00:00:00' AND '2024-04-26 23:59:59'
                    // WHERE DATE(DateSale) = DATE(SYSDATE());
                    // WHERE DATE(DateSale) = DATE(NOW())

                    using(MySqlCommand command = new MySqlCommand(selectSales,connectionWithDB)){
                        
                        using (MySqlDataReader readerTable = command.ExecuteReader()){
                            
                            while(readerTable.Read()){
                                
                                var newRegisteredSale = new RegisteredSale();                                
                                newRegisteredSale.IdSale = Convert.ToInt32(readerTable["IdSale"]);
                                newRegisteredSale.PurchaseNum = readerTable["PurchaseNum"].ToString();
                                newRegisteredSale.Total = Convert.ToDecimal(readerTable["Total"]);
                                newRegisteredSale.SubTotal = Convert.ToDecimal(readerTable["Subtotal"]);
                                newRegisteredSale.Direction = readerTable["Direction"].ToString();

                                //Como obtenemos el id de un metodo de pago, debemos buscar dentro de la lista estatica de PaymentMethods si existe
                                //dicho metodo de pago
                                int paymentId = Convert.ToInt32(readerTable["IdPayment"]);                                                                
                                PaymentMethod paymentMethod = PaymentMethods.paymentMethodsList.FirstOrDefault(p => (int)p.payment == paymentId);
                                if (paymentMethod != null){
                                    newRegisteredSale.PaymentMethod = paymentMethod;
                                }
                                else{
                                    //Si obtenemos un Id de un metodo de pago que no existe actualmente, tratarlo mas arriba
                                    //ya que ha podido ser desactivado o eliminado
                                   throw new NotImplementedException("Not valid");
                                }
                                newRegisteredSale.DateTimeSale = (DateTime)readerTable["DateSale"];                            
                                registeredSalesToday.Add(newRegisteredSale);
                            }
                        }
                    }
                }
            }
            catch (Exception ex){                
                //Mandamos el error a SaleLogic
                //Verificar si alguno de los Sale viene nulos en SaleLogic, sino mandamos throw
                Console.WriteLine("Mensaje desde DB_Sale: " + ex);
                throw;
            }
            return registeredSalesToday;

        }

        public static void getSalesLastWeek(string dateFormat){

        }
        public static void getSalesLastMonth(string dateFormat){

        }

        public static void getSalesDateFormat(string dateFormat){

        }

        public static string generateRandomPurchaseNum(){            
            Guid purchaseNum = Guid.NewGuid();            
            string largeString = purchaseNum.ToString().Replace("-", "");            
            Random random = new Random();            
            string randomCharacter = "";            
            for (int i = 0; i < 8; i += 2){                
                int randomIndex = random.Next(i, i + 2);
                randomCharacter += largeString[randomIndex];
            }
            return randomCharacter;
        }        
    }    
}