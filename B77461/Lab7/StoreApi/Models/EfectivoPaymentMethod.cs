namespace StoreApi.Models
{
public sealed class EfectivoPaymentMethod : PaymentMethod
{
    public EfectivoPaymentMethod ()
    {
        PaymentType = Type.EFECTIVO;
    }
}
}