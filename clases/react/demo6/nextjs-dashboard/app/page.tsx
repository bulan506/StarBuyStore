'use client'
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Producto 1',
    description: 'Descripción del Producto 1',
    imageUrl: 'https://via.placeholder.com/150',
    price: 10.99
  },
  {
    id: 2,
    name: 'Producto 2',
    description: 'Descripción del Producto 2',
    imageUrl: 'https://via.placeholder.com/150',
    price: 15.99
  },
  {
    id: 3,
    name: 'Producto 3',
    description: 'Descripción del Producto 3',
    imageUrl: 'https://via.placeholder.com/150',
    price: 20.99
  }
];

function Cart({ count }) {
  return (
    <div>
      <h2>Carrito de Compras</h2>
      <p>Productos agregados: {count}</p>
    </div>
  );
}

  // Componente Producto
  const Product = ({ product, onAdd }) => {

    const { name, description, imageUrl, price } = product;
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
        <img src={imageUrl} alt={name} style={{ width: '100%' }} />
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Precio: ${price}</p>
        <button >Comprar</button>
        <button onClick={onAdd}>Agregar</button>
      </div>
    );
  };


export default function Page() {
  

  const [count, setCount] = useState(0);
  const [tienda, setTienda] = useState({impVentas:13, carrito:{productos:[], subtotal:0, total:0}});



  const handleAddToCart = (e) => {
    setCount(count + 1);
  };


  return (

    <div>
      <Cart count={count} />
      <h1>Lista de Productos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <Product key={product.id} product={product} onAdd={handleAddToCart} />
        ))}
      </div>


    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* <AcmeLogo /> */}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
        </div>
      </div>
    </main>
    </div>
  );
}
