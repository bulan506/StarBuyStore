"use client";
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import React, { useState } from 'react';
import './ui/styles.css'





const Productos = [
  {
    id: 1,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 2,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 3,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 4,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 5,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 6,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 7,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 8,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 9,
    name: 'CAMISA DE LOS LAKERSpppp',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 10,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 11,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  },
  {
    id: 12,
    name: 'CAMISA DE LOS LAKERS',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ca4d5f9-4053-4dc0-801d-0368b1e7a5c6/jersey-dri-fit-de-la-nba-swingman-los-angeles-lakers-association-edition-2022-23-hd2kRW.png',
    description: 'Camisa de los lakers para adulto',
    precio: 40
  }
];

const CarProducts = [
  {
    id: 1,
    description: "EN LA PRIMERA COMPRA",
    imageUrl: "https://cmsphoto.ww-cdn.com/superstatic/81328/art/grande/40930198-34559071.jpg?v=1576776980.5958636"
  },
  {
    id: 2,
    description: "LO MEJOR EN LIBROS",
    imageUrl: "https://es.literaturasm.com/sites/default/files/styles/blog_full/public/estanterias.jpg?itok=55YhACwn"
  },
  {
    id: 3,
    description: "DESCUENTOS EXCLUSIVOS",
    imageUrl: "https://www.iontics.com/wp-content/uploads/2018/02/descuentos-roles.jpg"
  },
  {
    id: 4,
    description: "LO MEJOR EN LAPTOPS",
    imageUrl: "https://images.unsplash.com/photo-1491472253230-a044054ca35f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 5,
    description: "TODO EN DEPORTES",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/005/425/792/non_2x/sports-3d-landscape-orientation-banner-with-copy-space-vector.jpg"
  },
  {
    id: 6,
    description: "LO ÚLTIMO EN MODA",
    imageUrl: "https://www.lavanguardia.com/files/image_449_220/files/fp/uploads/2020/03/16/5fa908320da3f.r_d.478-313.jpeg"
  }
];



const Product = ({ product }) => {
  const { name, imageUrl, description, precio } = product;
  return (
      <div className="col-sm-3">
          <div className="letraProducto">
              {name}
          </div>
          <img className="img"
              src={imageUrl} />
          <p>{description}</p>
          <p>{precio}</p>
          <button className="buttonProducts1">
              AGREGAR
          </button>
      </div>
  );
};
const filas = [];
            for (let i = 0; i < Productos.length; i++) {
                filas.push(Productos.slice(i , i+4));
            }


            const CarouselApp = () => {
              return (
                  <div className="containerC">
                      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-inner">
                              {CarProducts.map((carProduct) => (
                                  <div key={carProduct.id} className={`carousel-item ${carProduct.id === 1 ? "active" : ""}`}>
                                      <span className="textC">{carProduct.description}</span>
                                      <img className="imgC" src={carProduct.imageUrl} />
                                  </div>
                              ))}
                          </div>
                          <button className="carousel-control-prev btn-custom" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                              <span className="visually-hidden">Next</span>
                          </button>
                      </div>
                  </div>
              );
          };         
  export default function Page() {
      return (
        <div>

                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {filas[0].map(product => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                    
                    <CarouselApp />

                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {filas[1].map(product => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>


                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {filas[2].map(product => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </div>
         
      );
 


    
  };
