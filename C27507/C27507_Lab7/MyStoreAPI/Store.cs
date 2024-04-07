using System;
//using MySqlConnector;
using System.Collections.Generic;//para usar list

namespace MyStoreAPI
{
    public sealed class Store
    {
        public List<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }

        //Constructor de Store
        private Store( List<Product> Products, int TaxPercentage )
        {
            this.Products = Products;
            this.TaxPercentage = TaxPercentage;
        }

        //Le decimos que solo acepte clases estaticas, con readonly le indicamos que solo 1
        public static readonly Store Instance;

        static Store()
        {
            var products = new List<Product>();

            //Generar 30 productos
            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Tablet Samsung",
                imageUrl = "./img/tablet_samsung.jpg",
                price = 25,
                quantity = 0,                
                description = "lorem ipsum"                
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "TV LG UHD",
                imageUrl = "./img/tv.jfif",                
                price = 50,
                quantity = 0,
                description = "lorem ipsum"
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Auriculares Genericos",
                imageUrl = "./img/auri.jfif",
                price = 100,
                quantity = 0,
                description = "lorem ipsum"
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Dualshock PS4",
                imageUrl = "./img/dualshock4.jpg",
                price = 35,
                quantity = 0,                
                description = "lorem ipsum"                
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Teclado LED",
                imageUrl = "./img/teclado.jpg",
                price = 75,
                quantity = 0,              
                description = "lorem ipsum"  
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Samsung A54",
                imageUrl = "./img/a54_samsung.jpg",
                price = 250,
                quantity = 0,              
                description = "lorem ipsum"                  
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Dualshock PS5",
                imageUrl = "./img/dualshock5.jpg",
                price = 250,
                quantity = 0,                
                description = "lorem ipsum"
            });

            products.Add(new Product
            {                
                uuid = Guid.NewGuid(),
                name = "Samsung Galaxy A54",
                imageUrl = "./img/a54_samsung.png",
                price = 150,
                quantity = 0,                
                description = "carousel"
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Mouse Microsoft",
                imageUrl = "./img/mouse.png",
                price = 2500,
                quantity = 0,                
                description = "lorem ipsum"
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Módem Router - Archer VR400",
                imageUrl = "./img/router_archerVR400.jpg",
                price = 75,
                quantity = 0,                
                description = "lorem ipsum"
            });

            Store.Instance = new Store(products,15);            
        }        

         // Método para imprimir la cantidad de productos en la tienda
        public static void PrintProductCount()
        {
            Console.WriteLine("Cantidad de productos en la tienda: " + Instance.Products.Count);
        }
    }
}