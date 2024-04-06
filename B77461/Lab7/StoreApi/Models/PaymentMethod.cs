namespace StoreApi.Models
{
    public class PaymentMethod
{
    public enum Type { EFECTIVO, SINPE };
    public Type PaymentType { get; protected set; }
}
}