'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { useState, useEffect } from 'react';
import { getUserData, saveUserData, clearUserData } from "../store/store";
import Carrito from "../pages/carrito";


const Producto = ({ producto, carrito }) => (
  <div className="col-sm-3">
    <h3>{producto.nombre}</h3>
    <p>{producto.descripcion}</p>
    <div className="imagenContainer">
      <img src={producto.imagen} width="100" height="80" />
    </div>
    <p>Precio: {producto.precio}$</p>
    <button onClick={() => carrito(producto)}>Agregar</button>

  </div>
);

const ListaProductos = ({ lista, carrito }) => (
  <div className="container">
    <div className="row">
      {lista.map(producto => (
        <Producto key={producto.id} producto={producto} carrito={carrito} />
      ))}
    </div>
  </div>
);

const ImagenProducto = ({ imagen, activo }) => {
  const className = activo ? 'carousel-item active' : 'carousel-item';
  return (
    <div className={className}>
      <div className="d-flex justify-content-center">
        <img className="image" src={imagen} width="400" height="400" />
      </div>
    </div>
  );
};

const CarruselImagenes = ({ lista }) => (
  <div>
    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true"
          aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div className="carousel-inner">
        {lista.map((producto, index) => <ImagenProducto key={index} imagen={producto.imagen} activo={index === 0} />)}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
);

export default function Page() {
  const [datos, setDatos] = useState({
    "productos": [],
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

  const [salir, setSalir] = useState(false);

  useEffect(() => {
    const data = getUserData();
    setDatos(data);
  }, []);

  useEffect(() => {
    if (salir) {
      clearUserData();
      setDatos(previousState => {
        return {
          ...previousState, "carrito": {
            "productos": [],
            "subtotal": 0,
            "porcentajeImpuesto": 13,
            "total": 0,
            "direccionEntrega": "",
            "metodosDePago": {}
          },
        }
      });
     
  
      setSalir(false);
    }

  }, [salir]);

  const añadirProducto = (producto) => {
    const carrito = [...datos.carrito.productos, producto];
   
    setDatos(previousState => {
      return { ...previousState, carrito: { ...previousState.carrito, productos: carrito } }
    });
  

  }
  useEffect(() => {
    
    if (datos.productos.length>0) {
      saveUserData(datos);
    }
  }, [datos]);

  const limpiar = () => {
    setSalir(true);
  }

  const mitad = datos.productos.length / 2;
  const primero = datos.productos.slice(0, mitad);
  const ultimo = datos.productos.slice(mitad, datos.productos.length);

  return (
    <main className="flex min-h-screen flex-col p-6 main">
      <header className="header">
        <span>
          Tienda
          <input type="text" />
          <button>Buscar</button>
        </span>
        <span>
          <a href="/carrito">Carrito</a>
          <span className="carritoNumero">{datos.carrito.productos.length}</span>
          <button onClick={limpiar}>Salir</button>
        </span>
      </header>

      <ListaProductos lista={primero} carrito={añadirProducto} />
      <CarruselImagenes lista={datos.productos} />
      <ListaProductos lista={ultimo} carrito={añadirProducto} />

      <footer className="footer">
      </footer>
    </main>
  );
}