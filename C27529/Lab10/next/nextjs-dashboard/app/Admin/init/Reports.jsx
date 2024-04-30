/*import React from 'react'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Reports() {

  const [startDate, setStartDate] = useState(new Date());
  console.log("Mes"+startDate.getMonth()+1);
  console.log("Dia"+startDate.getDay());
  return (
    <div className="product-list-container">
      <h2>Reports</h2>
      Seleccionar Fecha: 
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      

    </div>

  )
}

export default Reports*/

import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Reports() {
  const [startDate, setStartDate] = useState(new Date());
  const [dailySales, setDailySales] = useState(null);

  useEffect(() => {
    // Función para obtener datos de ventas diarias desde la base de datos
    const fetchDailySales = async () => {
      try {
        // Hacer la solicitud al servidor para obtener los datos de ventas diarias
        const response = await fetch(`URL_DE_TU_API/daily-sales?date=${startDate.toISOString()}`);
        const data = await response.json();
        // Actualizar el estado con los datos de ventas diarias
        setDailySales(data);
      } catch (error) {
        console.error('Error al obtener datos de ventas diarias:', error);
      }
    };

    // Llamar a la función para obtener los datos de ventas diarias cuando cambie la fecha seleccionada
    fetchDailySales();
  }, [startDate]);

  return (
    <div className="product-list-container">
      <h2>Reports</h2>
      <p>Seleccionar Fecha:</p>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

      {dailySales && (
        <div>
          <h3>Ventas Diarias</h3>
          <p>{dailySales}</p> {/* Aquí debes formatear y mostrar los datos de ventas */}
        </div>
      )}
    </div>
  );
}

export default Reports;
