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
const setCartShopStorage = (key: string, mockup: CartShopItem[]) => {
    const cartShopData = JSON.stringify(mockup);
    localStorage.setItem(key,cartShopData);
}

const getCartShopStorage = (key: string): CartShopItem | null => {
    const cartShopData = localStorage.getItem(key);
    if(cartShopData){
        return JSON.parse(cartShopData) as CartShopItem;
    }else{
        return null;
    }
}


export const setToLocalStorage = ({myProductsInStorage,setMyProductsInStorage}:{myProductsInStorage: ProductItem[], setMyProductsInStorage: React.Dispatch<React.SetStateAction<ProductItem[]>>}) => {
    //Guardar en LocalStorage      
    useEffect(() => {
        localStorage.setItem("myProductsInStorage",JSON.stringify(myProductsInStorage))
    },[myProductsInStorage]);
}
export const getFromLocalStorage = ({myProductsInStorage,setMyProductsInStorage}:{myProductsInStorage: ProductItem[], setMyProductsInStorage: React.Dispatch<React.SetStateAction<ProductItem[]>>}) => {    
      //Leer en LocalStorage      
    useEffect(() => {
        const productsFromStorage = JSON.parse(localStorage.getItem("myProductsInStorage") || "{}}");
        if (productsFromStorage !== null || productsFromStorage !== "{}") {
            setMyProductsInStorage(productsFromStorage);
        }        
    }, []);    
    return myProductsInStorage;
}


export default function Page() {       
    //State para los product del local, estos deben modificarse cada vez que pasa algo en la pagina
    const [myProductsInStorage, setMyProductsInStorage] = useState<ProductItem[]>([]);

    //Codigos para llamar datos
                 
    //Estado del numero del carrito
    const [numberOfItems,setNumberOfItems] = useState(0);
    
    //Estado de la lista del carrito
    const [allProduct, setAllProduct] = useState<ProductItem[]>([]);
    
    //Estado de los totales     
    const [totalWithTax,setTotalWithTax] = useState(0);  
    const [totalWithNoTax,setTotalWithNoTax] = useState(0); 

    //Settear datos


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