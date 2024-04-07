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
        private Store( List<Product> products, int TaxPercentage )
        {
            this.Products = products;
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
                quantity = 0,
                price = 25
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "TV LG UHD",
                imageUrl = "./img/tv.jfif",
                quantity = 0,
                price = 50
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Auriculares Genericos",
                imageUrl = "./img/auri.jfif",
                quantity = 0,
                price = 100
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Dualshock PS4",
                imageUrl = "./img/dualshock4.jpg",
                quantity = 0,
                price = 35
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Teclado LED",
                imageUrl = "./img/teclado.jpg",
                quantity = 0,
                price = 75
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Samsung Galaxy A54",
                imageUrl = "./img/a54_samsung.png",
                quantity = 0,
                price = 150
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Dualshock PS5",
                imageUrl = "./img/dualshock5.jpg",
                quantity = 0,
                price = 250
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Samsung A54",
                imageUrl = "./img/a54_samsung.jpg",
                quantity = 0,
                price = 250
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Mouse Microsoft",
                imageUrl = "./img/mouse.png",
                quantity = 0,
                price = 2500
            });

            products.Add(new Product
            {
                uuid = Guid.NewGuid(),
                name = "Módem Router - Archer VR400",
                imageUrl = "./img/router_archerVR400.jpg",
                quantity = 0,
                price = 75
            });

            Store.Instance = new Store(products,13);            
        }        

         // Método para imprimir la cantidad de productos en la tienda
        public static void PrintProductCount()
        {
            Console.WriteLine("Cantidad de productos en la tienda: " + Instance.Products.Count);
        }
    }
}