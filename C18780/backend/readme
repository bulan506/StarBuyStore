# ProductSearch utilizando árbol invertido

El código proporciona una implementación de búsqueda de productos utilizando un árbol invertido para indexar palabras clave en los nombres y descripciones de los productos.

## Clase InvertedTreeNode

La clase `InvertedTreeNode` representa un nodo en el árbol invertido. Contiene dos campos privados:
- `Words`: Un diccionario que mapea palabras clave a nodos hijos en el árbol.
- `Products`: Un conjunto que almacena los productos asociados con las palabras clave en este nodo.

Se proporcionan métodos públicos para:
- Verificar si una palabra clave está presente en el nodo (`ContainsWord`).
- Obtener el nodo hijo correspondiente a una palabra clave (`GetNode`).
- Agregar una palabra clave y su nodo hijo al diccionario (`AddWord`).
- Verificar si un producto está asociado con este nodo (`ContainsProduct`).
- Agregar un producto al conjunto de productos (`AddProduct`).

## Clase ProductSearch

La clase `ProductSearch` se utiliza para realizar búsquedas de productos utilizando el árbol invertido. Al construir un objeto `ProductSearch`, se indexan los productos proporcionados y se construye el árbol invertido.

Métodos importantes:
- `BuildInvertedTree`: Construye el árbol invertido indexando palabras clave de los nombres y descripciones de los productos.
- `Search`: Realiza una búsqueda de productos dado un término de búsqueda. Divide el término de búsqueda en palabras clave, busca cada palabra clave en el árbol invertido y devuelve los productos asociados con todas las palabras clave.

Se utilizan expresiones regulares para dividir el texto en palabras clave y se aplican transformaciones para normalizar el texto a minúsculas durante el proceso de indexación y búsqueda.

El árbol invertido y la búsqueda de productos están diseñados para ser eficientes en términos de tiempo y memoria, utilizando estructuras de datos como diccionarios y conjuntos para un acceso rápido y sin duplicados.


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
