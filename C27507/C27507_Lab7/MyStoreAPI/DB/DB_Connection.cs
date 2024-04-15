using MySql.Data.MySqlClient;
using System;
using System.Transactions;
using System.Collections.Generic;//para usar list
//API
using MyStoreAPI.Models;

namespace MyStoreAPI{
    //Todo estatico para no estar creando instancias por todo lado    
    public static class DB_Connection
    {        
        private static string connectionDB = "server=localhost;user=root;password=123456;database=MyStoreAPI";

        public static string INIT_CONNECTION_DB(){
            return connectionDB;
        }
        
        //iniciamos la conexion con la BD
        public static void ConnectDB(){

            try{
                using (TransactionScope scopeTransaction = new TransactionScope()){
                    //creamos una instancia de mysql
                    using (MySqlConnection connectionWithDB = new MySqlConnection(INIT_CONNECTION_DB())){                
                        //generamos la conexion
                        connectionWithDB.Open();

                        
                        string createTablePaymentMethod = @"
                            CREATE TABLE IF NOT EXISTS PaymentMethod (
                                IdPayment INT NOT NULL PRIMARY KEY,
                                Description VARCHAR(255) NOT NULL,
                                Verification BOOLEAN NOT NULL                                      
                            );";

                        using (MySqlCommand command = new MySqlCommand(createTablePaymentMethod, connectionWithDB)){
                            command.ExecuteNonQuery();
                            Console.WriteLine("Tabla 'Metodos de Pago' creada correctamente.");
                        }

                        string createTableProducts = @"
                            CREATE TABLE IF NOT EXISTS Products (
                                IdProduct INT AUTO_INCREMENT PRIMARY KEY,
                                Name VARCHAR(255) NOT NULL,
                                ImageUrl VARCHAR(255),
                                Price DECIMAL(10, 2) NOT NULL,
                                Quantity INT NOT NULL,
                                Description TEXT
                            );";

                        using (MySqlCommand command = new MySqlCommand(createTableProducts, connectionWithDB)){
                            command.ExecuteNonQuery();
                            Console.WriteLine("Tabla 'Compras' creada correctamente.");
                        }           


                        string createTableSales = @"
                            CREATE TABLE IF NOT EXISTS Sales (
                                IdSale INT AUTO_INCREMENT PRIMARY KEY,                            
                                PurchaseNum VARCHAR(50) NOT NULL,                           
                                Total DECIMAL(10, 2) NOT NULL,
                                Subtotal DECIMAL(10, 2) NOT NULL,                                                
                                Direction VARCHAR(255) NOT NULL,
                                IdPayment INT NOT NULL,
                                DateSale DATETIME NOT NULL,
                                FOREIGN KEY (IdPayment) REFERENCES PaymentMethod(IdPayment)
                            );";

                        using (MySqlCommand command = new MySqlCommand(createTableSales, connectionWithDB)){
                            command.ExecuteNonQuery();
                            Console.WriteLine("Tabla 'Sales' creada correctamente.");
                        }                                     
                        
                        string createTableSalesLines = @"
                            CREATE TABLE IF NOT EXISTS SalesLines (
                                IdSale INT NOT NULL,
                                IdProduct INT NOT NULL,   
                                OriginalProductName VARCHAR(255) NOT NULL,
                                OriginalProductPrice DECIMAL(10,2) NOT NULL,                                
                                Quantity INT NOT NULL,
                                PRIMARY KEY(IdSale, IdProduct),
                                FOREIGN KEY (IdSale) REFERENCES Sales(IdSale),
                                FOREIGN KEY (IdProduct) REFERENCES Products(IdProduct)
                            );";                                                                            

                        using (MySqlCommand command = new MySqlCommand(createTableSalesLines, connectionWithDB)){
                            command.ExecuteNonQuery();
                            Console.WriteLine("Tabla 'SalesLines' creada correctamente.");
                        }
                    }
                    scopeTransaction.Complete();
                }
            }catch (Exception ex){
                throw;
            }            
        }    
    }
}