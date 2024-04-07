namespace KEStoreApi;

public abstract class PaymentMethods{

    public enum Type {
        CASH = 0,
        SINPE = 1
    }

    public Type PaymentType {get; set;}

     public PaymentMethods(PaymentMethods.Type paymentType)
    {
        PaymentType= paymentType;

    }
    public sealed class Sinpe : PaymentMethods{
        public Sinpe() : base(PaymentMethods.Type.SINPE)
        {

        }
    }

    public sealed class Cash : PaymentMethods{
          public Cash() : base(PaymentMethods.Type.CASH)
        { 
            
        }
    }
}