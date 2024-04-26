'use client';
import { useState } from 'react';

//Recursos
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../src/css/init_dashboard.css';

export default function(){

    const [saleLinesReport,setSaleLinesReport] = useState(false);
    const [productsReport,setproductsReport] = useState(false);
    const [closeButton,setCloseButton] = useState(false);//cuando se cierra el menu lateral es true


    const closeMenuV = () =>{



    }

    return(

        <div className="container-fluid">
            <div className="row">
                {/* Menú lateral - Columna 1 */}
                <header id="menu_v" className="menu_v col-sm-3 bg-dark text-light">
                    <div className="menu_v_logo">
                        <span>Nombre de la Tienda</span>                        
                    </div>
                    <nav className='menu_v_nav'>
                        <ul>
                            <button>Reportes de ventas</button>
                            <button>Productos</button>                            
                        </ul>
                    </nav>
                </header>

                <div className="col-sm-9">
                    <div className="row">
                        {/* Menú vertical - Columna 2 */}
                        <header id="menu_h" className="menu_h col-md-12 row bg-secondary text-light">
                            <button className="menu_h_close col-md-1">X</button>
                            <nav  className="menu_h_nav col-md-6">                                
                                <ul>
                                    <button>Notificaciones</button>
                                    <button>Mi usuario</button>
                                    <button>Salir</button>                                    
                                </ul>
                            </nav>
                        </header>

                        {/* Área principal - Columna 2*/}
                        <main id="principal" className="menu_p col-md-12 row bg-light">
                            <h2>Área Principal</h2>
                            <p>Contenido de la página principal</p>
                        </main>
                    </div>                    
                    
                </div>
            </div>
        </div>

    );
}