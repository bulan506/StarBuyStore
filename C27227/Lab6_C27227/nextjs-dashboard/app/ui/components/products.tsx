
import React, { useState, useEffect } from 'react';
import Product from '@/app/ui/components/product';
import '../styles/app.css';

const Products_Store = ({ handleClick }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:5072/api/Store');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setProductList(json);
      } catch (error) {
         console.error('Failed to fetch data:', error);
      }
    };
    
    loadData();

  }, []);

  return (
    <div className="product-list row">
      {productList && productList.products && productList.products.map((product) => (
        <Product key={product.id} product={product} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default Products_Store;
import React from 'react';
import products from '@/app/ui/data';
import Product from '@/app/ui/components/product';
import '../styles/app.css';

const Products_Store = ({handleClick}) => {


    return(
        <div className="product-list row">
        {products.map((product) => (
          <Product key={product.id} product={product} handleClick={handleClick} />
        ))}
      </div>
    )

}

export default Products_Store;
