'use client'
import { useEffect, useState } from 'react';
import ProductItem from '../dashboard/product';
import SideNav from '../ui/dashboard/sidenav';
import { Product } from '../lib/products-data-definitions';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import useInitialStore from '../lib/products-data';

const Carousel = ({ products, onAdd }: { products: Product[], onAdd: any }) => {
  const chunkSize = 4;
  const productChunks = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    productChunks.push(products.slice(i, i + chunkSize));
  }
  return (
    <div className="container-products">
      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel"
        data-interval="5000" data-pause="hover">

        <div className="carousel-inner">
          {productChunks.map((chunk, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""} `}>
              <div className="row d-flex flex-row justify-content-center align-items-center">
                {chunk.map((product, index) => (
                  <ProductItem key={index} product={product} onAdd={onAdd} />
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
const ProductsRow = ({ products, onAdd }: { products: Product[], onAdd: any }) => {
  let number = (products.length - (products.length % 4)) / 2
  return (
    <div className='containerProducts'>
      <div className="row">
        {products.map((product, index) => (
          <React.Fragment key={index}>
            {index === number && <Carousel key={`carousel-${index}`} onAdd={onAdd} products={products} />} {/* Ensure each Carousel has a unique key */}
            <ProductItem key={`product-${product.id}`} product={product} onAdd={onAdd} /> {/* Ensure each ProductItem has a unique key */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};



export default function Page() {
  const [count, setCount] = useState(0);
  const initialStore = useInitialStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialStore.products.length > 0) {
      setLoading(false);
    }
  }, [initialStore.products]);

  const handleAddToCart = ({ product }: { product: Product }) => {
    setCount(count + 1);
    initialStore.cart.products.push(product);

    initialStore.cart.subtotal = initialStore.cart.subtotal + product.price;

    initialStore.cart.total = initialStore.cart.subtotal + initialStore.cart.subtotal * initialStore.cart.taxPercentage;
  };

  return (
    <>
      <SideNav countCart={initialStore.cart.products.length > count ? initialStore.cart.products.length : count} />
      {!loading && <ProductsRow products={initialStore.products} onAdd={handleAddToCart} />}

    </>
  );
}