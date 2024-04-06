namespace ApiLab7;
public sealed class EfectivoPaymentMethod : PaymentMethod
{
    public EfectivoPaymentMethod ()
    {
        PaymentType = Type.EFECTIVO;
    }
}