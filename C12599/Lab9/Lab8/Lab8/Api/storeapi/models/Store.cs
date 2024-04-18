using System;
using System.Collections.Generic;
using System.Linq;
using MySqlConnector;

namespace storeapi
{
    public sealed class Store
    {
        public List<Product> Products { get; private set; }
        public int TaxPercentage { get; private set; }

        private Store(List<Product> products, int taxPercentage)
        {
            Products = products;
            TaxPercentage = taxPercentage;
        }

        public static readonly Store Instance;
        static Store()
        {
            List<Product> products = LoadProductsFromDatabase();
            Instance = new Store(products, 13); // Ejemplo: establece el impuesto en 13%

            // Ejemplo: Imprimir información de los productos cargados
            Console.WriteLine($"Se cargaron {products.Count} productos desde la base de datos.");
        }

        private static List<Product> LoadProductsFromDatabase()
        {
            List<string[]> productData = StoreDB.RetrieveDatabaseInfo();
            List<Product> products = new List<Product>();

            foreach (string[] row in productData)
            {
                if (row.Length >= 5) // Asegurar que hay suficientes elementos en la fila
                {
                    if (int.TryParse(row[0], out int id) &&
                        decimal.TryParse(row[2], out decimal price))
                    {
                        string name = row[1];
                        string description = row[4];
                        string imageUrl = row[3];

                        Product product = new Product
                        {
                            id = id,
                            Name = name,
                            Price = price,
                            Description = description,
                            ImageUrl = imageUrl
                        };

                        products.Add(product);
                    }
                    else
                    {
                        // Manejar el caso donde la conversión falla
                        Console.WriteLine($"Error: Datos inválidos en la fila: {string.Join(", ", row)}");
                    }
                }
                else
                {
                    // Manejar el caso donde la fila no tiene suficientes elementos
                    Console.WriteLine($"Error: Fila incompleta en la base de datos: {string.Join(", ", row)}");
                }
            }

            return products;
        }
    }
}
