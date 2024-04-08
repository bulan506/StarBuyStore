import { useEffect, useState } from 'react';
import React from 'react';
import { getInitialCartLocalStorage, saveInitialCartLocalStorage } from '../lib/cart_data_localeStore';

export function useFetchInitialStore() {
  const [products, setProducts] = useState([]);
  const cart = getInitialCartLocalStorage();
  
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch('https://localhost:7099/api/Store');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products);
        cart.taxPercentage = data.taxPercentage/100;
        saveInitialCartLocalStorage(cart);
        
      } catch (error) {
        console.error(error);
      }
    }
    
    getProducts();
  }, []);
  return products;
}

export default useFetchInitialStore;
