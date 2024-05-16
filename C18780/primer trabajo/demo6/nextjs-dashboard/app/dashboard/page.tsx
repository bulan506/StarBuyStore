'use client'
import { useEffect, useState } from 'react';
import ProductItem from '../dashboard/product';
import SideNav from '../ui/dashboard/sidenav';
import { Cart, Category, Product } from '../lib/data-definitions';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { getInitialCartLocalStorage, saveInitialCartLocalStorage } from '../lib/cart_data_localeStore';
import useFetchInitialStore from '../api/http.initialStore';
import { useRouter, useSearchParams } from 'next/navigation';

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
            {index === number && <Carousel key={`carousel-${index}`} onAdd={onAdd} products={products} />}
            <ProductItem key={`product-${product.uuid}`} product={product} onAdd={onAdd} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || 'none';

  const [category, setCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>(initialSearch);

  const initialStore = useFetchInitialStore({ category, search });
  const initialCart = getInitialCartLocalStorage();

  const [count, setCount] = useState(initialCart.cart.products.length > 0 ? initialCart.cart.products.length : 0);

  useEffect(() => {
    setCategory(initialCategory);
    setSearch(initialSearch);
  }, [initialCategory, initialSearch]);

  const handleAddToCart = ({ product }: { product: Product }) => {
    initialCart.cart.products.push(product);
    initialCart.cart.subtotal += product.price;
    initialCart.cart.total = initialCart.cart.subtotal + initialCart.cart.subtotal * initialCart.cart.taxPercentage;
    setCount(count + 1);
    saveInitialCartLocalStorage(initialCart);
  }

  const handleAddtoCategory = ({ category }: { category: Category }) => {
    setCategory(category.name);
    router.push(`/dashboard?category=${category.name}&search=none`);
  }

  const handleAddtoSearch = (searchQuery: string) => {
    if (searchQuery && searchQuery.trim().length !== 0) {
      setSearch(searchQuery.trim());
      router.push(`/dashboard?category=${category}&search=${searchQuery.trim()}`);
    } else {
      setSearch("none");
      router.push(`/dashboard?category=${category}&search=none`);
    }
  }

  return (
    <>
      <SideNav countCart={count} onAddCategory={handleAddtoCategory} onAddSearch={handleAddtoSearch} />
      {<ProductsRow products={initialStore ? initialStore : []} onAdd={handleAddToCart} />}
    </>
  );
}