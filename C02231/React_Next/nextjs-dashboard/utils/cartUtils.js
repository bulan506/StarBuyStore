"use client";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useContext, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import Layout from '../components/Layout'
import products from '../utils/products'
import carrusel from '../utils/carrusel'
import { Store } from '../utils/Store'


const [cartItems, setCartItems] = useState([]);
  
const handleAddToCart = (product) => {
  // Obtener los elementos del carrito del localStorage
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  
  // Verificar si el producto ya está en el carrito
  if (!storedCartItems.some(item => item.id === product.id)) {
    // Si el producto no está en el carrito, agregarlo
    const updatedCartItems = [...storedCartItems, product];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Actualizar el contador de productos en el carrito
    const updatedCount = count + 1;
    setCount(updatedCount);
    localStorage.setItem('count', updatedCount);
  }};
