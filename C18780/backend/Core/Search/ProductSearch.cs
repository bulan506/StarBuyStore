using StoreApi.Models;

namespace StoreApi.Search
{
    public sealed class TrieNode
    {
        public Dictionary<char, TrieNode> Children { get; }
        public List<Product> Products { get; }

        public TrieNode()
        {
            Children = new Dictionary<char, TrieNode>();
            Products = new List<Product>();
        }
    }

    public sealed class ProductSearch
    {
        private readonly TrieNode root;

        public ProductSearch(IEnumerable<Product> products)
        {
            root = new TrieNode();
            BuildTrie(products);
        }

        private void BuildTrie(IEnumerable<Product> products)
        {
            foreach (var product in products)
            {
                var words = product.Name.Split(' ').Concat(product.Description.Split(' '));
                foreach (var word in words)
                {
                    AddWordToTrie(word.ToLower(), product);
                }
            }
        }

        private void AddWordToTrie(string word, Product product)
        {
            var node = root;
            foreach (var c in word)
            {
                if (!node.Children.ContainsKey(c))
                {
                    node.Children[c] = new TrieNode();
                }
                node = node.Children[c];
            }
            if (!node.Products.Contains(product))
            {
                node.Products.Add(product);
            }
        }

        public IEnumerable<Product> Search(string search)
        {
            IEnumerable<string> keywords = search.Split(" ");
            var resultSet = new HashSet<Product>();
            foreach (var keyword in keywords)
            {
                var node = root;
                foreach (var c in keyword.ToLower())
                {
                    if (!node.Children.ContainsKey(c))
                    {
                        break;
                    }
                    node = node.Children[c];
                }
                resultSet.UnionWith(node.Products);
            }
            return resultSet;
        }
    }
}
