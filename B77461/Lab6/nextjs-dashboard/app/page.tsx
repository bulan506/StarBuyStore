'use client';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./navBar/page";
import Cart from './shoppingCar/page';
import '../app/css/style.css';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
  const [isErrorShowing, setIsErrorShowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [products, setProducts] = useState([]);

  const [isCartActive, setIsCartActive] = useState(false);

  const [count, setCount] = useState(0);
  const [idList, setIdList] = useState([]);

  const [cartLoaded, setCartLoaded] = useState(false);
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
    necesitaVerificacion: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setProducts(result.products)
      } catch (error) {
        setErrorMessage(error)
        setIsErrorShowing(true)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    let cartExistsAndIsLoaded = storedCart && !cartLoaded;
    if (cartExistsAndIsLoaded) {
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

  function clearProducts() {
    localStorage.removeItem('cart');
    setIdList([]);
    setCart({
      carrito: {
        productos: [],
        subtotal: 0,
        porcentajeImpuesto: 13,
        total: 0,
        direccionEntrega: '',
        metodoDePago: ''
      },
      metodosDePago: ['Efectivo', 'Sinpe'],
      necesitaVerificacion: false
    });
  }

  function removeProduct(product) {
    let newProductos;
    let newSubTotal;
    let newTotal;

    if (product.cantidad > 1) {
        // Si la cantidad es mayor que 1, simplemente restamos uno a la cantidad
        newProductos = cart.carrito.productos.map(prod =>
            prod.id === product.id ? { ...prod, cantidad: prod.cantidad - 1 } : prod
        );

        newSubTotal = cart.carrito.subtotal - product.price;
        newTotal = newSubTotal + (newSubTotal * (cart.carrito.porcentajeImpuesto / 100));
    } else {
        // Si la cantidad es igual a 1, eliminamos el producto del carrito
        newProductos = cart.carrito.productos.filter(prod => prod.id !== product.id);
        newSubTotal = newProductos.reduce((acc, curr) => acc + curr.price * curr.cantidad, 0);
        newTotal = newSubTotal + (newSubTotal * (cart.carrito.porcentajeImpuesto / 100));

        setIdList(prevList => prevList.filter(id => id !== product.id)); // Eliminar el producto del idList
    }

    setCart(prevCart => ({
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


  function productAlreadyAdded({ product }) {
    return idList.includes(product.uuid);
  }

  function addProductToCart({ product }: any) {
    const newProductos = [...(cart.carrito.productos || []), product];
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
    const newSubTotal = cart.carrito.subtotal + product.price;
    const newTotal = newSubTotal + (newSubTotal * (cart.carrito.porcentajeImpuesto / 100));

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
    if (!productAlreadyAdded({ product })) {
      idList.push(product.uuid);
      addProductToCart({ product });
      calculateTotals({ product });
      setCount(count + 1);
    }
  };

  const toggleCart = ({ action }: any) => {
    setIsCartActive(action ? true : false);
  };

  async function getData() {
    try {
      const res = await fetch('https://localhost:7075/api/Store');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
    } catch (error) {
      throw error;
    }
  }

  const Product = ({ product, handleAddToCart }) => {
    const { uuid, name, description, imageUrl, price } = product;
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
            <button type="button" className="btn btn-light" onClick={() => handleAddToCart({ product })}>Comprar</button>
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
          {products.map(product => <Product key={product.uuid} product={product} handleAddToCart={handleAddToCart} />)}
        </div>
      </>
    );
  };

  const CarouselBootstrap = () => {
    return (
      <Carousel>
        {products.map(product =>
          <Carousel.Item key={product.uuid}>
            <img
              className="d-block w-100"
              src={product.imageUrl}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
              <button type="button" className="btn btn-light" onClick={() => handleAddToCart({ product })}>Comprar</button>
            </Carousel.Caption>
          </Carousel.Item>)}
      </Carousel>
    );
  }

  return (
    <div className="d-grid gap-2">
      <NavBar productCount={count} toggleCart={(action) => toggleCart({ action })} />
      {isCartActive ? <Cart cart={cart} setCart={setCart}
        toggleCart={(action) => toggleCart({ action })} clearProducts={clearProducts} removeProduct={removeProduct}/> : <><MyRow /> <CarouselBootstrap /></>}
      {isErrorShowing ?
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <Alert variant="danger" onClose={() => setIsErrorShowing(false)} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            <p>{errorMessage.toString()}</p>
          </Alert>
        </div> : ''
      }
    </div>
  );
}