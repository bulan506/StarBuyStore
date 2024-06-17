using System;
using storeApi.DataBase;
using storeApi.Models.Data;
namespace storeApi.Models;

public sealed class LogicProduct
{
    public LogicProduct() { }
    private ProductDatabase productDatabase = new ProductDatabase();
    internal delegate void SetNewProductDelegate(Product product);
    internal delegate void DeleteProductDelegate(int productID);

    SetNewProductDelegate newProductDel = async (product) =>
    {
        if (product == null) throw new ArgumentException("El producto no puede ser nulo.");
        if (string.IsNullOrWhiteSpace(product.name)) throw new ArgumentException("El nombre del producto no puede estar vacío o ser nulo.", nameof(product.name));
        if (string.IsNullOrWhiteSpace(product.imageURL)) throw new ArgumentException("La URL de la imagen del producto no puede estar vacía o ser nula.", nameof(product.imageURL));
        if (product.price <= 0) throw new ArgumentOutOfRangeException("El precio del producto debe ser mayor que cero.", nameof(product.price));
        if (string.IsNullOrWhiteSpace(product.description)) throw new ArgumentException("La descripción del producto no puede estar vacía o ser nula.", nameof(product.description));
        var store = await Store.Instance;// instancia de la tienda para anadir el nuevo producto
        store.setNewProduct(product);
    };
    DeleteProductDelegate deleteProductDel = async (productID) =>
   {
       if (productID <= 0) throw new ArgumentException("El id del producto a borrar no puede ser 0 o negativo.", nameof(productID));
       var store = await Store.Instance;// instancia de la tienda para "borrar" el producto de la cache
       store.deleteProductByIDlist(productID);
   };
    public async Task AddNewProductAsync(NewProductData newProduct)
    {
        if (string.IsNullOrWhiteSpace(newProduct.Name)) throw new ArgumentException("El nombre del producto no puede estar vacío o ser nulo.", nameof(newProduct.Name));
        if (string.IsNullOrWhiteSpace(newProduct.ImageURL)) throw new ArgumentException("La URL de la imagen del producto no puede estar vacía o ser nula.", nameof(newProduct.ImageURL));
        if (newProduct.Price <= 0) throw new ArgumentOutOfRangeException("El precio del producto debe ser mayor que cero.", nameof(newProduct.Price ));
        if (string.IsNullOrWhiteSpace(newProduct.Description)) throw new ArgumentException("La descripción del producto no puede estar vacía o ser nula.", nameof(newProduct.Description));
        if (newProduct.Category <= 0) throw new ArgumentOutOfRangeException("El ID de la categoría del producto debe ser mayor que cero.", nameof(newProduct.Category));
        int idNewProduct = await productDatabase.SaveNewProductAsync(newProduct);
        await productDatabase.LastProductByIdAsync(idNewProduct, newProductDel);
    }

    public bool DeleteProductByID(int idProduct)
    {
       if (idProduct <= 0) throw new ArgumentException("El id del producto a borrar no puede ser 0 o negativo.", nameof(idProduct));
        return productDatabase.DeleteProductByID(idProduct, deleteProductDel);
    }
}