using Core;
using MyStoreAPI.Business;
using MyStoreAPI.DB;
using MyStoreAPI.Models;
using NUnit.Framework;
namespace UT{

    [TestFixture]
    public class ProductCategoriesTesting{
        
        private ProductsLogic productsLogic; // Declarar productsLogic a nivel de clase


        [SetUp]
        public void SetUp(){
            productsLogic = new ProductsLogic();            
        }

        [Test]
        public void GetProductsByIdCategory(){
            IEnumerable<Product> products;


            //Pruebas para Categoria Celulares

           products = productsLogic.filterProductsByCategory(2);

            foreach (var item in products){                
                Assert.AreEqual("Celulares",item.category.name);                
                Assert.AreEqual(2,item.category.id);                
            }
            Assert.AreEqual(3,products.Count());


            //Pruebas para Categoria Videojuegos
            products = productsLogic.filterProductsByCategory(3);

            foreach (var item in products){                
                Assert.AreEqual("Videojuegos",item.category.name);                
                Assert.AreEqual(3,item.category.id);                
            }
            Assert.AreEqual(2,products.Count());

            //Pruebas para Categoria Juguete (no hay productos con esta categoria)
            products = productsLogic.filterProductsByCategory(7);

            foreach (var item in products){                
                Assert.AreEqual("Juguetes",item.category.name);                
                Assert.AreEqual(7,item.category.id);                
            }
            Assert.AreEqual(0,products.Count());
        }

        [Test]
        public void ErrorObtainingProducts(){
            IEnumerable<Product> products;
            
            //Nombre diferente
                //Pruebas para Categoria Videojuegos
            products = productsLogic.filterProductsByCategory(3);

            foreach (var item in products){                
                Assert.AreNotEqual("Nombre diferente",item.category.name);
                Assert.AreNotEqual(2,item.category.id);
            }
            Assert.AreNotEqual(0,products.Count());


            //ID Categoria menor o igual a cero
            Assert.Throws<BussinessException>(() => productsLogic.filterProductsByCategory(0));
            Assert.Throws<BussinessException>(() => productsLogic.filterProductsByCategory(-1));

            //ID Categoria que no existe
            Assert.Throws<BussinessException>(() => productsLogic.filterProductsByCategory(10));

        }


        [Test]
        public void getAndFilterProductsBySearchAndCategoryWithSuccess(){
            IEnumerable<Product> products;
            
            int[] ids = new int[] {1,2,3};
            products = productsLogic.filterProductsBySearchAndCategory("mouse",ids);
            products = productsLogic.filterProductsByCategory(3);

            Assert.AreNotEqual(0,products.Count());            
        }

    }

}

