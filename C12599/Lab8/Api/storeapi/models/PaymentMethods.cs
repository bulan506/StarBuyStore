using System;

namespace storeapi
{
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

        public static PaymentMethods Find(PaymentMethods.Type type)
        {
            if (!Enum.IsDefined(typeof(Type), type))
            {
                throw new ArgumentException("Invalid payment type");
            }
            return null;
        }
    }

    public sealed class Sinpe : PaymentMethods
    {
        public Sinpe() : base(PaymentMethods.Type.SINPE)
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
