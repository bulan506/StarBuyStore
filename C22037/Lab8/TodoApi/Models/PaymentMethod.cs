namespace TodoApi;

public abstract class PaymentMethods
{
    public enum Type
    {
        Cash = 0,
        Sinpe = 1
    }

    public Type PaymentType { get; set; }

    public static PaymentMethods Find(PaymentMethods.Type type)
    {
        switch (type)
        {
            case Type.Cash:
                return new Cash();
            case Type.Sinpe:
                return new Sinpe();
            default:
                throw new ArgumentException("Invalid payment method type.");
        }
    }
}

public sealed class Sinpe : PaymentMethods
{

}

public sealed class Cash : PaymentMethods
{

}