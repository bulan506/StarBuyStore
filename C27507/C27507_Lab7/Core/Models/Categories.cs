using MyStoreAPI.Models;
namespace MyStoreAPI.Models
{
    public sealed class Categories{
        public IEnumerable<Category> CategoryList {get; private set;}        

        private Categories(){

            CategoryList = new List<Category>(){
                new Category { id = 1, name = "Redes" },
                new Category { id = 2, name = "Celulares" },
                new Category { id = 3, name = "Videojuegos" },
                new Category { id = 4, name = "Entretenimiento" },
                new Category { id = 5, name = "Musica" },
                new Category { id = 6, name = "Computadoras" },
                new Category {id = 7, name = "Juguetes"}                
            };
            //Nos ahorramos la creacion de una clase Compare<Categorie>
            //allCategories.Sort((x, y) => string.Compare(x.Description, y.Description));
        }        
        public static readonly Categories Instance;                                

        static Categories() {
            Categories.Instance = new Categories();
        }        
    }

}
