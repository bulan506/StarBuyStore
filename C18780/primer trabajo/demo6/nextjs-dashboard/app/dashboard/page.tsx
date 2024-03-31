'use client'
import { useState } from 'react';
import ProductItem from '../dashboard/product';
import initialStore from '../lib/products-data';
import SideNav from '../ui/dashboard/sidenav';
import { Product } from '../lib/products-data-definitions';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';

const Carousel = ({ onAdd }: { onAdd: any }) => {
  const chunkSize = 3;
  const productChunks = [];
  for (let i = 0; i < initialStore.products.length; i += chunkSize) {
    productChunks.push(initialStore.products.slice(i, i + chunkSize));
  }
  return (
    <div className="container-products">
      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel"
        data-interval="5000" data-pause="hover">

        <div className="carousel-inner">
          {productChunks.map((chunk, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""} `}>
              <div className="d-flex flex-row justify-content-center align-items-center">
                {chunk.map((product) => (
                  <ProductItem key={product.id} product={product} onAdd={onAdd} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
          data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
          data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}


//Componente principal
const ProductsRow = ({ onAdd }: { onAdd: any }) => {
  let number = (initialStore.products.length - (initialStore.products.length % 4))/2
  return (
    <div className='containerProducts'>
      <div className="row">
        {initialStore.products.map((product, index, array) => (
          <React.Fragment key={product.id}>
            {index === number && <Carousel onAdd={onAdd} />}
            <ProductItem product={product} onAdd={onAdd} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};


export default function Page() {
  const [count, setCount] = useState(initialStore.cart.products.length);

  const handleAddToCart = ({ product }: { product: Product }) => {

    setCount(count + 1);

    initialStore.cart.products.push(product);

    initialStore.cart.subtotal = initialStore.cart.subtotal + product.price;

    initialStore.cart.total = initialStore.cart.subtotal + initialStore.cart.subtotal * initialStore.cart.taxPercentage;
  };

  return (
    <>
      <SideNav countCart={initialStore.cart.products.length > count ? initialStore.cart.products.length : count} />
      <ProductsRow onAdd={handleAddToCart} />
    </>
  );
}