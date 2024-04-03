'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import "./css/stylecarrito.css";
import { useRouter } from 'next/navigation'
import { getUserData } from "../store/store";

export default function Carrito() {
  const router = useRouter();

  const [datos, setDatos] = useState({
    "carrito": {
      "productos": [],
      "subtotal": 0,
      "porcentajeImpuesto": 13,
      "total": 0,
      "direccionEntrega": "",
      "metodosDePago": {}
    },
    "metodosDePago": [
      {
        "necesitaVerificacion": true
      }]

  });

  useEffect(() => {
    const data = getUserData();
    setDatos(data);
  }, []);

  useEffect(() => {
    const subtotal = datos.carrito.productos.reduce((acc, producto) => acc + producto.precio, 0);
    setDatos(previousState => {
      return { ...previousState, carrito: { ...previousState.carrito, subtotal: subtotal } }
    });
  }, [datos.carrito.productos]);

  const continuarCompra = () => {
    router.push("/direccion");
  }
  
  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="header">

      </header>
      <div className="container">
        <div className="row">
          {datos.carrito.productos.map((producto, index) => (
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
      <footer className="footer d-flex justify-content-end">
        <div className="d-flex flex-column">
          <span>Subtotal sin impuestos: {datos.carrito.subtotal}$</span>
          <span>Total con impuestos: {(datos.carrito.subtotal) + (datos.carrito.subtotal * (datos.carrito.porcentajeImpuesto / 100))}$</span>
          <button onClick={continuarCompra}>Comprar</button>
        </div>
      </footer>
      
    </main>
  );
}