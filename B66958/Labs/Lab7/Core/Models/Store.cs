namespace ApiLab7;

public sealed class Store
{
    public List<Product> Products { get; private set; }
    public int TaxPercentage { get; private set; }
    public List<PaymentMethods> paymentMethods { get; private set; }
    private static Db db;

    private Store(List<Product> products, int TaxPercentage, List<PaymentMethods> paymentMethods)
    {
        this.Products = products;
        this.TaxPercentage = TaxPercentage;
        this.paymentMethods = paymentMethods;
    }

    public static readonly Store Instance;

    static Store()
    {
        db = Db.Instance;
        List<Product> products = Db.GetProducts();
        List<PaymentMethods> paymentMethods = db.GetPaymentMethods();

        Store.Instance = new Store(products, 13, paymentMethods);
    }
}
