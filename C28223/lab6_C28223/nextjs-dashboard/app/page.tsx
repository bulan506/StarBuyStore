"use client";
import "bootstrap/dist/css/bootstrap.min.css"; 
import React, { useState, useEffect } from 'react';
import "@/app/ui/styles.css";
import Header from "@/app/navStarBuyStore/page";
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

const MostrarProductos = ({ handleClick }) => {
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

const ModalProductoYaAgregado = ({ closeModal }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Producto ya agregado</h5>
            <button type="button" className="close" onClick={closeModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Este producto ya ha sido añadido al carrito.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Page() {
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const initialCart= {
    carrito: {
      subtotal: 0,
      porcentajeImpuesto: 13,
      total: 0,
      direccionEntrega: '',
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
    handlePrice();
  }, [store]);

  const handleClick = (item) => {
  const isPresent = store.productos.some(producto => producto.id === item.id);

    if (isPresent) {
      setShowModal(true);
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

  const closeModal = () => {
    setShowModal(false);
  };
  const handlePrice = () => {
    let subtotalCalc = 0;
    store.productos.forEach((item) => {
        subtotalCalc += item.price;
    });

    let subtotalImpuestoCalc = subtotalCalc * (store.carrito.porcentajeImpuesto / 100);
    let totalCompraCalc = subtotalCalc + subtotalImpuestoCalc;

    const updatedCarrito = {
        ...store.carrito,
        subtotal: subtotalCalc,
        total: totalCompraCalc,
    };

    const updatedStore = {
        ...store,
        carrito: updatedCarrito,
    };

    localStorage.setItem("tienda", JSON.stringify(updatedStore));
};

  return (
    <div>
      <Header size={store.productos.length} setShow={setShow} />
      {
        show ? <MostrarProductos handleClick={handleClick} /> : <Carrito  />
      }
      {showModal && <ModalProductoYaAgregado closeModal={closeModal} />}

      <footer>
        <p>Derechos de autor © 2024. Para mi primer sitio</p>
      </footer>
    </div>
  );
};