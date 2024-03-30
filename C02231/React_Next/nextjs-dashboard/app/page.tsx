"use client";
import Link from 'next/link';
import { useContext, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import products from '../utils/products'
import carrusel from '../utils/carrusel'


export default function Page() {

  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem('count');
    return storedCount ? parseInt(storedCount) : 0;
  });

  const handleAddToCart = (products) => {
    // Obtener los elementos del carrito del localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Verificar si el producto ya está en el carrito
    if (!storedCartItems.some(item => item.id === products.id)) {
      // Si el producto no está en el carrito, agregarlo
      const updatedCartItems = [...storedCartItems, products];
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      const updatedCount = count + 1;
      setCount(updatedCount);
      localStorage.setItem('count', updatedCount);
    }
  };

  const Product = ({ products }) => {
    return (
      <div className="row my-3">
        {products.map(products => (
          <div key={products.id} className='col-sm-3 mb-4' style={{ background: '#939393', width: '300px', margin: '0.5rem' }}>
            <img src={products.imageurl} className="card-img-top" style={{ margin: '0.4rem', width: '250px' }} alt={products.name} />
            <div className="card-body">
              <div className='text-center'>
                <h4> {products.name} </h4>
                <p> Author: {products.autor} </p>
                <p>Price: ₡{products.price}</p>
                <button className="btn btn-dark" onClick={() => handleAddToCart(products)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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
              <input type="search" name="search" style={{ width: '805%' }} placeholder="Buscar"></input>
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="col-sm-2 d-flex justify-content-end align-items-center">
            <Cart count={count} />
          </div>

        </div>
      </header>


      <div>
        <h2 className='text-left mt-5 mb-5' style={{ margin: '100px', color: '#3E3F3E' }}>List of Books</h2>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Product products={products} />
          <CarruselComponent carrusel={carrusel} />
        </div>
      </div >

      <footer style={{ backgroundColor: '#0D0E1D', color: 'white' }}>
        <div className="text-center p-3">
          <h5 className="text-light">Dev: Paula Chaves</h5>
        </div>
      </footer>

    </main>

  );
}


//Shopping Cart
function Cart({ count }) {
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
        {count}
      </div>
    </div>
  );
}

//Carrusel

const CarruselComponent = ({ carrusel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex === 0) {
        return carrusel.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const handleNext = () => {
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
              <div className="carousel-caption d-none d-md-block" style={{ color: 'white' }}>
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