using System;
using System.Data.Common;
using System.IO.Compression;
using MySqlConnector;
using StoreAPI.models;

namespace StoreAPI.Database;
public sealed class StoreDB
{
    public static void CreateMysql()
    {

        var products = new List<Product>{

        new Product
        {
            Name = "Cinder",
            Author = "Marissa Meyer",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781250768889_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 9500,
            Id = 1
        },

       new Product
        {
            Name = "Scarlet",
            Author = "Marissa Meyer",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781250768896_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 9500,
            Id = 2
        },

       new Product
        {
            Name = "Cress",
            Author = "Marissa Meyer",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781250768902_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 9500,
            Id = 3
        },

        new Product
        {
            Name = "Winter",
            Author = "Marissa Meyer",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781250768926_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 4
        },

        new Product
        {
            Name = "Fairest",
            Author = "Marissa Meyer",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781250774057_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 8700,
            Id = 5
        },

        new Product
        {
            Name = "La Sociedad de la Nieve",
            Author = "Pablo Vierci",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9786070794162_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 12800,
            Id = 6
        },

        new Product
        {
            Name = "En Agosto nos vemos",
            Author = "Gabriel García Márquez",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9786073911290_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 14900,
            Id = 7
        },

        new Product
        {
            Name = "El estrecho sendero entre deseos",
            Author = "Patrick Rothfuss",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9789585457935_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 12800,
            Id = 8
        },

        new Product
        {
            Name = "Alas de Sangre",
            Author = "Rebecca Yarros",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9788408279990_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 19800,
            Id = 9
        },

       new Product
        {
            Name = "Corona de Medianoche",
            Author = "Sarah J. Mass",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9786073143691_1_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 15800,
            Id = 10
        },

       new Product
        {
            Name = "Carta de Amor a los Muertos",
            Author = "Ava Dellaira",
            ImgUrl = "https://m.media-amazon.com/images/I/41IETN4YxGL._SY445_SX342_.jpg",
            Price = 8900,
            Id = 11
        },

        new Product
        {
            Name = "Alicia en el país de las Maravillas",
            Author = "Lewis Carrol",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9788415618713_1_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 7900,
            Id = 0
        },
         new Product
        {
            Name = "Alicia en el país de las Maravillas",
            Author = "Lewis Carrol",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9788415618713_1_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 7900,
            Id = 12
        },
       new Product
        {
            Name = "Crecent City 1 House Of Earth And Blood",
            Author = "Sarah J. Maas",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781635574043_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price =19800,
            Id = 13
        },
        new Product
        {
            Name = "Crescent City 2 House Of Sky And Breath",
            Author = "Sarah J. Maas",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781635574074_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 19800,
            Id = 14
        },
        new Product
        {
            Name = "Crescent City 3 House Of Flame And Shadow",
            Author = "Sarah J. Maas",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781635574104_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 19800,
            Id = 15
        },
        new Product
        {
            Name = "Harry Potter And The Sorcerers Stone",
            Author = "J.K Rowling",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781338878929_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 9900,
            Id = 16
        },
        new Product
        {
            Name = "Harry Potter And The Chamber Of Secrets",
            Author = "J.K Rowling",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781338878936_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 9900,
            Id = 17
        },
        new Product
        {
            Name = "Harry Potter And The Prisoner Of Azkaban",
            Author = "J.K Rowling",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781338878943_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 9900,
            Id = 18
        },
        new Product
        {
            Name = "Harry Potter And The Goblet Of Fire",
            Author = "J.K Rowling",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781338878950_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 19
        },
        new Product
        {
            Name = "Harry Potter And The Order Of The Phoenix",
            Author = "J.K Rowling",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781338878967_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 20
        },
         new Product
        {
            Name = "Harry Potter And The Half-Blood Prince",
            Author = "J.K Rowling",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781338878974_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 21
        },
         new Product
        {
            Name = "Harry Potter And The Deathly Hallows",
            Author = "J.K Rowling",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781338878981_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 12800,
            Id = 22
        },
         new Product
        {
            Name = "The Hunger Games",
            Author = "Suzzane Collins",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9780439023528_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 23
        },
        new Product
        {
            Name = "Catching Fire",
            Author = "Suzzane Collins",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9780545586177_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 24
        },
        new Product
        {
            Name = "Mockingjay",
            Author = "Suzzane Collins",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9780545663267_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 25
        },
        new Product
        {
            Name = "Ballad Of Songbirds And Snakes",
            Author = "Suzzane Collins",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9781339016573_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 26
        },
          new Product
        {
            Name = "Kingkiller Chronicle 1 The Name Of The Wind",
            Author = "Patrick Rothfuss",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9780756404741_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 8700,
            Id = 27
        },
          new Product
        {
            Name = "Kingkiller 2 The Wise Mans Fear",
            Author = "Patrick Rothfuss",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9780756404734_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 28
        },
          new Product
        {
            Name = "Slow Regard Of Silent Things",
            Author = "Patrick Rothfuss",
            ImgUrl = "https://www.libreriainternacional.com/media/catalog/product/9/7/9780756411329_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1320&width=1000",
            Price = 11900,
            Id = 29
        }
      };



        string connectionString = "Server=localhost;Database=mysql;Port=3306;Uid=root;Pwd=123456;";
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();

            // Eliminar la tabla 'sales' si existe
          /*  string dropSalesTableQuery = "DROP TABLE IF EXISTS sales;";
            using (var dropTableCommand = new MySqlCommand(dropSalesTableQuery, connection))
            {
                dropTableCommand.ExecuteNonQuery();
            }

            //Eliminar la tabla products si existe
            string dropProductsTableQuery = "DROP TABLE IF EXISTS products";
            using (var dropTableCommand = new MySqlCommand(dropProductsTableQuery, connection))
            {
                dropTableCommand.ExecuteNonQuery();
            }*/


            // Create the products table if it does not exist
            string createTableQuery = @"
                DROP DATABASE IF EXISTS store;
                CREATE DATABASE store;
                use store;
                
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    author VARCHAR(100),
                    price DECIMAL(10, 2),
                    imgUrl VARCHAR(255)
                );
                
