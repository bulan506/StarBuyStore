'use client';
import { useEffect, useState } from 'react';

//Componentes
import Dropdown from 'react-bootstrap/Dropdown';

//Funciones
import { getRegisteredSalesFromAPI, sendDataAPI } from '@/app/src/api/get-post-api';

//Recursos
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../src/css/init_dashboard.css';
import { RegisteredSaleAPI } from '@/app/src/models-data/RegisteredSale';



export default function(){

    const [saleLinesReport,setSaleLinesReport] = useState(false);
    const [productsReport,setproductsReport] = useState(false);
    const [closeButton,setCloseButton] = useState(false);//cuando se cierra el menu lateral es true

    const [allRegisteredSales,setAllRegisteredSales] = useState<RegisteredSaleAPI[]>([]);
    const [eventKey, setEventKey] = useState<string | null>(null); // Asegúrate de definir eventKey correctamente

        
    
    const selectDropDownItem = async (eventKey: string | null)=>{        
        // if(eventKey){
        //     switch (eventKey) {
        //         case "1":        
        //             console.log("Valor: " + eventKey)
        //             break;
        //         case "2":
        //             console.log("Valor: " + eventKey)
        //             break;
        //         case "3":
        //             console.log("Valor: " + eventKey)
        //             break;            
        //         default:
        //             console.log("Valor: " + eventKey)
        //             break;
        //     }        
        // }else{
        //     console.log("Naad");
        // }
        if (eventKey) {
            setEventKey(eventKey); // Actualiza el estado de eventKey al seleccionar un elemento del menú desplegable
            console.log("Event Key: " + eventKey);
        } else {
            console.log("Nada");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getRegisteredSalesFromAPI("https://localhost:7161/api/Sale", eventKey);
                // Manejar los tipos de datos que se pueden recibir desde getRegisteredSalesFromAPI()
                if (typeof salesData === "string") {                
                    console.error("Es un string:", salesData);
                } else if (Array.isArray(salesData)) {                
                    console.log("Es un objeto/array:", salesData);
                    setAllRegisteredSales(salesData);

                    allRegisteredSales.forEach((sale: any, index: number) => {
                        console.log(`Venta ${index + 1}:`);
                        console.log("IdSale:", sale.idSale);
                        console.log("PurchaseNum:", sale.purchaseNum);
                        console.log("SubTotal:", sale.subTotal);
                    
                    });            
                } else {                
                    console.log("No hay datos de ventas disponibles");
                }
            } catch (error) {
                console.error("Error al obtener datos de ventas:", error);
            }
        };
    
        if (eventKey) {
            fetchData();
        }
    }, [eventKey]);
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

                            <section>
                                <h4>Lista de productos:</h4>

                                <div>

                                    <Dropdown onSelect={selectDropDownItem}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Reporte de Ventas:
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="1">Hoy</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">Ultima Semana</Dropdown.Item>
                                            <Dropdown.Item eventKey="3">Ultimo Mes</Dropdown.Item>
                                            <Dropdown.Item eventKey="4">Calendar</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>                                

                                <div>
                                {allRegisteredSales && allRegisteredSales.length > 0 ? (
                                    allRegisteredSales.map(sale => (
                                    <div key={sale.idSale}>
                                        <p>Id de Venta: {sale.idSale}</p>
                                        <p>Número de Compra: {sale.purchaseNum}</p>
                                        <p>Subtotal: {sale.subTotal}</p>
                                        {/* Agrega aquí más elementos según los datos de RegisteredSaleAPI */}
                                    </div>
                                    ))
                                ) : (
                                    <p>No hay datos de ventas disponibles</p>
                                )}
                                </div>
                            </section>
                            
                        </main>
                    </div>                    
                    
                </div>
            </div>
        </div>

    );
}

function getSalesFromAPI(arg0: string, eventKey: string | null) {
    throw new Error('Function not implemented.');
}
