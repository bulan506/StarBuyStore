"use client" 
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; 
import Navbar from '../components/Navbar';
import StorePage from '../components/StorePage';


export default function Home() {

  const initialState = {
    impVentas: 13,
    cart: { productos: [], subtotal: 0, total: 0, direccionEntrega: '', metodosPago : '', necesitaVerificacion: false},
  };
  

  const [tienda, setTienda] = useState(() => {
    const storedTienda = localStorage.getItem('tienda');
    return storedTienda ? JSON.parse(storedTienda) : initialState;
  });


  useEffect(() => {
    localStorage.setItem('tienda', JSON.stringify(tienda));
  }, [tienda]);

const agregarProducto=(item)=>{ 
  const isPresent = tienda.cart.productos.some(producto => producto.id === item.id);

  if (!isPresent) {

    const nuevosProductos = [...tienda.cart.productos, item];
    
    const nuevoSubtotal = nuevosProductos.reduce((total, producto) => total + producto.precio, 0);
    const nuevoTotal = nuevoSubtotal * (1 + tienda.impVentas / 100);
    const direccionS = ' ';
    const necesitaVerificacionS = false

    setTienda({
      ...tienda,
      cart: {
        ...tienda.cart,
        productos: nuevosProductos,
        subtotal: nuevoSubtotal,
        total: nuevoTotal,
        direccionEntrega: direccionS,
        necesitaVerificacion: necesitaVerificacionS
      }
    });
  }
};

const Footer = () => (
  <footer className="bg-body-tertiary text-center text-lg-start">
    <div className="text-center p-3" style={{ backgroundColor: 'black' }}>
      <a className="text-white">© 2024: Condiciones de uso</a>
    </div>
  </footer>
);

return ( 
    <div>
      <div>
        <Navbar cantidad_Productos={tienda.cart.productos.length}/>
      </div>

      <main>
      <div className="container" >
        <div>
          <StorePage 
          agregarProducto={agregarProducto}/> 
        </div>

      </div>
    </main>
    <div>
        <Footer></Footer>
    </div>
    </div>
  );
}
