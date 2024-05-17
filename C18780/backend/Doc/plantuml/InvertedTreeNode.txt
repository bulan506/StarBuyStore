@startuml
participant "Client" as Client
participant "ProductSearch" as ProductSearch
participant "InvertedTreeNode" as Node

Client -> ProductSearch: new ProductSearch(products)
ProductSearch -> ProductSearch: BuildInvertedTree(products)
loop for each product
    ProductSearch -> ProductSearch: GetWordsFromText(product.Name + product.Description)
    loop for each word
        ProductSearch -> Node: AddWordToInvertedTree(word, product)
        Node -> Node: Add word to Words dictionary
        Node -> Node: Add product to Products set
    end
end

Client -> ProductSearch: Search(searchText)
ProductSearch -> ProductSearch: GetWordsFromText(searchText)
loop for each keyword
    ProductSearch -> Node: Find node for keyword
    alt node found
        Node -> ProductSearch: Return products from node
        ProductSearch -> ProductSearch: Merge products into resultSet
    else node not found
        ProductSearch -> Client: Return empty resultSet
    end
end
ProductSearch -> Client: Return resultSet

@enduml
