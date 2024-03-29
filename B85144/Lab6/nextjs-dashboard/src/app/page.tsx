'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css"
import { useState, useEffect } from 'react';


const Producto = ({ producto, carrito }) => (
  <div className="col-sm-3">
    <h3>{producto.nombre}</h3>
    <p>{producto.descripcion}</p>
    <img src={producto.imagen} width="100" height="100" />
    <p>{producto.precio}</p>
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
    <div className="d-flex justify-content-center">
      <button>Comprar</button>
    </div>
  </div>
);

const productos = [
  {
    id: 1,
    descripcion: "Descripcion producto 1",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT82KYYpYvwCt-r4FUr5jlFGitEWKLnnoI5-Q&usqp=CAU",
    nombre: "objeto 1",
    precio: 20,
  },
  {
    id: 2,
    descripcion: "Descripcion producto 2",
    imagen: "https://falabella.scene7.com/is/image/FalabellaPE/gsc_113974681_748280_1?wid=1500&hei=1500&qlt=70",
    nombre: "objeto ",
    precio: 10,
  },
  {
    id: 3,
    descripcion: "Descripcion producto 3",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_822477-MLA31604607474_072019-O.webp",
    nombre: "objeto 3",
    precio: 15,
  },
  {
    id: 4,
    descripcion: "Descripcion producto 4",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFTa9t1HvrkKSaKeFsB1tGZ9yCH3m2ZID1Q&usqp=CAU",
    nombre: "objeto 4",
    precio: 30,
  },
];

export default function Page() {

  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  const añadirProducto = (producto) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = [...prevCarrito, producto];
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  }

  const mitad = productos.length / 2;
  const primero = productos.slice(0, mitad);
  const ultimo = productos.slice(mitad, productos.length);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="header">
        <span>
          Tienda
          <input type="text" />
          <button>Buscar</button>
        </span>
        <span>
          <a href="/carrito">Carrito</a>
          <span className="carritoNumero">{carrito.length}</span>
        </span>
      </header>

      <ListaProductos lista={primero} carrito={añadirProducto} />
      <CarruselImagenes lista={productos} />
      <ListaProductos lista={ultimo} carrito={añadirProducto} />

      <footer className="footer">
      </footer>
    </main>
  );
}