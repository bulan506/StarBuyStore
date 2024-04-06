'use client'
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {useState} from 'react';
import {useEffect} from 'react';
import { StaticCarousel} from './carousel';
import {Product, product, CartShop } from './layout';
import { ProductItem,CartShopItem,PaymentMethod,PaymentMethods,PaymentMethodNumber  } from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './demoCSS.css'
import './fonts_awesome/css/all.min.css'
import { mock } from 'node:test';


//Calcular el total y manejarlo con stateUse para tenerlo en todos los componentes
export const totalPriceNoTax = (allProduct: { price: number; quantity: number; }[]) => {
    let total = 0;
    allProduct.map((item) => {                    
        total += ( item.price * item.quantity );
    });
    return total;
}
export const totalPriceTax = (allProduct: { price: number; quantity: number; }[]) => {
    let total = 0;
    allProduct.map((item) => {                                
        total += ((item.price * 0.13 + item.price) * item.quantity);
    });
    return total;
}

//Metodos del LocalStorage
    //Crear un nuevo carrito
export const setCartShopStorage = (key: string, mockup: CartShopItem | null) => {
    if(mockup !== null){
        //como no es nulo, se guarda en el localStorage
        const cartShopData = JSON.stringify(mockup);
        localStorage.setItem(key,cartShopData);
    }
}

    //Leemos lo que esta dentro del carrito o sea cartShopItem    
export const getCartShopStorage = (key: string): CartShopItem | null => {
        
    const cartShopData = localStorage.getItem(key);
    if(cartShopData !== null){
        return JSON.parse(cartShopData) as CartShopItem;        
    }else{

        const defaultPaymentMethod: PaymentMethod = {
            payment: PaymentMethodNumber.CASH,
            verify: false
        };

        let cart: CartShopItem = {  
            allProduct: [],
            subtotal: 0,
            tax: 0.13,
            total: 0,
            direction: "",
            // payment: "",
            // verify: false  
            paymentMethod: defaultPaymentMethod 

        };
        //guardamos el carrito en el storage y luego se lo retornamos al state myCartInStorage
        setCartShopStorage("A",cart);
        return cart;
    }
}

    //verficar si un producto ha sido agregado o no
export const verifyProductInCart = (id:number, allProductsInCart: ProductItem[]) => {

    for (let i = 0; i < allProductsInCart.length; i++) {
        let elementID = allProductsInCart[i].id;
        if(elementID === id){
            //rompemos el bucle y devolvemos la posicion
            return i;
        }        
    }
    //si no lo encuentra
    return -1;
}

    //agregar un producto al carrito (dependiendo si ya ha sido agregado antes)
export const addProductInCart = (index: number, product: ProductItem, myCartInStorage: CartShopItem, setMyCartInStorage: React.Dispatch<React.SetStateAction<CartShopItem | null>>, setCartShopStorage: (key: string, value: any) => void) => {
    
    //Una clonacion del carrito para sobreescribir de golpe en el antiguo y evitar
    //malas actualziaciones por la asincronia                    
    const cloneCart = { ...myCartInStorage };
    if(index === -1){        
        //Spread operator, aqui creamos una copia del producto y el resto del parametro son modificaciones a ese mismo producto
        cloneCart.allProduct.push({...product,quantity:1});                

    }else{
        //se aumenta en 1 la cantidad de ese producto
        cloneCart.allProduct[index].quantity += 1;        
    }
    //Se calculan los totales
    cloneCart.subtotal = totalPriceNoTax(cloneCart.allProduct);
    cloneCart.total = totalPriceTax(cloneCart.allProduct);        

    // actualizamos el estado del carrito
    setMyCartInStorage(cloneCart);
    //sobbreescrimos el carrito clonado sobre el original
    setCartShopStorage("A", cloneCart);          
}

 //Vaciar lista de productos - Local y la del Carrito
export const deleteAllProduct = (myCartInStorage: CartShopItem | null, setMyCartInStorage: React.Dispatch<React.SetStateAction<CartShopItem | null>>, setCartShopStorage: (key: string, value: any) => void) => {        
    if(myCartInStorage !== null){        
        //setteamos todo el carrito

        //Setteamos un metodo de pago por defecto
        const defaultPaymentMethod: PaymentMethod = {
            payment: PaymentMethodNumber.CASH, // Establecer el método de pago predeterminado
            verify: false // Establecer la verificación a falso o verdadero según corresponda
        };

        const newMockup: CartShopItem = {
            allProduct: [],
            subtotal: 0,
            tax: 0.13,
            total: 0,
            direction: '',
            // payment: '',
            // verify: false,
            paymentMethod: defaultPaymentMethod 
        };   
        //Limpiamos el storage y el estado actual
        setCartShopStorage("A",newMockup)         
        setMyCartInStorage(newMockup);
    }            
}

export default function Page() { 
    //Como El localstorage puede estar vacio o haberse borrado la key por muchas razones, creamos uno null. Luego lamamos
    //al localStorage para ver si existe alguna key que corresponda. Si esta existe, se sobreescribe el myCartInStorage, si no existe, seguimos
    //usando de manera normal el myCartIntorage. Ahi ya luego usamos la key que queramos con setCartShopStorage
    const [myCartInStorage, setMyCartInStorage] = useState<CartShopItem | null>(getCartShopStorage("A"));    
                                             
  return (
    <main className="flex min-h-screen flex-col p-6">

      {/* Menu con el carrito */}
      <div className="main_banner">    
            
            <div className="row">
                <div className="search_container col-sm-6">
                    <input type="search" name="name" placeholder="Busca cualquier cosa..."/>
                    <i className="fas fa-search"></i>                                  
                </div>
                
                <CartShop                     
                    myCartInStorage={myCartInStorage}  
                    setMyCartInStorage={setMyCartInStorage}                             
                />
            </div>            
      </div>  

      {/* Galeria de Productos */}
      <div>
            {/* El uso de las Keys es importante ya que le hacen saber a React cuando hay cambios en los elementos del proyecto
            Ademas, todas los componentes deben llevar una Key, es una buena practica
            */}
          <h1>Lista de Productos</h1>   
          <div id='div_gallery' className="row">
              {product.map(product => {
                  if (product.id === 8) {
                      return(
                          <section className="container_carousel col-sm-4" key="carousel">
                              <StaticCarousel />;
                          </section>
                      ) 
                  } else {
                      return (
                        <Product 
                            key={product.id} 
                            product={product}                        
                            myCartInStorage={myCartInStorage}                                    
                            setMyCartInStorage={setMyCartInStorage}           
                        />                        
                      );
                  }
              })}
          </div>
      </div>

      {/*  */}
      <footer>@ Derechos Reservados 2024</footer>
    </main>
  );
}