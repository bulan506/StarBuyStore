'use client'
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {useState} from 'react';
import {useEffect} from 'react';
//Componentes
import {Product,CartShop} from './layout';
import { StaticCarousel} from './carousel';
import {AlertShop} from './generic_overlay';
//Interfaces
import {CartShopAPI,ProductAPI,PaymentMethod,PaymentMethods,PaymentMethodNumber  } from './layout';
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
export const setCartShopStorage = (key: string, mockup: CartShopAPI | null) => {
    if(mockup !== null){
        //como no es nulo, se guarda en el localStorage
        const cartShopData = JSON.stringify(mockup);
        localStorage.setItem(key,cartShopData);
    }
}

    //Leemos lo que esta dentro del carrito o sea cartShopItem    
export const getCartShopStorage = (key: string): CartShopAPI | null => {
        
    const cartShopData = localStorage.getItem(key);
    if(cartShopData !== null){
        return JSON.parse(cartShopData) as CartShopAPI;        
    }

    const defaultPaymentMethod: PaymentMethod = {
        payment: PaymentMethodNumber.CASH,
        verify: false
    };

    let cart: CartShopAPI = {  
        allProduct: [],
        subtotal: 0,
        tax: 0.13,
        total: 0,
        direction: "",            
        paymentMethod: defaultPaymentMethod 

    };
    //guardamos el carrito en el storage y luego se lo retornamos al state myCartInStorage
    setCartShopStorage("A",cart);
    return cart;    
}

    //verficar si un producto ha sido agregado o no
export const verifyProductInCart = (id:string, allProductsInCart: ProductAPI[]) => {

    for (let i = 0; i < allProductsInCart.length; i++) {
        let elementID = allProductsInCart[i].uuid;
        let isSameID = elementID.localeCompare(id) === 0
        if( isSameID ){
            return i;
        }        
    }
    //si no lo encuentra
    return -1;
}

    //agregar un producto al carrito (dependiendo si ya ha sido agregado antes)
export const addProductInCart = (index: number, product: ProductAPI, myCartInStorage: CartShopAPI, setMyCartInStorage: React.Dispatch<React.SetStateAction<CartShopAPI | null>>, setCartShopStorage: (key: string, value: any) => void) => {
    
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
export const deleteAllProduct = (myCartInStorage: CartShopAPI | null, setMyCartInStorage: React.Dispatch<React.SetStateAction<CartShopAPI | null>>, setCartShopStorage: (key: string, value: any) => void) => {        
    if(myCartInStorage !== null){        
        
        //Setteamos un metodo de pago por defecto
        const defaultPaymentMethod: PaymentMethod = {
            payment: PaymentMethodNumber.CASH, // Establecer el método de pago predeterminado
            verify: false // Establecer la verificación a falso o verdadero según corresponda
        };

        //setteamos todo el carrito
        const newMockup: CartShopAPI = {
            allProduct: [],
            subtotal: 0,
            tax: 0.13,
            total: 0,
            direction: '',           
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
    const [myCartInStorage, setMyCartInStorage] = useState<CartShopAPI | null>(getCartShopStorage("A"));    
    const [products, setProducts] = useState<ProductAPI[]>([]);    
    //cargamos los datos desde la API (StoreController por Metodo Get)    
    // const loadDataProductAPI = async ()=>{
    //     try{
    //         console.log('Iniciando carga de datos desde la API...');
    //         const response = await fetch('https://localhost:7161/api/Store')
    //         if (!response.ok){
    //             throw new Error('Failed to fetch data');                
    //         }

    //         const json = await response.json();
    //         console.log('Datos recibidos desde la API:', json);

    //         setProducts(json.product);                        
    //         return json;
    //     } catch (error) {
    //         console.error('Error al cargar datos desde la API:', error);

    //         throw new Error('Failed to fetch data');
    //     }
    // }        
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             console.log('Comenzando la solicitud de datos...');

    //             await loadDataProductAPI(); // Esperar a que loadDataProductAPI() se resuelva
    //             console.log('Solicitud de datos completada correctamente.');

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);
      
    fetch('https://localhost:7161/api/Store')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        setProducts(data.products);
        //console.log("ora si, ",data.products);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
            

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
              {products && products.length >= 0 && products.map(product => {
                  if (product.description === "carousel") {
                      return(
                          <section className="container_carousel col-sm-4" key="carousel">
                              <StaticCarousel 
                                    key={product.uuid} 
                                    products={products}
                                    myCartInStorage={myCartInStorage}                                    
                                    setMyCartInStorage={setMyCartInStorage}           
                              />;
                          </section>
                      ) 
                  } else {
                      return (
                        <Product 
                            key={product.uuid} 
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