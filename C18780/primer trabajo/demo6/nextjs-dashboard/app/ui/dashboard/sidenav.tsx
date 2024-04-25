import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links'; // componente que contiene los enlaces de navegación de la barra lateral
import Abacaxi from '@/app/ui/abacaxi-logo'; // muestra el logotipo de la aplicación
import { PowerIcon } from '@heroicons/react/24/outline'; // representa un icono de "power" para la opción de cerrar sesión
import "bootstrap/dist/css/bootstrap.min.css";
import '../../ui/styles/nav.css';

export default function SideNav({ countCart = 0 }: { countCart: number }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link href="/dashboard">
        <div>
          <Abacaxi />
        </div>
      </Link>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-search" viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </a>
          </li>

          <NavLinks countCart={countCart}/>
        </ul>
      </div>
    </nav>
  );
}
