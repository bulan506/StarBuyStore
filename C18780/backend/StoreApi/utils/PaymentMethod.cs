using System.ComponentModel.DataAnnotations.Schema;

namespace StoreApi.utils
{

    [NotMapped]
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

        public static string Find(PaymentMethods.Type type)
        {
            switch (type)
            {
                case Type.CASH:
                    return "CASH";
                case Type.SINPE:
                    return "SINPE";
                default:
                    return null;
            }
        }
    }
    public sealed class SinpeMovil : PaymentMethods
    {
        public SinpeMovil() : base(PaymentMethods.Type.SINPE)
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
