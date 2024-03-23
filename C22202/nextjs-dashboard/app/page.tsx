"use client";
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useState } from 'react';
import { count } from 'console';

const products = [
  {
    id: 1,
    imgSource: "producto.jpg",
    name: "Producto 1",
    price: 150
  },
  {
    id: 2,
    imgSource: "producto.jpg",
    name: "Producto 2",
    price: 100
  },
  {
    id: 3,
    imgSource: "producto.jpg",
    name: "Producto 3",
    price: 160
  },
  {
    id: 4,
    imgSource: "producto.jpg",
    name: "Producto 4",
    price: 90
  },
  {
    id: 5,
    imgSource: "producto.jpg",
    name: "Producto 5",
    price: 155
  },
  {
    id: 6,
    imgSource: "producto.jpg",
    name: "Producto 6",
    price: 70
  },
  {
    id: 7,
    imgSource: "producto.jpg",
    name: "Producto 7",
    price: 70
  },
  {
    id: 8,
    imgSource: "producto.jpg",
    name: "Producto 8",
    price: 150
  },
  {
    id: 9,
    imgSource: "producto.jpg",
    name: "Producto 9",
    price: 200
  },
  {
    id: 10,
    imgSource: "producto.jpg",
    name: "Producto 10",
    price: 150
  },
  {
    id: 11,
    imgSource: "producto.jpg",
    name: "Producto 11",
    price: 200
  }
];

const Cart = ({ count }) => {
  
  return (
    <div className='container'>
      <p>Carrito: {count}</p>
    </div>
  )
};


const Product = ({ product, onAdd}) => {
  const { id, imgSource, name, price } = product;
  
  return (
    <div className="col-sm-3">
      <img src={product.imgSource} width="400px" className="img-fluid" />
      <h4>{product.name}</h4>
      <p>Precio: {product.price}$</p>
      <button onClick={onAdd}>Comprar</button>
    </div>
  )
};

const carrouselItems = [
  {
    id: 0,
    imgSrc: "Producto1.jpeg"
  },
  {
    id: 1,
    imgSrc: "https://cdn.mos.cms.futurecdn.net/vhvu7HGyknSTnuQWhjxarS-650-80.png.webp"
  },
  {
    id: 2,
    imgSrc: "https://i.blogs.es/ed843e/superpc-ap/1366_2000.jpeg"
  },
  {
    id: 4,
    imgSrc: "https://cdn.mos.cms.futurecdn.net/vhvu7HGyknSTnuQWhjxarS-650-80.png.webp"
  }
];

const FstItem = ({ carrouselItem }) => {
  const { id, imgSrc } = carrouselItem;

  return (
    <div className="carousel-item active">
      <img className="d-block w-100" src={carrouselItem.imgSrc} width="100%" />
    </div>

  )
};

const ScdItem = ({ carrouselItem }) => {
  const { id, imgSrc } = carrouselItem;

  return (
    <div className="carousel-item">
      <img className="d-block w-100" src={carrouselItem.imgSrc} width="100%" />
    </div>
  )
};

const Carrousel = ({ carrouselItem }) => {
  const { id, imgSrc } = carrouselItem;

  let content;

  if (carrouselItem.id === 0) {
    content = <FstItem carrouselItem={carrouselItem} />
  } else {
    content = <ScdItem carrouselItem={carrouselItem} />
  }

  return (
    content
  )
};

const Indicators = ({ carrouselItem }) => {
  const { id, imgSrc } = carrouselItem;

  let content;

  if (carrouselItem.id === 0) {
    content = <li data-target="#carrouselReact" data-slide-to={carrouselItem.id} className="active"></li>
  } else {
    content = <li data-target="#carrouselReact" data-slide-to={carrouselItem.id}></li>
  }

  return (
    content
  )
};


export default function Page() {

  const [count, setCount] = useState(0);

  function handleClcik(){
    setCount(count + 1)
  }

  return (
    <div className='container'>
      

      <div id="carrouselReact" className="carousel slide mb-6" data-ride="carousel">
        <ol className="carousel-indicators">
          {carrouselItems.map(carrouselItem =>
            <Indicators key={carrouselItem.id} carrouselItem={carrouselItem} />
          )}
        </ol>
        <div className="carousel-inner">
          {carrouselItems.map(carrouselItem =>
            <Carrousel key={carrouselItem.id} carrouselItem={carrouselItem} />
          )}
        </div>
        <a className="carousel-control-prev" href="#carrouselReact" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carrouselReact" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <Cart count={count}/>

      <h1>Lista de productos</h1>
      <div className="row">
        {products.map(product =>
          <Product key={product.id} product={product} onAdd={handleClcik} />
        )}
      </div>

      <main className="flex min-h-screen flex-col p-6">
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
          {/* <AcmeLogo /> */}
        </div>
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
              <strong>Welcome to Acme.</strong> This is the example for the{' '}
              <a href="https://nextjs.org/learn/" className="text-blue-500">
                Next.js Learn Course
              </a>
              , brought to you by Vercel.
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Add Hero Images Here */}
          </div>
        </div>
      </main>
    </div>
  );
}
