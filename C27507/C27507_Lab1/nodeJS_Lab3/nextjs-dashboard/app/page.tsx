import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { StaticCarousel, Product, product } from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './demoCSS.css'
import './fonts_awesome/css/all.min.css'
// at the top of your file add this import where you see most fit
// import Carousel  from "react-bootstrap/Carousel";




export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">

      {/* Menu con el carrito */}
      <div className="main_banner">    
            
        <div className="row">
            <div className="search_container col-sm-6">
                <input type="search" name="name" value="" placeholder="Busca cualquier cosa..."/>
                <i className="fas fa-search"></i>                                  
            </div>
            
            <div className="cart_container col-sm-6">
                <a href="">                        
                    <i className="fas fa-shopping-cart"></i>                    
                    <p className="col-sm-6">Mi carrito</p>                                                                   
                </a>                
            </div>                          
        </div>            
      </div>  
      
      <div>
          <h1>Lista de Productos</h1>   
          <div className="row">
              {product.map(product => {
                  if (product.id === 8) {
                      return(
                          <section className="container_carousel col-sm-4">
                              <StaticCarousel key="carousel" />;
                          </section>
                      ) 
                  } else {
                      return (
                          <Product product={product} />
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






// const App = () => {            
//   return (
//       <div>
//           <h1>Lista de Productos</h1>   
//           <div className="row">
//               {product.map(product => {
//                   if (product.id === 8) {
//                       return(
//                           <section className="container_carousel col-sm-4">
//                               <StaticCarousel key="carousel" />;
//                           </section>
//                       ) 
//                   } else {
//                       return (
//                           <Product product={product} />
//                       );
//                   }
//               })}
//           </div>
//       </div>
//   );
// };

