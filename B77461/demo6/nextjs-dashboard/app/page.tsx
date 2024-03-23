import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import "app/ui/styles/products.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'app/ui/styles/products.css';



// Lista de Productos
const products = [
  { id: 1, name: "Producto 1", price: 15, description: "Descripción del producto 1", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 2, name: "Producto 2", price: 15, description: "Descripción del producto 2", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 3, name: "Producto 3", price: 15, description: "Descripción del producto 3", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 4, name: "Producto 4", price: 15, description: "Descripción del producto 4", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 5, name: "Producto 5", price: 15, description: "Descripción del producto 5", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 6, name: "Producto 6", price: 15, description: "Descripción del producto 6", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 7, name: "Producto 7", price: 15, description: "Descripción del producto 7", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 8, name: "Producto 8", price: 15, description: "Descripción del producto 8", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 9, name: "Producto 9", price: 15, description: "Descripción del producto 8", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 10, name: "Producto 10", price: 15, description: "Descripción del producto 8", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 11, name: "Producto 11", price: 15, description: "Descripción del producto 8", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 12, name: "Producto 12", price: 15, description: "Descripción del producto 8", image: "https://th.bing.com/th/id/OIP.brr0YGVvwq5QuU6qHtAB8QHaEK?rs=1&pid=ImgDetMain" },
  { id: 13, name: "Producto 13", price: 55, description: "Headsets", image: "https://th.bing.com/th/id/OIP.oKA9zP3eVseSkHTQRttipgHaHa?rs=1&pid=ImgDetMain" },
  { id: 14, name: "Producto 14", price: 2000, description: "Laptop", image: "https://wallpaperaccess.com/full/4176969.jpg" },
  { id: 15, name: "Producto 15", price: 80, description: "Teclado", image: "https://quantumtechnologyeg.com/wp-content/uploads/2022/11/e28-600x600.jpg" }
];

 //Componente Producto
 const Product = ({ product }) => {
  const { id, name, price, description, image } = product;
  return (
    <div className="col-md-3">
      <p>{id}</p>
      <h1>{name}</h1>
      <p>{price}</p>
      <p>{description}</p>
      <img src={image} width={230} height={110} />
      <button className="buttonProducts1">AGREGAR</button>
      
    </div>
  );
}

const MyRow = () => {
  const first12Products = products.slice(0, 12);
   return (
    <div className="row">
    {first12Products.map(product => <Product key={product.id} product={product} />)}
   </div>
  );
};

const CarouselItem = ({ product, active }) => {
  return (
    <div className={active ? "carousel-item active" : "carousel-item"}>
      <img src={product.image} width="100%" />
      <div className="container">
        <div className="carousel-caption">
          <h1>{product.name}</h1>
          <p className="opacity-75">Precio: ${product.price}</p>
          <p className="opacity-75">Descripción: {product.description}</p>
          <p><a className="btn btn-lg btn-primary" href="#">Ver</a></p>
        </div>
      </div>
    </div>
  );
}

const Carousel = () => {
  return (
    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div className="carousel-inner">
        {products.slice(-3).map((product, index) => <CarouselItem key={index} product={product} active={index === 0} />)}
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

export default function Page() {
  
  return (

    <main className="flex min-h-screen flex-col p-6">

      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Tienda
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
          <a className="navbar-brand" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart4"
              viewBox="0 0 16 16">
              <path
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
            Carrito
          </a>
        </div>
      </div>
    </nav>
  </div>

      <div className="container">
        <h1>Lista de Productos</h1>
         <div className="row">
         <MyRow />
         <Carousel />
        </div>
      </div>

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
  );
  
}

