"use client"
import React, { useState, useEffect } from 'react';
import { ProductItem, Product } from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTMLPageDemo.css';
import Link from 'next/link';


export default function Page() {
  const [cartProducts, setCartProducts] = useState<ProductItem[]>([]);


  useEffect(() => {

    const loadProductApiData = async () => {
      try {
        const response = await fetch('https://localhost:7165/api/Store');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setCartProducts(json.cartProducts);
        return json;
        console.log(setCartProducts(json.cartProducts));
      } catch (error) {
        throw new Error('Failed to fetch data');
      }
    };
    loadProductApiData();
  }, []);


  useEffect(() => {
    const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
    setCartProducts(savedCartProducts);
  }, []);


  const addToCart = (product: ProductItem) => {
    // Obtener los productos del carrito del estado actual
    const updatedProducts = [...cartProducts, product];

    // Actualizar el estado del carrito con los nuevos productos
    setCartProducts(updatedProducts);
    // Guardar los productos actualizados en el localStorage
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
  }


  debugger
  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="header-container row">
        <div className="search-container col-sm-4 ">
          <input type="search" placeholder="Buscar" value="" />
          <button><img src="/img/Lupa.png" className="col-sm-4" /> </button>
          <Link href="/cart">
            <button ><img src="/img/carrito.png" className="col-sm-4" />{cartProducts.length}</button>
          </Link>
        </div>
      </header>

      <div>
        <h1>Lista de Productos</h1>
        <div className='row' style={{ display: 'flex', flexWrap: 'wrap' }}>
          {cartProducts.map(product =>
            <Product key={product.id} product={product} /*addToCart={() => addToCart(product)}*/ />
          )}

        </div>
      </div>

      <footer className="footer-container">
        <p>Derechos reservados, 2024</p>
      </footer>
    </main>
  );
}



