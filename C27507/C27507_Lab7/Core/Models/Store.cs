using System;
using MyStoreAPI.DB;
using MyStoreAPI.Business;
using System.Collections.Generic;//para usar list

namespace MyStoreAPI.Models
{
    public sealed class Store{
        public List<Product> Products { get; private set; }
        //La mantenemos en memoria en la unica instancia de Store
        public ArrayList StoreCategories {get; private set;}
        public int TaxPercentage { get; private set; }            
        public bool StoreConnectedWithDB {get; private set;}

        private Store(){            
            this.TaxPercentage = 13;
            this.Products = new List<Product>();   
            //Se crean las categorias
            this.StoreCategories = assignCategoriesToProducts();

            //Hacemos de cuenta que se crea con exito las tablas o las reconoce en Program.cs          
            if(!DB_Product.ProductsInTableExist()){

                foreach (var productToStoreTable in createStoreProducts())
                {
                    this.Products.Add(productToStoreTable);                    
                }                                
                DB_Product.InsertProductsStore(this.Products);
            }    
            if(DB_PaymentMethod.PaymentMethodsInTableExist() == false ) DB_PaymentMethod.InsertPaymentMethod();
            //sobreescribimos la lista para que los productos tengan el ID correcto dado por la tabla
            this.Products = DB_Product.SelectProducts();            
            this.StoreConnectedWithDB = true;
            //Ahora la tienda tendra productos para el StoreController (GET) 

            //Creamos el mockData
            //mockDataAsync(Products);
        }


        //Le decimos que solo acepte clases estaticas, con readonly le indicamos que solo 1
        public static readonly Store Instance;

        static Store()
        {            
                                                
            //unica instancia de Store (con los productos y la conexion a la DB)            
            Store.Instance = new Store();                                    
        }

        //Categorias
        private ArrayList AssignCategoriesToProducts(){

            ArrayList allCategories = new ArrayList(){
                new Category { Id = 1, Name = "Redes" },
                new Category { Id = 2, Name = "Celulares" },
                new Category { Id = 3, Name = "Videojuegos" },
                new Category { Id = 4, Name = "Entretenimiento" },
                new Category { Id = 5, Name = "Musica" },
                new Category { Id = 6, Name = "Computadoras" }
            };

            //Nos ahorramos la creacion de una clase Compare<Categorie>
            //allCategories.Sort((x, y) => string.Compare(x.Description, y.Description));
            return allCategories;
        }

        //Generamos productos en caso de que por alguna razon la tabla este vacia     
        public List<Product> createStoreProducts(){
            var products = new List<Product>();

                //Generar 30 productos
                products.Add(new Product
                {                
                    name = "Tablet Samsung",
                    imageUrl = "./img/tablet_samsung.jpg",
                    price = 25,
                    quantity = 0,                
                    description = "lorem ipsum",
                    idCategorie = 2       
                });

                products.Add(new Product
                {                
                    name = "TV LG UHD",
                    imageUrl = "./img/tv.jfif",                
                    price = 50,
                    quantity = 0,
                    description = "lorem ipsum"
                    idCategorie = 4
                });

                products.Add(new Product
                {                
                    name = "Auriculares Genericos",
                    imageUrl = "./img/auri.jfif",
                    price = 100,
                    quantity = 0,
                    description = "lorem ipsum",
                    idCategorie = 5
                });

                products.Add(new Product
                {                
                    name = "Dualshock PS4",
                    imageUrl = "./img/dualshock4.jpg",
                    price = 35,
                    quantity = 0,                
                    description = "lorem ipsum",
                    idCategorie = 3
                });

                products.Add(new Product
                {                
                    name = "Teclado LED",
                    imageUrl = "./img/teclado.jpg",
                    price = 75,
                    quantity = 0,              
                    description = "lorem ipsum",
                    idCategorie = 6
                });

                products.Add(new Product
                {                
                    name = "Samsung A54",
                    imageUrl = "./img/a54_samsung.jpg",
                    price = 250,
                    quantity = 0,              
                    description = "lorem ipsum"
                    idCategorie = 2
                });

                products.Add(new Product
                {             
                    name = "Dualshock PS5",
                    imageUrl = "./img/dualshock5.jpg",
                    price = 250,
                    quantity = 0,                
                    description = "lorem ipsum",
                    idCategorie = 3
                });

                products.Add(new Product
                {                             
                    name = "Samsung Galaxy A54",
                    imageUrl = "./img/a54_samsung.png",
                    price = 150,
                    quantity = 0,                
                    description = "carousel",
                    idCategorie = 2
                });

                products.Add(new Product
                {                
                    name = "Mouse Microsoft",
                    imageUrl = "./img/mouse.png",
                    price = 2500,
                    quantity = 0,                
                    description = "lorem ipsum",
                    idCategorie = 1
                });

                products.Add(new Product
                {             
                    name = "Módem Router - Archer VR400",
                    imageUrl = "./img/router_archerVR400.jpg",
                    price = 75,
                    quantity = 0,                
                    description = "lorem ipsum",
                    idCategorie = 1
                });

                return products;
        }

        public void mockDataAsync(List<Product> productsFromDB){

            //Generamos productos
            //var productsFromDB = Store.Products;            
            Random rand = new Random();            
            SaleLogic saleLogic = new SaleLogic();           
            DateTime startDate = new DateTime(2024, 1, 1);  // Ajusta la fecha de inicio según sea necesario

            for (int week = 0; week < 2; week++){

                for (int day = 0; day < 7; day++){
                    
                    DateTime currentDate = startDate.AddDays(week * 7 + day);

                    //cantidad de ventas por dia
                    for (int saleCount = 0; saleCount < 5; saleCount++){            

                        //cantidad de productos por venta
                        List<Product> someProductsFromDB = new List<Product>(); 
                        int countProduct = 0;

                        //cantidad de productos por venta
                        while (countProduct < 4){

                            // Generamos un índice aleatorio para seleccionar un producto de la lista
                            int randomIndex = rand.Next(productsFromDB.Count);
                            Product selectedProduct = productsFromDB[randomIndex];

                            // Verificamos si el producto seleccionado ya está en la lista someProductsFromDB
                            if (!someProductsFromDB.Any(p => p.name == selectedProduct.name)){
                                someProductsFromDB.Add(selectedProduct);
                                countProduct++;
                            }
                        }

                        decimal subTotal = 0;
                        decimal total = 0;
                        foreach (var product in someProductsFromDB){
                            subTotal += product.price;
                            total += ( product.price + (product.price * 0.13m / 100));
                        }

                        var cartTest = new Cart{
                            allProduct = someProductsFromDB,
                            Subtotal = subTotal,
                            Total = total,
                            Direction = "Costa Rica",
                            PaymentMethod = PaymentMethods.paymentMethodsList.First(p => p.payment == PaymentMethodNumber.CASH)
                        };                        
                        saleLogic.createSaleAsync(cartTest,currentDate);
                    }
                }
            }
        }
    }    
}
