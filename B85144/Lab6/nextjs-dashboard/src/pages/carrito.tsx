'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import "./stylecarrito.css"

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [Factura, setFactura] = useState(0);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    setFactura(total);
  }, [carrito]);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="header">
      
      </header>
      <div className="container">
        <div className="row">
          {carrito.map((producto, index) => (
            <div className="col-sm-3" key={index}>
              <div className="card">
                <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <p className="card-text">{producto.precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        Precio final: {Factura}$
      </footer>
    </main>
  );
}