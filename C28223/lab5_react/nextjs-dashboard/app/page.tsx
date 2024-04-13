"use client";
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import React, { useState } from 'react';
const Productos = [

  {
    id: 1,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'
  },
  {
    id: 2,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'


  },
  {
    id: 3,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'


  },
  {
    id: 4,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'


  },

  {
    id: 5,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 2000000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'


  },
  {
    id: 6,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 200000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'


  },
  {
    id: 7,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'


  },
  {
    id: 8,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'


  },
  {
    id: 9,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'
  },
  {
    id: 10,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'
  },
  {
    id: 11,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'
  },
  {
    id: 12,
    name: 'Producto',
    description: 'Esta computadora es muy rapida',
    price: 20000,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg'
  }
];



function MyButton() {
  const [ count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Comprar  {count}
    </button>
  );
}


const Product = ({ product }) => {
  const { name, description, imageURL, price } = product;
  const [count, setCount] = useState(0);
  return (
    <div>
      <div class="row">
        <div class="border p-3">
          <h1>{count}</h1>
          <div class="text-center">
            <h3>{name}</h3>
            <img src={imageURL} />
            <h5>{description}</h5>
            <h5>{price}</h5>
            <MyButton />
          </div>
        </div>
      </div>
    </div>
  );
};



export default function Page() {
  return (
    <div>
      <h1> Lista de productos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Productos.map(product => (
          <Product key={product.id} product={product} />
        ))}
        <CarruselApp/>
      </div>
    </div>
  );
}

const CarruselProducts = [
  {
      id: 1,
      name: 'Colchon',
      description: 'Un colchon comodo',
      price: 100000,
      imageURL: 'https://m.media-amazon.com/images/I/71Cco7OaVxL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
  },
  {
      id: 2,
      name: 'iPad Pro',
      description: 'Color Negro',
      price: 100000,
      imageURL: 'https://m.media-amazon.com/images/I/51HbD2W7FtL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
  },
  {
      id: 3,
      name: 'Mouse',
      description: 'Color Negro',
      price: 1000,
      imageURL: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_UY327_FMwebp_QL65_.jpg'
  }
];



const CarruselProductN = ({ product }) => {
  const { name, description, price, imageURL, id } = product;
  let classe = 'carousel-item';
  classe = product.id === 1 ? classe + ' active' : classe;
  return (
      <div className={classe}>
          <Product product={product} />
      </div>
  );
};

const CarruselApp = () => {
  return (
      <div>
          <div className="carousel-container">
              <div id="carouselExampleIndicatorsReact" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                      {CarruselProducts.map((product, i) => (
                          //la i es un contador y para introducir codigo js es el {}
                          <button key={product.id} type="button" data-bs-target="#carouselExampleIndicatorsReact" data-bs-slide-to={i} className={i === 0 ? 'active' : ''} aria-current={i === 0 ? 'true' : 'false'} aria-label={`Slide ${i + 1}`} />
                      ))}
                  </div>
                  <div className="carousel-inner">
                      {CarruselProducts.map((product) => (
                          <CarruselProductN key={product.id} product={product} />
                      ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicatorsReact" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicatorsReact" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                  </button>
              </div>
          </div>
      </div>
  );
};