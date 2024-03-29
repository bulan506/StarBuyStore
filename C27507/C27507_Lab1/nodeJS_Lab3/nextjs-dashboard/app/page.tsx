'use client'
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {useState} from 'react';
import {useEffect} from 'react';
import { StaticCarousel, Product, product, CartShop } from './layout';
import { ProductItem,CartShopItem  } from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './demoCSS.css'
import './fonts_awesome/css/all.min.css'


//Calcular el total y manejarlo con stateUse para tenerlo en todos los componentes
export const totalPriceNoTax = (allProduct: { price: number; quantity: number; }[]) => {
    let total = 0;
    allProduct.map((item) => {            
        //total += (item.price * item.quantity);
        total += (item.price);
    });
    return total;
}
export const totalPriceTax = (allProduct: { price: number; quantity: number; }[]) => {
    let total = 0;
    allProduct.map((item) => {                        
        //total += ((item.price * item.quantity * 0.10) + (item.price * item.quantity));
        total += ((item.price * 0.10) + (item.price));
    });
    return total;
}

//Metodos del LocalStorage
    //Guardamos algo dentro del storage (si es nulo, no se hace nada)
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
        let cart: CartShopItem = {  
            allProduct: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            direction: "",
            payment: 0,
            verify: false  
        };
        //guardamos el carrito en el storage y luego se lo retornamos al state myCartInStorage
        setCartShopStorage("PPP",cart);
        return cart;
    }
}


export default function Page() { 
    //Como El localstorage puede estar vacio o haberse borrado la key por muchas razones, creamos uno null. Luego lamamos
    //al localStorage para ver si existe alguna key que corresponda. Si esta existe, se sobreescribe el myCartInStorage, si no existe, seguimos
    //usando de manera normal el myCartIntorage. Ahi ya luego usamos la key que queramos con setCartShopStorage


    //const [myCartInStorage, setMyCartInStorage] = useState<CartShopItem | null>(null);
    const [myCartInStorage, setMyCartInStorage] = useState<CartShopItem | null>(getCartShopStorage("A"));    
               
    //El carrito puede venir como nulo, por eso el ternario    
    const [numberOfItems, setNumberOfItems] = useState<number>(myCartInStorage ? myCartInStorage.allProduct.length : 0);    
    const [allProduct, setAllProduct] = useState<ProductItem[]>(myCartInStorage ? myCartInStorage.allProduct : []);    
    const [totalWithTax, setTotalWithTax] = useState<number>(myCartInStorage ? myCartInStorage.total : 0);  
    const [totalWithNoTax, setTotalWithNoTax] = useState<number>(myCartInStorage ? myCartInStorage.subtotal : 0); 
                        
    //Estado del numero del carrito
    // const [numberOfItems,setNumberOfItems] = useState(0);    
    
    //Estado de la lista de productos del carrito
    // const [allProduct, setAllProduct] = useState<ProductItem[]>([]);    
    
    //Estado de los totales     
    // const [totalWithTax,setTotalWithTax] = useState(0);  
    // const [totalWithNoTax,setTotalWithNoTax] = useState(0);     

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
                    numberOfItems={numberOfItems} 
                    setNumberOfItems={setNumberOfItems}                     
                    allProduct={allProduct}
                    setAllProduct={setAllProduct}
                    totalWithTax={totalWithTax}
                    setTotalWithTax={setTotalWithTax}
                    totalWithNoTax={totalWithNoTax}
                    setTotalWithNoTax={setTotalWithNoTax}
                    myCartInStorage={myCartInStorage}
                />;
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
                            numberOfItems={numberOfItems} 
                            setNumberOfItems={setNumberOfItems} 
                            allProduct={allProduct}
                            setAllProduct={setAllProduct}
                            totalWithTax={totalWithTax}
                            setTotalWithTax={setTotalWithTax}
                            totalWithNoTax={totalWithNoTax}
                            setTotalWithNoTax={setTotalWithNoTax}
                            myCartInStorage={myCartInStorage}
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