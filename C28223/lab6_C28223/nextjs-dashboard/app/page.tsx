"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import React, { useState, useEffect } from 'react';
import "@/app/ui/styles.css";
import HeaderAmazon from "@/app/navAmazon/page";
import Carrito from "@/app/Cart/page";

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
// cards
const Product = ({ product, handleClick }) => {
  const { name, description, imageURL, price } = product;
  return (
    <div>
      <div className="row">
        <div className="border p-4">
          <div style={{justifyContent:"center", textAlign: "center"}}>
            <h3>{name}</h3>
            <img src={imageURL} />
            <h5>{description}</h5>
            <h5>{price}</h5>
            <button onClick={() => handleClick(product)} className="btn btn-primary"> Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Amazon = ({ handleClick }) => {
  return (
    <div>
      <h3> Lista de productos</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Productos.map(product => (
          <Product key={product.id} product={product} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};


export default function Page() {
  const [show, setShow] = useState(true);

  const initialCart= {
    carrito: {
      subtotal: 0,
      porcentajeImpuesto: 13,
      total: 0,
      direccionEntrega: [],
      metodoDePago: ''
    },
    necesitaVerificacion: false,
    productos: [], 
    idCompra:''
  };
  const [store,setStore]= useState(()=> {
    const storedStore=localStorage.getItem("tienda");
    return storedStore?JSON.parse(storedStore):initialCart;
  });

  

  useEffect(() => {
    localStorage.setItem("tienda", JSON.stringify(store));
  }, [store]);

  const handleClick = (item) => {
    const isPresent = store.productos.some(producto => producto.id === item.id);
  

    if (isPresent) {
      alert("Este producto ya fue agregado anteriormente");
    } else {
      const newProd = [...(store.productos), item];
      setStore( ({
        ...store,
        carrito: {
          ...store.carrito
        },
        productos: newProd
      }));
    }
  };


  return (
    <div>
      <HeaderAmazon size={store.productos.length} setShow={setShow} />
      {
        show ? <Amazon handleClick={handleClick} /> : <Carrito  />
      }
      <footer>
        <p>Derechos de autor © 2024. Para mi primer sitio</p>
      </footer>
    </div>
  );
};