"use client"
import React, { useState, useEffect } from 'react';
import { ProductItem, Product } from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTMLPageDemo.css';
import Link from 'next/link';

export default function Page() {
  const [availableProducts, setAvailableProducts] = useState<ProductItem[]>([]);
  const [cartProducts, setCartProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const loadProductApiData = async () => {
      try {
        const response = await fetch('https://localhost:7165/api/Store');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        if (json.products) {
          setAvailableProducts(json.products);
        } else {
          throw new Error('Failed to fetch data: No products found');
        }
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
    setCartProducts(prevProducts => {
      const updatedProducts = [...prevProducts, product];
      localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="header-container row">
        <div className="search-container col-sm-4 ">
          <input type="search" placeholder="Buscar" value="" />
          <button className="col-sm-2"><img src="/img/Lupa.png" className="col-sm-4" /> </button>
          <Link href="/cart" className="col-sm-4 d-flex justify-content-end">
            <button><img src="/img/carrito.png" className="col-sm-6" />{cartProducts.length}</button>
          </Link>
        </div>
      </header>

      <div>
        <h1>Lista de Productos</h1>
        <div className='row' style={{ display: 'flex', flexWrap: 'wrap' }}>
          {availableProducts && availableProducts.map(product =>
            <Product key={product.id} product={product} addToCart={addToCart} />
          )}
        </div>
      </div>

      <div className="products col-sm-6" style={{ margin: '0 auto' }}>
        <div id="productsCarouselControl" className="carousel" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img/Chromecast.jpg" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="/img/teclado.jpg" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="/img/Pantalla.jpg" className="d-block w-100" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#productsCarouselControl" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#productsCarouselControl" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <footer className="footer-container">
        <p>Derechos reservados, 2024</p>
      </footer>
    </main>
  );
}
