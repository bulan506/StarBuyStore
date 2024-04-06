namespace ApiLab7;
public class PaymentMethod
{
    public enum Type { EFECTIVO, SINPE };
    public Type PaymentType { get; protected set; }
}