'use client'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Charts from '../../charts';
import Pie from '../../pie';
import MyCalendar from '../../calendar';
import { useEffect, useState } from 'react';
import { useFetchWeeklySales } from '@/app/api/http.reports';

export default function Reports() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weeklySales = useFetchWeeklySales(selectedDate);
  const data: (string | number)[][] = [
    ["Week", "Total"],
    ...weeklySales.map(({ date, total }) => [date, total])
  ];
  const handleOnDay = (selectedDay: Date) => {
    setSelectedDate(selectedDay);
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <MyCalendar onSelectDay={handleOnDay} />
          </div>
          <div className='col'>
            <h2>Venta por día</h2>
            <Charts />
          </div>
          <div className='col'>
            <h2>Venta por semana</h2>
            <Pie data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
