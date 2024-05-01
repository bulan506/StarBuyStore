'use client';
import { useEffect, useState } from 'react';

//Componentes
import Dropdown from 'react-bootstrap/Dropdown';
import { Chart } from "react-google-charts";//no se le pueden pasar useStates, solo listas de listas

//Funciones
import { getRegisteredSalesFromAPI, sendDataAPI } from '@/app/src/api/get-post-api';

//Recursos
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./../../../src/css/sales_report.css"

import { RegisteredSaleAPI } from '@/app/src/models-data/RegisteredSale'

export default function SalesReport(){

    const [allRegisteredSales,setAllRegisteredSales] = useState<RegisteredSaleAPI[]>([]);    
    const [eventDate, setEventDate] = useState<Date | null>(null); // Asegúrate de definir eventKey correctamente
    const [dataForTable, setDataForTable] = useState<any[]>([]);
    const [dataForPie, setDataForPie] = useState<any[]>([]);

    //Colocamos los tipos de datos
    //Donde la primera lista anidada son los nombres de columnas y sus tipos
    const defaultColName =
        ["Id Venta","Codigo de Compra", "Subtotal","Total","Direccion","Tax","Metodo de Pago","Fecha de compra"];
    
    //Datos adicionales de Chart
    const tableOptions = {
        showRowNumber: false,
        page: 'enable',
        pageSize: 5
      };

    //Formatos para los datos tipo fecha:
    const formatters = [
        { type: "DateFormat" as const, column: 1, options: { formatType: "long" } },
        { type: "DateFormat" as const, column: 2, options: { formatType: "medium" } },
        { type: "DateFormat" as const, column: 3, options: { formatType: "short" } },
    ];
          
    //Funcion base de todo
    const selectDateResetTable = (e: { target: { value: any; }; }) =>{
        var selectedDate = e.target.value;
        //var selectedDate = new Date(stringDate);
        //console.log("Tipo de dato de la fecha : " + typeof + selectedDate)
        console.log("Fecha Seleccionada: " + selectedDate)
        setEventDate(selectedDate);        
    }

    //Recibimos los datos cada que se detecte que cambio el valor seleccionado del input date
    useEffect(() => {
        const fetchData = async () => {
            try {
                const registeredSalesDataFromAPI = await getRegisteredSalesFromAPI("https://localhost:7161/api/Sale", eventDate);
                // Manejar los tipos de datos que se pueden recibir desde getRegisteredSalesFromAPI()
                if (typeof registeredSalesDataFromAPI === "string") {
                    console.error("Es un string:", registeredSalesDataFromAPI);                    
                }else if (Array.isArray(registeredSalesDataFromAPI)) {                    


                    const tableData = [
                        defaultColName, 
                        ...registeredSalesDataFromAPI.map((sale: any) => [
                            sale.idSale,
                            sale.purchaseNum,
                            sale.subTotal,
                            sale.total,                            
                            sale.direction,
                            sale.tax,
                            sale.paymentMethod.payment,
                            sale.dateTimeSale
                        ])
                    ];
                    setDataForTable(tableData);


                    //dataForTable.push(defaultColName);                    
                    // registeredSalesDataFromAPI.forEach((sale: any) => {
                    //     const saleList = Object.values(sale);
                    //     dataForTable.push(saleList);
                    // });                    
                    // dataForTable.forEach(row => {
                    //     console.log("Elemento de tableForData: " +row + "\n");
                    // });
                    // console.log("Que es dataForTable: " +dataForTable);

                    //Lo dejo para despues
                    //setAllRegisteredSales(registeredSalesDataFromAPI);                                        
                } else{
                    console.log("No hay datos de ventas disponibles");
                }
            } catch (error) {
                console.error("Error al obtener datos de ventas:", error);
            }            
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
                            <p>Id de Venta: {typeof sale.idSale}</p>
                            <p>Número de Compra: { typeof sale.purchaseNum}</p>
                            <p>Subtotal: {typeof sale.subTotal}</p>
                            <p>Total: { typeof sale.total}</p>
                            <p>Direcccion: {typeof sale.direction}</p>
                            <p>Metodo de pago: {typeof sale.paymentMethod.payment}</p>
                            <p>Fecha de compra: {typeof sale.dateTimeSale}</p>
                            {/* Agrega aquí más elementos según los datos de RegisteredSaleAPI */}
                        </div>
                        ))
                    ) : (
                        <p>No hay datos de ventas disponibles</p>
                    )}
                </div>

                <div>
                    <Chart
                        chartType="Table"
                        width="100%"
                        height="400px"
                        data={dataForTable}
                        options={tableOptions}                        
                    />
                </div>
            </div>            

            <div className="col-sm-4">Hola</div>
        </section>
    );
}