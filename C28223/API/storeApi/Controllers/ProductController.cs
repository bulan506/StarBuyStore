using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using storeApi.Models.Data;
using storeApi.Models;
namespace storeApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private LogicProduct logicProduct = new LogicProduct();
        [HttpGet("admin/products"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetProducts()
        {
            var store = await Store.Instance;
            return Ok(new
            {
                Products = store.Products,
                Categories = store.Categories
            });
        }
        // borrar un producto por ID
        [HttpDelete("admin/product/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteProductById(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException($"El ID del producto a borrar {nameof(id)} debe ser mayor que cero.");
            var deleted = logicProduct.DeleteProductByID(id);
            if (deleted) return Ok(new { message = "Product deleted successfully." });
            else return NotFound(new { message = "Product not found or could not be deleted." });
        }
        // Crear un nuevo producto
        [HttpPost("admin/product")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct([FromBody] NewProductData product)
        {
            if (product == null) return BadRequest(new { message = "Datos del producto no válidos" });
            if (!string.IsNullOrEmpty(product.ImageURL) && product.ImageURL.Length > 498) return BadRequest(new { message = "No se permiten direcciones de imagen grandes." });
            if (!IsValidPrice(product.Price)) return BadRequest(new { message = "El precio debe ser un número válido." });
            try
            {
                await logicProduct.AddNewProductAsync(product);
                return Ok(new { message = "Producto creado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al intentar crear el producto" });
            }
        }
        private bool IsValidPrice(decimal price)
        {
            // El rango de DECIMAL(10,2) es hasta 99999999.99
            return price >= 0 && price <= 99999999.99m;
        }
    }
}

