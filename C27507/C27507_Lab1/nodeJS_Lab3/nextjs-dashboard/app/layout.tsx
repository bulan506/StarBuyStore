"use client"

import {useState} from 'react';
import { number } from 'zod';
import { ModalCart } from './modal_cart';
import { totalPriceNoTax, totalPriceTax,getCartShopStorage,setCartShopStorage } from './page'; //precios totales - manejor LocalStorage


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  quantity: 0;
  price: number;
}

export const product: ProductItem[] = [
  // const product = [
  {
      id: 1,
      name: "Producto 1",                
      imageUrl: './img/tablet_samsung.jpg',
      quantity: 0,
      price: 25
  },
  {
      id: 2,
      name: "Producto 2",                
      imageUrl: "./img/tv.jfif",
      quantity: 0,
      price: 50
  },
  {
      id: 3,
      name: "Producto 3",                
      imageUrl: "./img/auri.jfif",
      quantity: 0,
      price: 100
  },
  {
      id: 4,
      name: "Dualshock PS4",                
      imageUrl: "./img/dualshock4.jpg",
      quantity: 0,
      price: 35
  },
  {
      id: 5,
      name: "Producto 5",                
      imageUrl: "./img/teclado.jpg",
      quantity: 0,
      price: 75
  },
  {
      id: 6,
      name: "Samsung Galaxy A54",                
      imageUrl: "./img/a54_samsung.png",
      quantity: 0,
      price: 150
  },
  {
      id: 7,
      name: "Dualshock PS5",
      imageUrl: "./img/dualshock5.jpg",
      quantity: 0,
      price: 250
  },
  {
      id: 8,                
      name: "Producto 8",
      imageUrl: "./img/a54_samsung.jpg",
      quantity: 0,
      price: 250
  },
  {
      id: 9,
      name: "Mouse Microsoft",
      imageUrl: "./img/mouse.png",
      quantity: 0,
      price: 2500
  },
  {
    id:10,
    name:"Módem Router - Archer VR400",
    imageUrl: "./img/router_archerVR400.jpg",
    quantity: 0,
    price: 75,
  }

];

export interface CartShopItem {
  allProduct: ProductItem[];
  subtotal: number;
  tax: number;
  total: number;
  direction: string;
  payment: number;
  verify: boolean
}

// export interface LocalStorageItem {
//   allProduct: ProductItem[];
//   cartShop: CartShopItem;  
// }

// export const cart: CartShopItem = {
  
//   allProduct: [],
//   subtotal: 0,
//   tax: 0,
//   total: 0,
//   direction: "",
//   payment: 0,
//   verify: false  
// };

// export const myLocalStorage: LocalStorageItem = {
//   allProduct: [], //estan vacio en un principio
//   cartShop: cart
// };



interface ProductProps {
  product: ProductItem;
  numberOfItems: number;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;
  allProduct: ProductItem[];
  setAllProduct: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  totalWithTax:number;
  setTotalWithTax: React.Dispatch<React.SetStateAction<number>>;
  totalWithNoTax: number;
  setTotalWithNoTax: React.Dispatch<React.SetStateAction<number>>;
  myCartInStorage: CartShopItem | null;
}


//Galeria de Productos
export const Product: React.FC<ProductProps> = ({ product, numberOfItems, setNumberOfItems, allProduct, setAllProduct,totalWithTax,setTotalWithTax,totalWithNoTax,setTotalWithNoTax,myCartInStorage }) => {

  const { id,name, imageUrl, price } = product;    

  const buyItem = () => {    
    //como el objeto del carrito puede ser nulo, creamos una condicion para evitar estar haciendo
    //condiciones    
    if (myCartInStorage) {

      //Actualizacion de los useState            
      setNumberOfItems(prevNumberOfItems => prevNumberOfItems + 1);
      const newAllProduct = [...allProduct, product];
      setAllProduct(newAllProduct);
      const newTotalWithNoTax = totalPriceNoTax(newAllProduct);
      const newTotalWithTax = totalPriceTax(newAllProduct);
      setTotalWithNoTax(newTotalWithNoTax);
      setTotalWithTax(newTotalWithTax);


      //Actualizacion de los atributos del carrito
        //lo clonamos para evitar malas asignaciones con el carrito original
      const updatedCart = { ...myCartInStorage };      
      updatedCart.allProduct = newAllProduct;      
      updatedCart.subtotal = newTotalWithNoTax
      updatedCart.total = newTotalWithTax;      
      
      //sobbrescrimos el carrito clonado sobre el original
      setCartShopStorage("A", updatedCart);
                
    } else {
        console.log("El carro no existe");
    }
};
    
  return (
      <div className="product col-sm-4 row">
          <div hidden>{id}</div>
          <div className="row-sm-3"><img src={imageUrl}/></div>
          <p className="row-sm-3">{name}</p>
          <p className="row-sm-3">${price}</p>
          <button className="row-sm-3" onClick={ () => buyItem() }>Comprar</button>          
      </div>
  );
}


interface CartShopProps {
  numberOfItems: number;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;    
  allProduct: ProductItem[];
  setAllProduct: React.Dispatch<React.SetStateAction<ProductItem[]>>;  
  
  totalWithTax:number;
  setTotalWithTax: React.Dispatch<React.SetStateAction<number>>;
  totalWithNoTax: number;
  setTotalWithNoTax: React.Dispatch<React.SetStateAction<number>>;
}

//Carrito
export const CartShop: React.FC<CartShopProps> = ({numberOfItems,setNumberOfItems,allProduct,setAllProduct,totalWithTax,setTotalWithTax,totalWithNoTax,setTotalWithNoTax}) => {

  //States del ModalCart
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return(

    <div className="cart_container col-sm-6">
      {/* Cuando se presione cualquier parte del Carrito, se abre el modal */}
      <a onClick={handleShow}>
          <div className="cart-info">
              <i className="fas fa-shopping-cart"></i>                    
              <div className="notify-cart">{numberOfItems}</div>
          </div>                    
          <p className="col-sm-6">Mi carrito</p>                                                                   
          
      </a>  

      {/* Llamamos al carrito desde modal_cart.tsx */}
      <ModalCart 
        show={show} 
        handleClose={handleClose}
        allProduct={allProduct}
        setAllProduct={setAllProduct}
        totalWithTax={totalWithTax}
        setTotalWithTax={setTotalWithTax}
        totalWithNoTax={totalWithNoTax}
        setTotalWithNoTax={setTotalWithNoTax}

      />    
                                      
    </div>           
  );
}


export const StaticCarousel = () => {
  return (
      
      <div id="carouselExampleCaptions" className="carousel slide">
          <div className="cover"></div>
          <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
          <div className="carousel-item active">
              <div className="cover_img"></div>
              <img src="img/mouse.png" className="d-block w-100" alt="Mouse" />
              <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
              <div className="cover_info"></div>
              </div>
          </div>
          <div className="carousel-item">
              <img src="img/teclado.jpg" className="d-block w-100" alt="Teclado" />
              <div className="cover_img"></div>
              <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
              <div className="cover_info"></div>
              </div>
          </div>
          <div className="carousel-item">
              <img src="img/tablet_samsung.jpg" className="d-block w-100" alt="Tablet Samsung" />
              <div className="cover_img"></div>
              <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
              <div className="cover_info"></div>
              </div>
          </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
          </button>
      </div>                            
  );
}