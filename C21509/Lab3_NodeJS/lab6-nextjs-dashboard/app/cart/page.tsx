"use client"
import React, { useState, useEffect } from 'react';
import { ProductItem } from '../layout';
import Link from 'next/link';

const CartFunction = () => {
  const [cartProducts, setCartProducts] = useState<ProductItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const taxPercentage = 0.13; // Porcentaje de impuesto

  useEffect(() => {
    const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
    setCartProducts(savedCartProducts);
  }, []);

  useEffect(() => {
    // Calcula el subtotal
    const subtotalValue = cartProducts.reduce((acc, product) => acc + product.price, 0);
    setSubtotal(subtotalValue);

    // Calcula el total con impuestos
    const totalValue = subtotalValue * (1 + taxPercentage);
    setTotal(totalValue);
  }, [cartProducts]);

  const removeFromCart = (productId: number) => {
    const updatedCart = cartProducts.filter(product => product.id !== productId); // Filtra los productos por su id
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };
  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cartProducts.length > 0 ? (
        <>
          <ul>
            {cartProducts.map(product => (
              <li key={product.id}>
                <img src={product.imageURL} alt={product.name} />
                <p>{product.name}</p>
                <p>Precio: ${product.price}</p>
                <button onClick={() => removeFromCart(product.id)} className="button">Eliminar</button>
              </li>
            ))}
          </ul>
          <div>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Total (con impuestos): ${total.toFixed(2)}</p>
          </div>
          <Link href="/payment">
            <button className="button">Continuar compra</button>
          </Link>

        </>
      ) : (
        <p>No hay productos en el carrito.</p>

      )}
    </div>
  );
};

export default CartFunction;

