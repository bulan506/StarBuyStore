namespace StoreApi.Models
{
public sealed class SinpePaymentMethod : PaymentMethod
{
    public SinpePaymentMethod ()
    {
        PaymentType = Type.SINPE;
    }
}

}