using MyStoreAPI.Models;
namespace MyStoreAPI.Models
{
    public sealed class Categories{
        public IEnumerable<Category> CategoryList {get; private set;}        

        private Categories(){

            CategoryList = new List<Category>(){
                new Category(1, "Redes"),
                new Category(2, "Celulares"),
                new Category(3, "Videojuegos"),
                new Category(4, "Entretenimiento"),
                new Category(5, "Música"),
                new Category(6, "Computadoras"),
                new Category(7, "Juguetes")
            };
            //Nos ahorramos la creacion de una clase Compare<Categorie>
            allCategories.Sort((x, y) => string.Compare(x.Description, y.Description));
        }        
        public static readonly Categories Instance;                                

        static Categories() {
            Categories.Instance = new Categories();
        }        
    }

}