                CREATE TABLE IF NOT EXISTS sales (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    purchase_date DATETIME NOT NULL,
                    total DECIMAL(10, 2) NOT NULL,
                    payment_method ENUM('0', '1'),
                    purchase_number VARCHAR(50) NOT NULL
                );

                CREATE TABLE IF NOT EXISTS sale_lines (
                    sale_id INT,
                    product_id INT,
                    final_price DECIMAL(10, 2),
                    PRIMARY KEY (sale_id, product_id),
                    FOREIGN KEY (sale_id) REFERENCES sales(Id),
                    FOREIGN KEY (product_id) REFERENCES products(id)
                );               
             ";


            using (var command = new MySqlCommand(createTableQuery, connection))
            {
                int result = command.ExecuteNonQuery();
                bool dbNoCreated = result < 0;
                if (dbNoCreated)
                    throw new Exception("Error creating the bd");
            }

            // Begin a transaction
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    foreach (Product product in products)
                    {
                        string insertProductQuery = @"
                            INSERT INTO products (name, author, price, imgUrl)
                            VALUES (@name, @author, @price, @imgUrl);";

                        using (var insertCommand = new MySqlCommand(insertProductQuery, connection, transaction))
                        {
                            insertCommand.Parameters.AddWithValue("@name", product.Name);
                            insertCommand.Parameters.AddWithValue("@author", product.Author);
                            insertCommand.Parameters.AddWithValue("@price", product.Price);
                            insertCommand.Parameters.AddWithValue("@imgUrl", product.ImgUrl);
                            insertCommand.ExecuteNonQuery();
                        }
                    }

                    // Commit the transaction if all inserts are successful
                    transaction.Commit();
                }
                catch (Exception)
                {
                    // Rollback the transaction if an error occurs
                    transaction.Rollback();
                    throw;
                }
            }
        }
    }
    public static List<Dictionary<string, string>> RetrieveDatabaseInfo()
    {
        List<Dictionary<string, string>> databaseInfo = new List<Dictionary<string, string>>();
        string connectionString = "Server=localhost;Database=store;Port=3306;Uid=root;Pwd=123456;";

        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();

            string sql = "SELECT * FROM products";

            using (var command = new MySqlCommand(sql, connection))
            {
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Dictionary<string, string> row = new Dictionary<string, string>();
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            string columnName = reader.GetName(i);
                            string columnValue = reader.GetValue(i).ToString();
                            row[columnName] = columnValue;
                        }
                        databaseInfo.Add(row);
                    }
                }
            }
        }

        return databaseInfo;
    }

}
