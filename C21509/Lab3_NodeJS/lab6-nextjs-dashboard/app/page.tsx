"use client"
import React, { useState, useEffect } from 'react';
import { ProductItem, products, Product } from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HTMLPageDemo.css';
import Link from 'next/link';

export default function Page() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
    setCartCount(savedCartProducts.length);
  }, []);

  const addToCart = (product: ProductItem) => {
    // Obtener los productos del carrito del localStorage
    const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');

    // Actualizar los productos del carrito con el nuevo producto
    const updatedCart = [...savedCartProducts, product];

    // Guardar los productos actualizados en el localStorage
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

    // Actualizar el contador del carrito
    setCartCount(updatedCart.length);
  }
  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="header-container row">
        <div className="search-container col-sm-4 ">
          <input type="search" placeholder="Buscar" value="" />
          <button><img src="/img/Lupa.png" className="col-sm-4" /> </button>
          <Link href="/cart">
            <button><img src="./img/carrito.png" className="col-sm-4" />{cartCount}</button>
          </Link>
        </div>
      </header>

      <div>
        <h1>Lista de Productos</h1>
        <div className='row' style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.map(product =>
            <Product key={product.id} product={product} addToCart={() => addToCart(product)} />
          )}
        </div>
      </div>

      <footer className="footer-container">
        <p>Derechos reservados, 2024</p>
      </footer>
    </main>
  );
}