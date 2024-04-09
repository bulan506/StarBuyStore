public class CartHandler
{
    private readonly CartRepository _cartRepository;

    public CartHandler()
    {
        _cartRepository = new CartRepository();
    }

    public Sale Purchase(Cart cart)
    {
        ValidateCart(cart);

         // Find matching products based on the product IDs in the cart
        IEnumerable<Product> matchingProducts = Products.Where(p => cart.ProductIds.Contains(p.Uuid.ToString())).ToList();

        // Create shadow copies of the matching products
        IEnumerable<Product> shadowCopyProducts = matchingProducts.Select(p => (Product)p.Clone()).ToList();

        // Calculate purchase amount by multiplying each product's price with the store's tax percentage
        decimal purchaseAmount = 0;
        foreach (var product in shadowCopyProducts)
        {
            product.Price *= (1 + (decimal)TaxPercentage / 100);
            purchaseAmount += product.Price;
        }

        PaymentMethods paymentMethod = PaymentMethods.Find(cart.PaymentMethod);

        var sale = new Sale(shadowCopyProducts, cart.Address, purchaseAmount, paymentMethod);

        ValidateSale(sale);

        return _cartRepository.Purchase(cart);
    }

    private void ValidateCart(Cart cart)
    {
        if (cart.ProductIds.Count == 0)
            throw new ArgumentException("Cart must contain at least one product.");
        if (string.IsNullOrWhiteSpace(cart.Address))
            throw new ArgumentException("Address must be provided.");
        if (amount <= 0) throw new ArgumentException("The final amount should be above 0");
        if (paymentMethod == null) throw new ArgumentException("A payment method should be provided");
    }

    private void ValidateSale(Sale sale)
    {
        if (sale.products.Count() == 0) 
            throw new ArgumentException("Sale must contain at least one product.");
        if (string.IsNullOrWhiteSpace(sale.address)) 
            throw new ArgumentException("Address must be provided.");
        if (sale.amount <= 0) 
            throw new ArgumentException("The final amount should be above 0");
        if (sale.paymentMethod == null) 
            throw new ArgumentException("A payment method should be provided");
    }
}