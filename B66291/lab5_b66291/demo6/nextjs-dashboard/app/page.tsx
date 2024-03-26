"use client"
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { custom } from 'zod';
import { Button } from './ui/button';

  /*funciona*/
const products = [
  { id: 1, name: 'Gamer tools', description: 'Perifericos disponibles de diferentes diseños', precio:'20-60$', imageUrl: 'https://png.pngtree.com/png-vector/20220725/ourmid/pngtree-gaming-equipment-computer-peripheral-device-png-image_6064567.png' },
  { id: 2, name: 'Portatil Alienware', description: 'Portatiles para todo tipo de usuario y necesidad', precio:'625$', imageUrl: 'https://sitechcr.com/wp-content/uploads/2016/06/A15_i781T3GSW10s4.jpg' },
  { id: 3, name: 'Figuras MHA', description: 'Decora tu lugar preferido', precio:'30-55$', imageUrl: 'https://m.media-amazon.com/images/I/61lHgRfaG2L._AC_UF894,1000_QL80_.jpg' },
  { id: 4, name: 'Hoodie Viñeta', description: 'Busca tu diseño personalizado', precio:'44$', imageUrl: 'https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/28/651172/1.jpg?7281' },
  { id: 5, name: 'Shonen Jump', description: 'Mantente al día con las publicaciones', precio:'38$', imageUrl: 'https://pbs.twimg.com/media/FslBjwGWIAElbQv.jpg:large'},
  { id: 6, name: 'FFVII', description: 'Comprueba los últimos lanzamientos', precio:'49$', imageUrl: 'https://sm.ign.com/ign_ap/cover/f/final-fant/final-fantasy-vii-remake-part-2_gq8f.jpg' },
  { id: 7, name: 'Kimetsu DVD', description: 'Consigue los mejores estrenos', precio:'28$', imageUrl: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/9111c4a7-8d9d-47c6-adbe-424a9b2dc5f4.jpg' },
  { id: 8, name: 'Disco Vinilo', description: 'Encuentra gran variedad de generos', precio:'23$', imageUrl: 'https://static.dezeen.com/uploads/2022/09/bioplastic-record-pressing_dezeen_2364_col_1.jpg' },
  { id: 9, name: 'Discos SSD', description: 'Mejora tu PC con la última tecnología', precio:'38$', imageUrl: 'https://c1.neweggimages.com/productimage/nb640/20-250-088-V03.jpg' },
  { id: 10, name: 'Comiccon merch', description: 'Mercaderia del evento preferido', precio:'28$', imageUrl: 'https://members.asicentral.com/media/32573/tshirtathome-616.jpg' },
  { id: 11, name: 'Software', description: 'Instala tu herramienta preferida', precio:'40$', imageUrl: 'https://m.media-amazon.com/images/I/81CucSxYsJL._AC_UF1000,1000_QL80_.jpg' },
  { id: 12, name: 'Caja bento', description: 'Consigue tus bentos favoritos', precio:'13$', imageUrl: 'https://m.media-amazon.com/images/I/51O0hWbj2gL._AC_UF894,1000_QL80_.jpg' }
];

  /*funciona*/
const Product = ({ product }) => {
  const { name, description, precio, imageUrl } = product;
  return (
      <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-between">
      <div className="border p-3 text-center">
      <h3>{name}</h3>
      <h5>{description}</h5>
      <img src={imageUrl} style={{ height: '220px', width: '100%' }} alt="Product Image" />
      <h5 style={{paddingTop: '20px' }}>{precio}</h5>
      <button type="button" className="btn btn-success mt-3" >Agregar al carrito</button>
    </div>
    </div>
  );  
};

  /*funciona*/
const Row = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'black', justifyContent: 'center' }}>
      <h2 style={{ color: 'white' }}></h2>
    </div>
    );
  };


                                          //Carrusel

