'use client'
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {useState} from 'react';
import { StaticCarousel, Product, product, CartShop } from './layout';
import { ProductItem } from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './demoCSS.css'
import './fonts_awesome/css/all.min.css'




export default function Page() {

    //Leer LocalStorage
    function getDataLocalStorage():number{  
        return 3
    }
    const itemsFromStorage : number = getDataLocalStorage();    


    //Estado del numero del carrito
    const [numberOfItems,setNumberOfItems] = useState(0);  


    //Estado de la lista del carrito
    const [allProduct, setAllProduct] = useState<ProductItem[]>([]);

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