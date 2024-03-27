'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import NavBar from "./Navbar/page";
import Cart from './Cart/page';

export default function Home() {

  const [isCartActive, setIsCartActive] = useState(false);

  const [count, setCount] = useState(0);
  const [idList, setIdList] = useState([]);
  const [cart, setCart] = useState(
    {
      carrito: {
        productos: [],
        subtotal: 0,
        porcentajeImpuesto: 13,
        total: 0,
        direccionEntrega: '',
        metodosDePago: {}
      },
      metodosDePago: [],
      necesitaVerificacion: false
    }
  );

  function productAlreadyAdded({ product }) {
    return idList.includes(product.id);
  }

  function addProductToCart({ product }) {
    const newProductos = [...cart.carrito.productos, product];
    setCart(cart => ({
      ...cart,
      carrito: {
        ...cart.carrito,
        productos: newProductos
      }
    }));
    console.log(newProductos);
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
      idList.push(product.id);
      addProductToCart({ product });
      calculateTotals({ product });
      setCount(count + 1);
    }
  };

  const toggleCart = ({ action }: any) => {
    setIsCartActive(action ? true : false);
  };

  const products = [
    { id: 1, name: 'Producto 1', description: 'Un producto', imageUrl: 'https://cdn.mos.cms.futurecdn.net/rfphfWvEc3PL2wfPJvZGiP.jpg', price: 75.0 },
    { id: 2, name: 'Producto 2', description: 'Un producto', imageUrl: 'https://images.samsung.com/is/image/samsung/assets/nz/members/article-assets/gaming-monitors/img-kv-2.jpg?$ORIGIN_JPG$', price: 700.0 },
    { id: 3, name: 'Producto 3', description: 'Un producto', imageUrl: 'https://media.steelseriescdn.com/blog/posts/how-to-choose-your-mousepad/38569118cb1443abb9b88cf9b3f10da0.jpg', price: 30.0 },
    { id: 4, name: 'Producto 4', description: 'Un producto', imageUrl: 'https://png.pngtree.com/png-vector/20220728/ourmid/pngtree-gaming-keyboard-rgb-effect-png-image_6087818.png', price: 30.0 },
    { id: 5, name: 'Producto 5', description: 'Un producto', imageUrl: 'https://cdn.mos.cms.futurecdn.net/rfphfWvEc3PL2wfPJvZGiP.jpg', price: 75.0 },
    { id: 6, name: 'Producto 6', description: 'Un producto', imageUrl: 'https://images.samsung.com/is/image/samsung/assets/nz/members/article-assets/gaming-monitors/img-kv-2.jpg?$ORIGIN_JPG$', price: 700.0 },
    { id: 7, name: 'Producto 7', description: 'Un producto', imageUrl: 'https://media.steelseriescdn.com/blog/posts/how-to-choose-your-mousepad/38569118cb1443abb9b88cf9b3f10da0.jpg', price: 30.0 },
    { id: 8, name: 'Producto 8', description: 'Un producto', imageUrl: 'https://png.pngtree.com/png-vector/20220728/ourmid/pngtree-gaming-keyboard-rgb-effect-png-image_6087818.png', price: 30.0 },
    { id: 9, name: 'Producto 9', description: 'Un producto', imageUrl: 'https://cdn.mos.cms.futurecdn.net/rfphfWvEc3PL2wfPJvZGiP.jpg', price: 75.0 },
    { id: 10, name: 'Producto 10', description: 'Un producto', imageUrl: 'https://images.samsung.com/is/image/samsung/assets/nz/members/article-assets/gaming-monitors/img-kv-2.jpg?$ORIGIN_JPG$', price: 700.0 },
    { id: 11, name: 'Producto 11', description: 'Un producto', imageUrl: 'https://media.steelseriescdn.com/blog/posts/how-to-choose-your-mousepad/38569118cb1443abb9b88cf9b3f10da0.jpg', price: 30.0 },
    { id: 12, name: 'Producto 12', description: 'Un producto', imageUrl: 'https://png.pngtree.com/png-vector/20220728/ourmid/pngtree-gaming-keyboard-rgb-effect-png-image_6087818.png', price: 30.0 },
  ];

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
      {isCartActive ? <Cart cart={cart} toggleCart={(action) => toggleCart({ action })} /> : <MyRow />}
      {/* <Carousel />*/}
    </div>
  );
}
