"use client"

import {useState} from 'react';
import { number } from 'zod';
import { ModalCart } from './modal_cart';
import { totalPriceNoTax, totalPriceTax,getCartShopStorage,setCartShopStorage,verifyProductInCart,addProductInCart } from './page'; //precios totales - manejor LocalStorage
import { verify } from 'crypto';


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

// export const product: ProductItem[] = [
//   {
//       id: 1,
//       name: "Tablet Samsung",                
//       imageUrl: './img/tablet_samsung.jpg',
//       quantity: 0,
//       price: 25
//   },
//   {
//       id: 2,
//       name: "TV LG UHD",                
//       imageUrl: "./img/tv.jfif",
//       quantity: 0,
//       price: 50
//   },
//   {
//       id: 3,
//       name: "Auriculares Genericos",                
//       imageUrl: "./img/auri.jfif",
//       quantity: 0,
//       price: 100
//   },
//   {
//       id: 4,
//       name: "Dualshock PS4",                
//       imageUrl: "./img/dualshock4.jpg",
//       quantity: 0,
//       price: 35
//   },
//   {
//       id: 5,
//       name: "Teclado LED",                
//       imageUrl: "./img/teclado.jpg",
//       quantity: 0,
//       price: 75
//   },
//   {
//       id: 6,
//       name: "Samsung Galaxy A54",                
//       imageUrl: "./img/a54_samsung.png",
//       quantity: 0,
//       price: 150
//   },
//   {
//       id: 7,
//       name: "Dualshock PS5",
//       imageUrl: "./img/dualshock5.jpg",
//       quantity: 0,
//       price: 250
//   },
//   {
//       id: 8,                
//       name: "Samsung A54",
//       imageUrl: "./img/a54_samsung.jpg",
//       quantity: 0,
//       price: 250
//   },

//   {
//     id: 9,                
//     name: "Samsung A54",
//     imageUrl: "./img/a54_samsung.jpg",
//     quantity: 0,
//     price: 250
// },
//   {
//       id: 10,
//       name: "Mouse Microsoft",
//       imageUrl: "./img/mouse.png",
//       quantity: 0,
//       price: 2500
//   },
//   {
//     id:11,
//     name:"Módem Router - Archer VR400",
//     imageUrl: "./img/router_archerVR400.jpg",
//     quantity: 0,
//     price: 75,
//   }

// ];

export interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}


//Interfaces para serializar las json de la API
export interface StoreAPI{
 products: ProductAPI[],
 taxPorcentage: number
}
export interface ProductAPI {
  uuid: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;  
  description: string  
}

export interface CartShopAPI {
  allProduct: ProductAPI[];
  subtotal: number;
  tax: number;
  total: number;
  direction: string; 
  paymentMethod: PaymentMethod
}
// export interface PaymentMethodAPI {
//   payment: PaymentMethodNumber;
//   verify: boolean;
// }

// export enum PaymentMethodNumberAPI {
//   CASH = 1,
//   CREDIT_CARD = 2,
//   DEBIT_CARD = 3,
//   SINPE = 4
// }

export interface CartShopItem {
  allProduct: ProductItem[];
  subtotal: number;
  tax: number;
  total: number;
  direction: string; 
  paymentMethod: PaymentMethod
}


export enum PaymentMethodNumber {
  CASH = 1,
  CREDIT_CARD = 2,
  DEBIT_CARD = 3,
  SINPE = 4  
}

export interface PaymentMethod {
  payment: PaymentMethodNumber; // Usamos el enum PaymentMethods para definir los tipos de pago
  verify: boolean;
}

export const PaymentMethods: PaymentMethod[] = [
  {
    payment: PaymentMethodNumber.CASH,
    verify: false
  },
  {
    payment: PaymentMethodNumber.CREDIT_CARD,
    verify: true
  },
  {
    payment: PaymentMethodNumber.DEBIT_CARD,
    verify: true
  },
  {
    payment: PaymentMethodNumber.SINPE,
    verify: true
  }
];


interface ProductProps {
  product: ProductAPI;  
  myCartInStorage: CartShopAPI | null;
  setMyCartInStorage: React.Dispatch<React.SetStateAction<CartShopAPI | null>>;
}


//Galeria de Productos
export const Product: React.FC<ProductProps> = ({product,myCartInStorage,setMyCartInStorage}) => {

  //Antigua forma con ProductItem
  //const { uuid,name, imageUrl, price,quantity } = products;    

  let uuid = product.uuid;

  const buyItem = () => {    
    
    //como el objeto del carrito puede ser nulo, creamos una condicion para evitar estar haciendo
    //condiciones    
    if (myCartInStorage) {

      let indexInCart = verifyProductInCart(uuid,myCartInStorage.allProduct);      
      console.log("Indice actual del ultimo producto",indexInCart)
      addProductInCart(indexInCart,product,myCartInStorage,setMyCartInStorage,setCartShopStorage);      
      
    } else {
      console.log("El carro no existe");
    }
  };  
    
  return (
      <div className="product col-sm-4 row">
          <div hidden>{product.uuid}</div>
          <div className="row-sm-3"><img src={product.imageUrl}/></div>
          <p className="row-sm-3">{product.name}</p>
          <p className="row-sm-3">${product.price}</p>
          <p className="row-sm-3">{product.description}</p>
          <button className="row-sm-3" onClick={ () => buyItem() }>Comprar</button>          
      </div>
  );
}

interface CartShopProps {    
  myCartInStorage: CartShopAPI| null;
  setMyCartInStorage: React.Dispatch<React.SetStateAction<CartShopAPI | null>>;
}

//Carrito
export const CartShop: React.FC<CartShopProps> = ({myCartInStorage,setMyCartInStorage}) => {

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
              <div className="notify-cart">{myCartInStorage?.allProduct.length}</div>
          </div>                    
          <p className="col-sm-6">Mi carrito</p>                                                                   
          
      </a>  

      {/* Llamamos al carrito desde modal_cart.tsx 
      Le pasamos los useState al modal principal para mantener la referencia de todos los datos, en caso de usarlos
      */}
      <ModalCart 
        show={show}
        handleClose={handleClose}
        myCartInStorage={myCartInStorage}
        setMyCartInStorage={setMyCartInStorage}
      />                                                    
    </div>           
  );
}