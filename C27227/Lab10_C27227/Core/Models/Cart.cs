using System;
using System.Collections.Generic;
using static KEStoreApi.Product;

namespace KEStoreApi
{
    public sealed class Cart
    {
         public List<ProductQuantity> Product { get; set; }
        public string address { get; set; }
        public PaymentMethods.Type PaymentMethod { get; set; }

        internal abstract class CartWithStatus
        {
        }

        internal class CartPendingApprove : CartWithStatus
        {
            public CartPendingApprove()
            {
            }

            public void Approve()
            {
                throw new NotImplementedException("Pending");
            }
        }

        internal class CartApprove : CartWithStatus
        {
            public Sale Sale { get; private set; }

            public CartApprove(Sale sale)
            {
                if (sale == null) throw new ArgumentException($"{nameof(sale)} is required.");
                this.Sale = sale;
            }
        }
    }
}
