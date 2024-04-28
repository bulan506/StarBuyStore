'use client';
import { useEffect, useState } from 'react';

//Componentes
import Dropdown from 'react-bootstrap/Dropdown';
import { Chart } from "react-google-charts";


//Funciones
import { getRegisteredSalesFromAPI, sendDataAPI } from '@/app/src/api/get-post-api';

//Recursos
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./../../../src/css/sales_report.css"

import { RegisteredSaleAPI } from '@/app/src/models-data/RegisteredSale'

export default function SalesReport(){

    const [allRegisteredSales,setAllRegisteredSales] = useState<RegisteredSaleAPI[]>([]);
    const [eventKey, setEventKey] = useState<string | null>(null); // Asegúrate de definir eventKey correctamente
    const [eventDate, setEventDate] = useState<string | null>(null); // Asegúrate de definir eventKey correctamente
    const [tableData, setTableData] = useState<any[]>([])

    //Colocamos los tipos de datos
    //Donde la primera lista anidada son los nombres de columnas y sus tipos
    const defaultColName = ["Employee Name", { type: "date", label: "Start Date (Long)" }, { type: "date", label: "Start Date (Medium)" }, { type: "date", label: "Start Date (Short)" }];    
    // const tableData = [
    //     ["Id Venta","Codigo de Compra", "Subototal","Total","Direccion","Metodo de Pago","Fecha de compra"],
    //     ["Mike", new Date(2008, 1, 28, 0, 31, 26), new Date(2008, 1, 28, 0, 31, 26), new Date(2008, 1, 28, 0, 31, 26)],
    //     ["Bob", new Date(2007, 5, 1, 0), new Date(2007, 5, 1, 0), new Date(2007, 5, 1, 0)],
    //     ["Alice", new Date(2006, 7, 16), new Date(2006, 7, 16), new Date(2006, 7, 16)],
    // ];

    //Datos adicionales de Chart
    const tableOptions = {
        showRowNumber: true,
        page: 'enable',
        pageSize: 5
      };

    //Formatos para los datos tipo fecha:
    const formatters = [
        { type: "DateFormat" as const, column: 1, options: { formatType: "long" } },
        { type: "DateFormat" as const, column: 2, options: { formatType: "medium" } },
        { type: "DateFormat" as const, column: 3, options: { formatType: "short" } },
    ];
          
    //Reiniciamos los datos de la tabla
    function resetTableData(){
        setTableData(defaultColName);
    }
    
    const selectDropDownItem = async (eventKey: string | null)=>{                
        if (eventKey) {            
            setEventKey(eventKey);
            console.log("Event Key: " + eventKey);
        } else {
            console.log("Nada");
        }        
    };

    //Funcion base de todo
    const selectDateResetTable = (e: { target: { value: any; }; }) =>{
        var selectedDate = e.target.value;        
        console.log("Fecha Seleccionada: " + selectedDate)
        resetTableData();
        setEventDate(selectedDate);        
    }

    //Recibimos los datos cada que se detecte que cambio el valor seleccionado del input date
    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getRegisteredSalesFromAPI("https://localhost:7161/api/Sale", eventDate);
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
            //Setteamos los datos
            setTableData([...tableData,...allRegisteredSales])
        };    
        if (eventDate) fetchData();
    }, [eventDate]);

    return(                
        
        <section className="row">

            <div className="col-sm-8">
                <h4>Reporte de Ventas:</h4>            
                <div className="row">
                    <label style={{ fontWeight: 'bolder',padding: '1rem' }}>Seleccione una fecha en específico:</label>
                    <br />
                    <input type="date" onChange={selectDateResetTable} style={{ border: '1px solid black',padding: '1rem', width: '50%' }} />
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

                {/* <div>
                    <Chart
                        chartType="Table"
                        width="100%"
                        height="400px"
                        data={tableData}
                        options={tableOptions}
                        formatters={formatters}
                    />
                </div> */}
            </div>            

            <div className="col-sm-4">Hola</div>
        </section>
    );
}