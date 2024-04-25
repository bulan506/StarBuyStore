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

        public static PaymentMethods Find(Type type)
        {
            switch (type)
            {
                case Type.CASH:
                    return new Cash(); // Devuelve una instancia de Cash
                case Type.SINPE:
                    return new SinpeMovil(); // Devuelve una instancia de SinpeMovil
                default:
                    throw new NotImplementedException("Not valid");
            }
        }
    }
    public sealed class SinpeMovil : PaymentMethods
    {
        public SinpeMovil() : base(Type.SINPE)
        {

        }
    }
    public sealed class Cash : PaymentMethods
    {
        public Cash() : base(Type.CASH)
        {

        }
    }
}
