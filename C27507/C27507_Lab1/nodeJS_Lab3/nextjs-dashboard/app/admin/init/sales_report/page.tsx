'use client';
import { useEffect, useState } from 'react';

//Componentes
import Dropdown from 'react-bootstrap/Dropdown';

//Funciones
import { getRegisteredSalesFromAPI, sendDataAPI } from '@/app/src/api/get-post-api';

//Recursos
import 'bootstrap/dist/css/bootstrap.min.css';

import { RegisteredSaleAPI } from '@/app/src/models-data/RegisteredSale'

export default function SalesReport(){

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
    );
}