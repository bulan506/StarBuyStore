namespace Store_API.Models
{
    public sealed class Sale
    {
        public IEnumerable<Product> Products { get; }
        public string Address { get; }
        public decimal Amount { get; }
        public PaymentMethods.Type PaymentMethod { get; }

        public Sale(IEnumerable<Product> products, string address, decimal amount, PaymentMethods.Type paymentMethod)
        {
            //Validaciones para evitar valores nulos
            if (products == null || string.IsNullOrWhiteSpace(address))
            {
                throw new ArgumentNullException("Products and address cannot be null or empty.");
            }
            if (amount <= 0)
            {
                throw new ArgumentException("Amount must be greater than zero.");
            }
            if (!Enum.IsDefined(typeof(PaymentMethods.Type), paymentMethod))
            {
                throw new ArgumentException("Invalid payment method.");
            }
            if (!IsValidAddress(address))
            {
                throw new ArgumentException("Address must contain alphanumeric characters.");
            }

            Products = products;
            Address = address;
            Amount = amount;
            PaymentMethod = paymentMethod;
        }

        // Método para verificar si la dirección contiene caracteres alfanuméricos
        private bool IsValidAddress(string address)
        {
            foreach (char c in address)
            {
                if (!char.IsLetterOrDigit(c))
                {
                    return false;
                }
            }
            return true;
        }
    }
}