namespace ApiLab7;
public sealed class SinpePaymentMethod : PaymentMethod
{
    public SinpePaymentMethod ()
    {
        PaymentType = Type.SINPE;
    }
}