"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import products from '../utils/product'
import carrusel from '../utils/carrusel'



const Product = ({ product, handleAddToCart }) => {
  const { id, name, author, imgUrl, price } = product;
  return (
    <div className="row my-3">
      <div key={id} className='col-sm-3 mb-4' style={{width: '300px', margin: '0.5rem' }}>
        <div className="card" style={{ background: '#939393'}}>
          <img src={imgUrl} className="card-img-top" style={{ margin: '0.4rem', width: '250px' }} alt={name} />
          <div className="card-body">
            <div className='text-center'>
              <h4> {name} </h4>
              <p> Author: {author} </p>
              <p>Price: ₡{price}</p>
              <button className="btn btn-dark" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {

  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem('count');
    return storedCount ? parseInt(storedCount) : 0;
  });

  const handleAddToCart = (product) => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');


    if (!storedItems.some(item => item.id === product.id)) {
      const updatedCart = [...storedItems, product];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));

      const updatedCount = count + 1;
      setCount(updatedCount);
      localStorage.setItem('count', updatedCount);
    }
  };

  return (

    <main className="flex min-h-screen flex-col p-6" style={{ backgroundColor: 'silver' }}>

      <header className="p-3 text-bg-dark">
        <div className="row" style={{ color: 'gray' }}>
          <div className="col-sm-2">
            <Link href="/">
              <img src="Logo1.jpg" style={{ height: '75px', width: '200px', margin: '1.4rem' }} className="img-fluid" />
            </Link>
          </div>
          <div className="col-sm-8 d-flex justify-content-center align-items-center">
            <form className="d-flex justify-content-center">
              <input type="search" name="search" style={{ width: '805%' }} placeholder="Book..."></input>
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="col-sm-2 d-flex justify-content-end align-items-center">
            <Cart counter={count} />
          </div>

        </div>
      </header>


      <div>
        <h2 className='text-left mt-5 mb-5' style={{ margin: '100px', color: '#3E3F3E' }}>List of Books</h2>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.map(product => (
            <Product key={product.id} product={product} handleAddToCart={handleAddToCart}  />
          ))}
          <CarruselComponent carrusel={carrusel} />
        </div>
      </div >

      <footer className='footer'>
        <div className="text-center p-3">
          <h5 className="text-light">Dev: Paula Chaves</h5>
        </div>
      </footer>

    </main>

  );
}


//Shopping Cart
function Cart({ counter }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div >
        <Link href="/cart">
          <button className="btn btn-success">
            <img src="https://miguelrevelles.com/wp-content/uploads/carrito-de-la-compra-1.png"
              style={{ height: '100px', width: '100px' }} className="img-fluid" />
          </button>
        </Link>
      </div>
      <div style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'green', borderRadius: '50%', width: '20px', height: '20px', textAlign: 'center', color: 'white' }}>
        {counter}
      </div>
    </div>
  );
}

//Carrusel

const CarruselComponent = ({ carrusel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev2 = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex === 0) {
        return carrusel.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const handlePrev = () => {
    const isFirstIndex = currentIndex === 0;
    if (isFirstIndex) {
      setCurrentIndex(carrusel.length - 1);
    } else {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    const isLastIndex = currentIndex === carrusel.length - 1;
    if (isLastIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleNext2 = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex === carrusel.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handleSlide = index => {
    setCurrentIndex(index);
  };

  return (
    <section style={{ margin: '50px' }}>
      <div id="carrouselReact" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <ol className="carousel-indicators">
          {carrusel.map((carrusel, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide-to={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => handleSlide(index)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </ol>
        <div className="carousel-inner">
          {carrusel.map((carrusel, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentIndex ? "active" : ""}`}
            >
              <img className="d-block w-100" src={carrusel.imgurl} width="100%" alt={carrusel.name} />
              <div className="carousel-caption d-none d-md-block" style={{ color: 'black' }}>
                <h5>{carrusel.name}</h5>
                <p>{carrusel.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carrouselReact"
          data-bs-slide="prev"
          onClick={handlePrev}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carrouselReact"
          data-bs-slide="next"
          onClick={handleNext}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </section>
  );
};