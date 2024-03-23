import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/styles.css"
import { useState } from 'react';

const products = [
  {
      id: 1,
      name: "Producto 1",
      decription: "Descripción 1",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/71JSM9i1bQL.AC_UL160_SR160,160.jpg",
      price: 244
  },
  {
      id: 2,
      name: "Producto 2",
      decription: "Descripción 2",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/418UoVylqyL._AC_UL160_SR160,160_.jpg",
      price: 244
  },
  {
      id: 3,
      name: "Producto 3",
      decription: "Descripción 3",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/81WsSyAYxHL._AC_UL160_SR160,160_.jpg",
      price: 244
  },
  {
      id: 4,
      name: "Producto 4",
      decription: "Descripción 4",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/51-lOBlIrFL._AC_UL160_SR160,160_.jpg",
      price: 244
  },
  {
      id: 5,
      name: "Producto 2",
      decription: "Descripción 5",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/51wD-xrtyWL._AC_UL160_SR160,160_.jpg",
      price: 244
  },
  {
      id: 6,
      name: "Producto 6",
      decription: "Descripción 6",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/71EZAE6fljL._AC_UL160_SR160,160_.jpg",
      price: 244
  },
  {
      id: 7,
      name: "Producto 7",
      decription: "Descripción 7",
      imageURL: "https://m.media-amazon.com/images/I/817EyM89DtL._AC_SY100_.jpg",
      price: 244
  },
  {
      id: 8,
      name: "Producto 8",
      decription: "Descripción 8",
      imageURL: "https://m.media-amazon.com/images/I/61J0e7d0GEL._AC_SY100_.jpg",
      price: 244
  },
  {
      id: 9,
      name: "Producto 9",
      decription: "Descripción 9",
      imageURL: "https://m.media-amazon.com/images/I/81mzvAGkHkL._AC_SY100_.jpg",
      price: 244
  },
  {
      id: 10,
      name: "Producto 10",
      decription: "Descripción 10",
      imageURL: "https://m.media-amazon.com/images/I/51YlAYwPx6L._AC_SY100_.jpg",
      price: 244
  },
  {
      id: 11,
      name: "Producto 11",
      decription: "Descripción 11",
      imageURL: "https://m.media-amazon.com/images/I/71cj5cNm7ZL._AC_UY218_.jpg",
      price: 244
  },
  {
      id: 12,
      name: "Producto 12",
      decription: "Descripción 12",
      imageURL: "https://m.media-amazon.com/images/I/7148mbvrbWL._AC_UL320_.jpg",
      price: 244
  },
  {
      id: 13,
      name: "Producto 12",
      decription: "Descripción 13",
      imageURL: "https://m.media-amazon.com/images/I/71Pf0aGicBL._AC_UY218_.jpg",
      price: 244
  },
  {
      id: 14,
      name: "Producto 14",
      decription: "Descripción 14",
      imageURL: "https://m.media-amazon.com/images/I/71P84KYUfrL._AC_UL320_.jpg",
      price: 244
  },
  {
      id: 15,
      name: "Producto 15",
      decription: "Descripción 15",
      imageURL: "https://m.media-amazon.com/images/I/51gJxciP-qL._AC_UY218_T2F_.jpg",
      price: 244
  },
  {
      id: 16,
      name: "Producto 16",
      decription: "Descripción 16",
      imageURL: "https://m.media-amazon.com/images/I/61OI1MNjZZL._AC_UY218_T2F_.jpg",
      price: 244
  }
];

const Product = ({ product }) => {
  const { name, description, imageURL, price } = product;
  const [count, setCount()], useState(0);
  const handleAddToCart = () => (
    setCount(count + 1)
  )

  return (
      <div className="col-sm-3">
          <img src={imageURL} alt={name} style={{ width: '50%', height: '50%' }} />
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Precio: ${price}</p>
          <button type="button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
  );
};

const Carousel = ({ id }) => {
  return (
      <div id={id} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
              {products.map(product => (
                  <div key={product.id} className={product.id === 1 ? "carousel-item active" : "carousel-item"}>
                      <img src={product.imageURL} className="d-block w-100" alt={product.name} />
                  </div>
              ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>
      </div>
  );
}

function rows(array, size) {
  const row = [];
  for (let i = 0; i < array.length; i += size) {
      row.push(array.slice(i, i + size));
  }
  return row;
}


export default function Home() {


  return (
    <div>
      <header>
            <div className="row">
                <div className="col-sm-2">
                    <h1>Amazon</h1>
                </div>
                <div className="col-sm-6">
                    <search>
                        <label>
                            <input type="search" name="q" autoComplete="off"/>
                        </label>
                        <input type="submit" value="Search"/>
                    </search>
                </div>
                <div className="col-sm-4">
                    <button type="button">Amazon Cart</button>
                    <button type="button">Sign in</button>
                </div>
            </div>    
        </header>
      <h1>Lista de Productos</h1>
      {rows(products, 4).map((row, index) => (
          <div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {row.map(product => (
                      <Product key={product.id} product={product} />
                  ))}
              </div>
              {index < rows(products, 4).length && <Carousel id={`carousel${index + 1}`} />}
          </div>
      ))}

      <footer>
          <div className="row">
              <div className="col-sm-12">
                  <h3>Amazon.com</h3>
              </div>
          </div>
      </footer>
    
    </div>
  );
}
