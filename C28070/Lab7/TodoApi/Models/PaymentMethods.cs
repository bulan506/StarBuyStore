namespace TodoApi;

public abstract class PaymentMethods {



    public enum Type
    {Efectivo = 0, Sinpe = 1}
    public Type PaymentType { get; set; }
    public PaymentMethods(PaymentMethods.Type paymentType)

    {
        PaymentType = paymentType;

    }
    public static PaymentMethods Find(Type type)
    {

        switch (type)
        {
            case Type.Efectivo:
                return new Efectivo();
            case Type.Sinpe:
                return new Sinpe();
            default:
                throw new ArgumentException("Invalid payment method type.");
        }
    }
    
     public static PaymentMethods SetPaymentType(Type type)
    {
        return Find(type);
    }
}
public sealed class Sinpe : PaymentMethods
{
    public Sinpe() : base(PaymentMethods.Type.Sinpe)
    {

    }
}
public sealed class Efectivo : PaymentMethods
{
    public Efectivo() : base(PaymentMethods.Type.Efectivo)
    {

    }
}
