'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import "./css/stylecarrito.css";
import { getUserData } from "../store/store";

export default function Carrito() {
  const [datos, setDatos] = useState({
    "productos": [],
    "carrito":[],
    "subtotal": 0,
  });

  useEffect(() => {
    const data = getUserData();
    setDatos(data);
  }, []);

  useEffect(() => {
    const subtotal = datos.carrito.reduce((acc, producto) => acc + producto.precio, 0);
    setDatos(previousState => {
      return { ...previousState, subtotal:  subtotal}
    });
  }, [datos.carrito]);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="header">
      
      </header>
      <div className="container">
        <div className="row">
          {datos.carrito.map((producto, index) => (
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
      <footer className="footer d-flex justify-content-center">
        Precio final: {datos.subtotal}$
      </footer>
    </main>
  );
}