using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core;
using KEStoreApi.Data;

namespace KEStoreApi
{
    public sealed class Store
    {
        public IEnumerable<Product> ProductsList { get; private set; } 
        public int TaxPercentage { get; private set; }
        public IEnumerable<Categoria> CategoriasLista { get; private set; }

        private Store(IEnumerable<Product> products, int taxPercentage, IEnumerable<Categoria> categorias)
        {
            if (products == null || !products.Any()) throw new ArgumentException("La lista de productos no puede ser nula ni estar vacía.", nameof(products));

            if (taxPercentage < 0 || taxPercentage > 13) throw new ArgumentOutOfRangeException(nameof(taxPercentage), "El porcentaje de impuestos no puede ser mayor a 13%");

            if(categorias == null || !categorias.Any()) throw new ArgumentException($"La lista de {nameof(categorias)} no puede ser nula ni estar vacía");
           
            this.ProductsList = products;
            this.TaxPercentage = taxPercentage;
            this.CategoriasLista = categorias;
        }

        public static async Task<Store> InitializeInstanceAsync()
        {
            var products = await Products.InitializeAsync(); 
            var categorias = Categorias.Instance.GetCategorias();
            return new Store(products.ProductsStore, 13, categorias);
        }
        private static readonly Lazy<Task<Store>> InstanceTask = new Lazy<Task<Store>>(InitializeInstanceAsync);
        public static Task<Store> Instance => InstanceTask.Value;

    }
}
