"use client";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import React from 'react';
import { Card, Container } from "react-bootstrap";

// const products = await fetch('https://localhost:7194/api/Store').JSON()

const Mock = {

  products: [
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
  ],
  cart: {
    products: [],
    subtotal: 0,
    taxFare: 0.13,
    address: '',
    paymentMethod: '',
    orderId: 0
  },
  paymentMethods: ['Efectivo', 'Sinpe']
};

const ProductComponent = () => {

  const loadData = async () => {
    try {
      const response = await fetch('https://localhost:7194/api/Store');
      if (!response.ok) {
        throw new Error('response not ok');
      }
      const json = await response.json();
      debugger
      return json;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  const products = loadData()();
  debugger
  console.log(products.products)

  return (
    <></>
    // <Row className="justify-content-md-center">
    //   {products.map(product =>
    //     <Product key={product.id} product={product} addToCart={handleClick} />)}
    // </Row>
  );
};

const ProductC = ({handleClick}) => {
  const [shop, setShop] = useState({products: []});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7194/api/Store'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      console.log(data)
      setShop(data);
      // debugger
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  console.log(shop.products)

  return (
    // <></>
    <Row className="justify-content-md-center">
      {shop.products.map(product =>
        <Product key={product.id} product={product} addToCart={handleClick} />)}
    </Row>
  );
}

const Cart = ({ count, total }) => {

  return (
    <div className='container'>
      <Button href="/cart">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        Products: {count} Total: ${total}
      </Button>

    </div>
  )
};


const Product = ({ product, addToCart }) => {
  const { id, imgSource, name, price } = product;

  return (
    <Col sm='3' className="mt-5">
      {/* <img src={product.imgSource} width="400px" className="img-fluid" />
      <h4>{product.name}</h4>
      <p>Precio: {product.price}$</p>
      <Button variant="primary" size="sm" onClick={() => addToCart(id)}>
        Comprar
      </Button> */}

      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={product.imgSource} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            Precio: ${product.price}
          </Card.Text>
          <Button variant="primary" onClick={() => addToCart(id)}>Comprar</Button>
        </Card.Body>
      </Card>
    </Col>

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

const Item = React.forwardRef(({ carrouselItem }, ref) => {
  const { id, imgSrc } = carrouselItem;

  return (
    <Carousel.Item >
      <img src={carrouselItem.imgSrc} width="100%" />
    </Carousel.Item>
  );
});

export default function Home() {

  var mockStoraged = JSON.parse(localStorage.getItem('Mock')) || {};
  if (mockStoraged) {
    localStorage.setItem('Mock', JSON.stringify(Mock));
    mockStoraged = JSON.parse(localStorage.getItem('Mock'));
  }
  const [count, setCount] = useState(mockStoraged.cart.products.length);
  const [mock, setMock] = useState(mockStoraged)

  const handleClick = (id) => {
    let copyOfMock = { ...mock };
    // const localStorageMock = JSON.parse(localStorage.getItem('Mock'));
    const productToAdd = copyOfMock.products.find(product => product.id === id);
    if (productToAdd) {
      copyOfMock.cart.products = [...copyOfMock.cart.products, productToAdd];
      copyOfMock.cart.subtotal += productToAdd.price
      setMock(copyOfMock)
      localStorage.setItem('Mock', JSON.stringify(mock));
    }
  }

  return (
    <Container>
      <Cart count={mock.cart.products.length} total={mock.cart.subtotal} />
      {/* <Carousel>
        {carrouselItems.map(carouselItem =>
          <Item key={carouselItem.id} carrouselItem={carouselItem} />
        )}
      </Carousel> */}


      <div className="mx-auto">

        <h1>Lista de productos</h1>
      </div>
      <Row className="justify-content-md-center">
        {Mock.products.map(product =>
          <Product key={product.id} product={product} addToCart={handleClick} />
        )}
      </Row>
      <ProductC key={'productsGrid'} handleClick={handleClick}/>
    </Container>
  );
}
