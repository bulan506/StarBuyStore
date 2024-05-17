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

![invertedTreeNode](https://www.planttext.com/api/plantuml/png/XPFFJiCm3CRlUGfh9ofW3x036dyqn849mIJEKUEDY3If79UnjoT9swtfDbQfIkhuzzdvhCuzI-AcCg8EgovrBIt3vD5ej3m1wQ7TviTlv5HJyWTAAhzILXR9ar_i3nAZMX7YqYbC-N4ZHAiDjtSvFmEBspnqLRTVlX1P_0Jxq6YZXaK7h76kXhKZG1dOBYuWF9TKdv4_7Ic_85Ujy9TxqUbILWZNlTRq2Nr9kcRjR964yvBRe9729sj6LsPmhrGijNBP9I9vqvSfzXeHoT1K0jX1QXUKBcCladR_89rgfBgUF7XiZK6hH7pF3wkRa4zBzERoZ8xS7CAvOz-usvjsnh25jWfil5MaXe0qt1yqLXqvCEhg7RaXsxlXOHswI_ZvYOqKNf4sU13GDZXAw1iJCZexZSUs9UjurDQHUclvlZ6iQjwDzRhnN68Fb9Y7_FZ7_m40)
[PlantUml](backend/Doc/InvertedTreeNode.md.)