const imgCarrusel = [
    { id: 1, Imagen: 'https://gswarrington.com/wp-content/uploads/2022/06/22990-GS-Summer-Fashion-2022-Digi-Assets-Web-banner-1900x600-1.jpg' },
    { id: 2, Imagen: 'https://cdn.agilitycms.com/scotiabank-costa-rica/images/redesign/slides/Banner-Scotia%20Cuotas.png' },
    { id: 3, Imagen: 'https://static.vecteezy.com/system/resources/previews/013/977/761/non_2x/finance-banner-template-with-plastic-credit-cards-free-vector.jpg' },
];
    
//componente carrusel
const Slider = ({ imgCarrusel }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Function to move to the previous slide
  const moveToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgCarrusel.length - 1 : prevIndex - 1
    );
  };

  // Function to move to the next slide
  const moveToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imgCarrusel.length - 1 ? 0 : prevIndex + 1
    );
  };

  const carouselContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const carouselStyle = {
    maxWidth: '1000px',
    maxHeight: '300px',
    overflow: 'hidden',
  };

  const sliderbutton = {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    margin: '0 10px',  /* Moves 10 pixels to the left and right */
    borderRadius: '50px', /* Makes the buttons round */
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    padding: '8px 16px', // Adjust padding as needed
  };

  return (
    <div className="carousel-container" style={carouselContainerStyle}>
      <button className="custom-button" onClick={moveToPreviousSlide} style={sliderbutton}>
        Prev
      </button>
      <div className="carousel" style={carouselStyle}>
        <img src={imgCarrusel[currentImageIndex].Imagen} alt={`Banner ${currentImageIndex}`}  
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>
      <button type="button" className="btn btn-primary" onClick={moveToNextSlide} style={sliderbutton}>
        Next
      </button>
    </div>
  );
};



const Header = () => (
  <header className="container-fluid" style={{ width: '100%', backgroundColor: 'black', color: 'white' }}>
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img width="70" height="70" src="https://img.icons8.com/clouds/100/technology.png" alt="technology" />
          GeekGadgets
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Envíos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Ingreso a la cuenta</a>
            </li>
          </ul>
          <div className='cart-counter'>
            <span className='badge bg-primary'></span>
            <img src='https://t4.ftcdn.net/jpg/01/86/94/37/360_F_186943704_QJkLZaGKmymZuZLPLJrHDMUNpAwuHPjY.jpg' className='card-img-top' alt='...'
              style={{height: '30px', width: '40px', marginRight: '1rem'}} 
            />
          </div>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ color: 'black' }} />
            <button className="btn btn-outline-success" type="submit" style={{ color: 'white' }}>Buscar</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-body-tertiary text-center text-lg-start">
    <div className="text-center p-3" style={{ backgroundColor: 'black' }}>
      <a className="text-white">© 2024: Condiciones de uso</a>
    </div>
  </footer>
);

const IndexPage = () => {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Bienvenido a mi aplicación Next.js</p>
      <Link href="/nueva-pagina">
        <a>Ir a Nueva Página</a>
      </Link>
    </div>
  );
};


// Se encarga de renderizar la pagina
export default function Home() { 
  return (
    // Div que engloba el main y el body
    <div>

      {/* div que engloba el header */}
      <div>
        <Header></Header>
      </div>

    <div>
      <Slider imgCarrusel={imgCarrusel}/>
    </div>

    {/**div que encierrra los productos*/}
    <div>
        <div className="container">
            <h1 className="mt-3 mb-3"></h1> 
            <h1 className="mt-3 mb-3"></h1>
            <div className="row">
              {products.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </div>
        </div>
      </div>

      {/**div que encierra el footer*/}
      <div>
          <Footer></Footer>
      </div>
      

      <main className="flex min-h-screen flex-col p-6">  {/* <Clase main /> */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* <AcmeLogo /> */}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        
      </div>
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
      </div>
      </main>
    </div>

  );  
}


