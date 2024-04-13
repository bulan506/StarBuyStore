import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';


export const Products = ({ }) => {

  const [productList, setProductList] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch(`https://localhost:7280/api/Store`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      //console.log('Data received:', json);
      setProductList(json);
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  loadData();

  /* const productList = [
     {
       id: 1,
       name: 'Producto 1',
       description: 'Audifonos con alta fidelidad',
       price: 20000,
       imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_1x._SY116_CB667159060_.jpg'
     },
     {
       id: 2,
       name: 'Producto 2',
       description: 'Control PS4',
       price: 20000,
       imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Controller2.png'
     },
     {
       id: 3,
       name: 'Producto 3',
       description: 'PS4 1TB',
       price: 20000,
       imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Playstation3.jpg'
     },
     {
       id: 4,
       name: 'Producto 4',
       description: 'Crash Bandicoot 4 Switch',
       price: 20000,
       imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Game.png'
     },
     {
       id: 5,
       name: 'Producto 5',
       description: 'Mouse Logitech',
       price: 20000,
       imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_Quad_Mouse.jpg'
     },
     {
       id: 6,
       name: 'Producto 6',
       description: 'Silla Oficina',
       price: 20000,
       imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_Quad_Chair.jpg'
     },
     {
       id: 7,
       name: 'Producto 7',
       description: 'Laptop Acer',
       price: 20000,
       imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Laptop.png'
     },
     {
       id: 8,
       name: 'Producto 8',
       description: 'Oculus Quest 3',
       price: 20000,
       imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Oculus2.jpg'
     }
   ];*/

  const [storeData, setStoreData] = useState(() => {
    const storedStoreData = localStorage.getItem("tienda");
    return JSON.parse(storedStoreData);
  });

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };



  const onAddProduct = (product) => {
    if (storeData.productos.some(item => item.id === product.id)) {
      setShowModal(true);
      console.log(showModal);
    } else {
      const updatedStore = {
        ...storeData,
        carrito: {
          ...storeData.carrito,
          subtotal: storeData.carrito.subtotal + product.price,
          total: ((storeData.carrito.subtotal + product.price) * storeData.carrito.porcentajeImpuesto) + (storeData.carrito.subtotal + product.price)
        },
        productos: [...storeData.productos, product]
      };

      setStoreData(updatedStore);
      localStorage.setItem("tienda", JSON.stringify(updatedStore));
    }
  };


  const Product = ({ product }) => {
    const { name, description, imageURL, price } = product;
    return (
      <div className="col-sm-3">
        <div className='info-product'>
          <h2>{name}</h2>
          <div className='price'>{description}</div>
          <div className='price'>Precio: ₡{price}</div>
          <img src={imageURL} alt={name} />
          <button onClick={() => onAddProduct(product)}>
            Agregar al Carrito
          </button>
        </div>
      </div>
    );
  };

  const ProductCarrusel = ({ product }) => {
    const { name, description, imageURL, price } = product;
    return (
      <div className="col-sm-3">
        <div className='info-product'>
          <h2>{name}</h2>
          <img src={imageURL} alt={name} />
        </div>
      </div>
    );
  };
  const Carrusel=({productos}) =>{
    return (
      <Carousel data-bs-theme="dark">
        {productos && productos.products && productos.products.map(product => (
           <Carousel.Item interval={1000}>
          <div className="carrusel-item">
          <ProductCarrusel key={product.id} product={product}  />
          </div>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

return (
  <div>
    {showModal && <ModalError closeModal={closeModal} />}
    <div className="row">
      {productList && productList.products && productList.products.map(product => (
        <Product key={product.id} product={product} onAddProduct={onAddProduct} />
      ))}
    </div>

    <Carousel data-bs-theme="dark">
        {productList && productList.products && productList.products.map(product => (
          <Carousel.Item key={product.id} interval={1000}>
            <div className="info-product">
              <h2>{product.name}</h2>
              <img src={product.imageURL} alt={product.name} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    
  </div>
);
}

const ModalError = ({ closeModal }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Producto ya agregado</h5>
            <button type="button" onClick={closeModal} className="close" aria-label="Close">
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