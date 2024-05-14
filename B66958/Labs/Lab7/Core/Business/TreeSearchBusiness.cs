namespace ApiLab7;

public class TreeNode
{
    public Product Product { get; set; }
    public TreeNode Left { get; set; }
    public TreeNode Right { get; set; }

    public TreeNode(Product product)
    {
        if (product == null)
            throw new ArgumentException("The product can't be null");
        Product = product;
    }
}

public class ProductSearchTree
{
    private TreeNode root;

    public void AddProduct(Product product)
    {
        if (product == null)
            throw new ArgumentException("The product can't be null");
        root = AddProduct(root, product);
    }

    private TreeNode AddProduct(TreeNode node, Product product)
    {
        if (node == null)
        {
            return new TreeNode(product);
        }

        int compareResult = string.Compare(product.Name, node.Product.Name);

        if (compareResult < 0)
        {
            node.Left = AddProduct(node.Left, product);
        }
        else if (compareResult > 0)
        {
            node.Right = AddProduct(node.Right, product);
        }

        return node;
    }

    public IEnumerable<Product> Search(string query)
    {
        List<Product> matchedProducts = new List<Product>();
        Search(root, query, matchedProducts);
        return matchedProducts;
    }

    private void Search(TreeNode node, string query, List<Product> matchedProducts)
    {
        if (node == null)
        {
            return;
        }

        if (node.Product.Name.Contains(query) || node.Product.Description.Contains(query))
        {
            matchedProducts.Add(node.Product);
        }

        Search(node.Left, query, matchedProducts);
        Search(node.Right, query, matchedProducts);
    }
}
