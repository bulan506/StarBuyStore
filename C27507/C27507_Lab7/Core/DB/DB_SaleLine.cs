
using System;
using System.Transactions;
using System.Collections.Generic;//para usar list
//API
using MyStoreAPI.Models;
using MySqlConnector;
namespace MyStoreAPI.DB
{
    public class DB_SaleLine{

        //Reutlizamos la conexion de InsertSale para no duplicar conexion abierta
        public static void InsertSalesLine(MySqlConnection connectionWithDB,string guid, Cart purchasedCart){
            try{
                
                //Obtenemos el SaleId asociado al comprobante de pago unico (guid)
                string selectIdSale = "SELECT IdSale FROM Sales WHERE PurchaseNum = @purchaseNum";
                decimal IdSaleFromSelect = 0;                
                
                using (MySqlCommand command = new MySqlCommand(selectIdSale,connectionWithDB)){

                    command.Parameters.AddWithValue("@purchaseNum",guid);
                    object existIdSale = command.ExecuteScalar();
                    if(existIdSale == null){
                        Console.WriteLine("No se encontró SaleId para el PurchaseNum: " + guid);
                        //cortamos la ejecucion de la transaccion InsertSaleLines
                        //Lo detecta el try catch de InsertSale
                        return;
                    }
                    IdSaleFromSelect = Convert.ToInt32(existIdSale);                    

                }

                //Al existir la venta con ese codigo unico guid(), usamos su ID int para insertarlo en SalesLins
                string insertSalesLine = @"
                    INSERT INTO SalesLines (IdSale, IdProduct,Quantity,PricePaid,OriginalProductName, OriginalProductPrice)
                    VALUES (@saleId, @productId,@productQuantity,@pricePaid, @originalProductName, @originalProductPrice);";

                using (MySqlCommand command = new MySqlCommand(insertSalesLine, connectionWithDB)){                        
                                            
                    foreach (var actualProductId in purchasedCart.allProduct){
                        command.Parameters.Clear();
                        command.Parameters.AddWithValue("@saleId", IdSaleFromSelect);
                        command.Parameters.AddWithValue("@productId", actualProductId.id);
                        command.Parameters.AddWithValue("@productQuantity", actualProductId.quantity);
                        command.Parameters.AddWithValue("@pricePaid", actualProductId.price);
                        command.Parameters.AddWithValue("@originalProductName", actualProductId.name);
                        command.Parameters.AddWithValue("@originalProductPrice", actualProductId.price);                        
                        command.ExecuteNonQuery();
                        Console.WriteLine("SaleLine registrada");                            
                    }                                                                    
                }                      
            }catch (Exception ex){
                throw;
            }                    
        }     
        
    }
}