namespace TodoApi;

public abstract class PaymentMethods {

    public enum Type {
        Efectivo = 0,
        Sinpe = 1
    }

    public Type PaymentType { get; set; }

    public PaymentMethods(Type paymentType) {
        PaymentType = paymentType;
    }

    public static PaymentMethods Find(Type type) {
        return null;
    }

    public sealed class Efectivo : PaymentMethods {
        
        public Efectivo() : base(Type.Efectivo) {
        }

    }

    public sealed class Sinpe : PaymentMethods {
        public Sinpe() : base(Type.Sinpe) {
        }
    }
}
