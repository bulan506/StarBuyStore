namespace StoreAPI.models;

public abstract class PaymentMethods
{
    public enum Type
    {
        CASH = 0,
        SINPE = 1
    }
    public Type PaymentType { get; set; }
    public PaymentMethods(PaymentMethods.Type paymentType)
    {
        PaymentType = paymentType;

    }


    private static Sinpe paySinpe=new Sinpe();
    private static Cash paySCash=new Cash();

    public static PaymentMethods Find(PaymentMethods.Type type)
    {
        switch (type)
        {
            case Type.CASH:
                return paySCash;
            case Type.SINPE:
                return paySinpe;
            default:
                throw new ArgumentException("Invalid payment type");
        }
    }

    public sealed class Sinpe : PaymentMethods
    {
        public Sinpe() : base(PaymentMethods.Type.SINPE)
        {

        }
    }
    public sealed class Cash : PaymentMethods
    {
        public Cash() : base(PaymentMethods.Type.CASH)
        {

        }
    }
}
