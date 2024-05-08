namespace ApiLab7;

public sealed class Store
{
    public List<Product> Products { get; private set; }
    public int TaxPercentage { get; private set; }
    public List<PaymentMethods> paymentMethods { get; private set; }
    public IEnumerable<Category> CategoriesList { get; private set; }
    private static Db db;

    private Store(
        List<Product> products,
        int TaxPercentage,
        List<PaymentMethods> paymentMethods,
        IEnumerable<Category> categories
    )
    {
        this.Products = products;
        this.TaxPercentage = TaxPercentage;
        this.paymentMethods = paymentMethods;
        this.CategoriesList = categories;
    }

    public static readonly Store Instance;

    public IEnumerable<Product> ProductsByCategory(int category)
    {
        if (category < 1)
            throw new ArgumentException("A category must have an ID, and it should be above 0");
        return Instance.Products.Where(product => product.CategoryId == category);
    }

    public IEnumerable<Product> ProductsByCategoriesAndName(List<int> categories, string name){
        if(categories.Count() == 0 || categories == null){
            throw new ArgumentException("At least one category is expected");
        }
    }

    static Store()
    {
        db = Db.Instance;
        List<Product> products = Db.GetProducts();
        List<PaymentMethods> paymentMethods = db.GetPaymentMethods();
        IEnumerable<Category> categories = Categories.Instance.GetCategories();

        Store.Instance = new Store(products, 13, paymentMethods, categories);
    }
}
