import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Interface } from 'readline';
import { Product, products } from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HTMLPageDemo.css'


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="header-container row">
        <div className="search-container col-sm-4">
          <input type="search" placeholder="Buscar" value="" /> 
          <img src="./img/Lupa.png" className="col-sm-4"/>
          <img src="./img/carrito.png"className="col-sm-4"/>
        </div>
      </header>

      <div>
          <h1>Lista de Productos</h1>
          <div className='row' style={{display: 'flex', flexWrap: 'wrap' }}>
            {products.map(product =>  
              <Product key={product.id} product={product}/>
            )}
          </div>
        </div>

      <footer className="footer-container">
      <p>Derechos reservados, 2024</p>
    </footer>
    </main>
  );
    
}
