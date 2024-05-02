import React from 'react'
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import "react-datepicker/dist/react-datepicker.css";
import { useHref } from 'react-router-dom';
import { ArcElement } from "chart.js";


function Reports() {

  const [weekDate, setweekDate] = useState(new Date());
  const [weekSaleData, setWeekSaleData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7280/api/Sale`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(weekDate)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (data != null) {
        const newData = Object.entries(data).map(([day, total]) => ({ day, total }));
        setWeekSaleData(newData);
      } else {
        throw new Error('Empty data received');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Config Pie Chart
  const data = {
    labels: weekSaleData.map(item => item.day),
    datasets: [{
      data: weekSaleData.map(item => item.total),
      backgroundColor: weekSaleData.map(() => randColor())
    }]
  };

  const opciones = {
    responsive: true
  }


  useEffect(() => {
    fetchData();
  }, [weekDate]);

  return (
    <div className="product-list-container">

      <h2>Reports</h2>
      Seleccionar Fecha:
      <DatePicker selected={weekDate} onChange={(date) => setweekDate(date)} />

      <div>
        <h6 className="centered">Ventas Diarias</h6>

        {weekSaleData.map((item, index) => (
          <div key={index}>
            <p>{item.day}: {item.total}</p>
          </div>
        ))}
      </div>

      <div className="chartContainer">
        <h6 className="centered">Ventas Semanales</h6>
        <Pie data={data} options={opciones} />
      </div>
    </div>


  )
}


function randColor() {
  const characters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }

  return color;
}

export default Reports