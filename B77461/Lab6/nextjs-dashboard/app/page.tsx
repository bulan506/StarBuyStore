'use client';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./navBar/page";
import Cart from './shoppingCar/page';
import '../app/css/style.css';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [isCartActive, setIsCartActive] = useState(false);
  const [count, setCount] = useState(0);
  const [idList, setIdList] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  async function getProducts() {
    const res = await fetch('https://localhost:7075/api/Store');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return res.json();
  }

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data.products))
      .catch(error => console.error(error));
  }, []);

  const [cart, setCart] = useState({
    carrito: {
      productos: [],
      subtotal: 0,
      porcentajeImpuesto: 13,
      total: 0,
      direccionEntrega: '',
      metodoDePago: ''
    },
    metodosDePago: ['Efectivo', 'Sinpe'],
    verificacion: false
  });
  

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    let cartExistsAndLoaded = storedCart && !cartLoaded;
    if (cartExistsAndLoaded) {
      setCart(JSON.parse(storedCart));
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    setCount(cart.carrito.productos.length);
  }, [cart, cartLoaded]);

  function productAdded({ product }) {
    return idList.includes(product.id);
  }

  function addProductToCart({ product }: any) {
    let newProductos = [...(cart.carrito.productos || []), product];
    setCart(cart => ({
      ...cart,
      carrito: {
        ...cart.carrito,
        productos: newProductos
      }
    }));
    setCartLoaded(true);
  }

  function calculateTotals({ product }: any) {
    let newSubTotal = cart.carrito.subtotal + product.price;
    let newTotal = newSubTotal + (newSubTotal * (cart.carrito.porcentajeImpuesto / 100));

    setCart(cart => ({
      ...cart,
      carrito: {
        ...cart.carrito,
        subtotal: newSubTotal,
        total: newTotal
      }
    }));
  }

  const handleAddToCart = ({ product }: any) => {
    if (!productAdded({ product })) {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      idList.push(product.id);
      addProductToCart({ product });
      calculateTotals({ product });
      setCount(count + 1);
    } else {
      // Si el producto ya está en el carrito, aumentamos su cantidad y recalculamos los totales
      let newProductos = cart.carrito.productos.map((prod: any) =>
        prod.id === product.id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
      );

      let newSubTotal = newProductos.reduce((acc: any, curr: any) => acc + curr.price * curr.cantidad, 0);
      let newTotal = newSubTotal + (newSubTotal * (cart.carrito.porcentajeImpuesto / 100));

      setCart((prevCart: any) => ({
        ...prevCart,
        carrito: {
          ...prevCart.carrito,
          productos: newProductos,
          subtotal: newSubTotal,
          total: newTotal
        }
      }));

      setCount(count + 1);
    }
  };


  const toggleCart = ({ action }: any) => {
    setIsCartActive(action ? true : false);
  };

  function removeProduct(product: any) {
    let newProductos;
    let newSubTotal;
    let newTotal;

    if (product.cantidad > 1) {
      // Si la cantidad es mayor que 1, simplemente restamos uno a la cantidad
      newProductos = cart.carrito.productos.map((prod: any) =>
        prod.id === product.id ? { ...prod, cantidad: prod.cantidad - 1 } : prod
      );

      newSubTotal = cart.carrito.subtotal - product.price;
      newTotal = newSubTotal + (newSubTotal * (cart.carrito.porcentajeImpuesto / 100));
    } else {
      // Si la cantidad es igual a 1, eliminamos el producto del carrito
      newProductos = cart.carrito.productos.filter((prod: any) => prod.id !== product.id);
      newSubTotal = newProductos.reduce((acc: any, curr: any) => acc + curr.price * curr.cantidad, 0);
      newTotal = newSubTotal + (newSubTotal * (cart.carrito.porcentajeImpuesto / 100));

      setIdList(prevList => prevList.filter(id => id !== product.id)); // Eliminar el producto del idList
    }

    setCart((prevCart: any) => ({
      ...prevCart,
      carrito: {
        ...prevCart.carrito,
        productos: newProductos,
        subtotal: newSubTotal,
        total: newTotal
      }
    }));

    setCount(count - 1); // Restar 1 al contador count
}

  

  const Product = ({ product, handleAddToCart }) => {
    const { id, name, description, imageUrl, price } = product;
    return (
      <div className="card" style={{ width: '20rem' }}>
        <div className="col">
          <div className="card-body">
            <img className="card-img-top"
              src={imageUrl}
              width="500" height="110" />
            <h5>{name}</h5>
            <p>Precio: ${price}</p>
            <p>Descripción: {description}</p>
            <button type="button" className="btn btn-buy"  onClick={() => handleAddToCart({ product })}>Agregar</button>
          </div>
        </div>
      </div>
    );
  };

  const MyRow = () => {
    return (
      <>
        <h1>Lista de productos</h1>
        <div className="row justify-content-md-center">
          {products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart} />)}
        </div>
      </>
    );
  };

  const CarouselItem = ({ product, active }) => {
    return <div className={active ? "carousel-item active" : "carousel-item"}>
      <img src={product.imageUrl} width="100%" />
      <div className="container">
        <div className="carousel-caption">
          <h1>{product.name}</h1>
          <p className="opacity-75">Precio: ${product.price}</p>
          <p className="opacity-75">Descripción: {product.description}</p>
        </div>
      </div>
    </div>
  }

  const Carousel = () => {
    return (
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          {products.map(product => <CarouselItem product={product} active={1} />)}
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
    );
  }

  return (
    <div className="d-grid gap-2">
      <NavBar productCount={count} toggleCart={(action) => toggleCart({ action })} />
      {isCartActive ? <Cart cart={cart} setCart={setCart} toggleCart={(action) => toggleCart({ action })} removeProduct={removeProduct} /> : <MyRow />}
      {/* <Carousel />*/}
    </div>
  );
}