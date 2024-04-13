namespace MyStoreAPI
{
    public class PaymentMethod
    {
        public PaymentMethodNumber payment { get; set; }
        public bool verify { get; set; }

        public PaymentMethod(PaymentMethodNumber payment, bool verify)
        {
            payment = payment;
            verify = verify;
        }
    }

    //Valores predefinidos
    public enum PaymentMethodNumber
    {
        CASH = 1,
        CREDIT_CARD = 2,
        DEBIT_CARD = 3,
        SINPE = 4
    }
}