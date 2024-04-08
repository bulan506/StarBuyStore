'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import NavBar from "./navbar/page";
import Cart from './Cart/page';
import Alert from 'react-bootstrap/Alert';

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

  async function getData() {
    try {
      const res = await fetch('https://localhost:7151/api/Store');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setProducts(result.products);
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
      {isCartActive ? <Cart cart={cart} setCart={setCart}
        toggleCart={(action) => toggleCart({ action })} clearProducts={clearProducts} /> : <MyRow />}
      {/* <Carousel />*/}
      {isErrorShowing ?
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999, // Ensure it's above other content
          }}
        >
          <Alert variant="danger" onClose={() => setIsErrorShowing(false)} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            <p>{errorMessage.toString()}</p>
          </Alert> </div> : ''
      }
    </div>
  );
}
