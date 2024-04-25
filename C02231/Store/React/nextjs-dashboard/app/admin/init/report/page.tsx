'use client'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '/app/ui/global.css';
import Link from 'next/link';
import { Chart } from 'react-google-charts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function ReportPage() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    
    const dailySalesData = [
        //Datos correspondientes al día seleccionado
    ];

    // Define static sales data with product information
    const salesData = [
        ['Datetime', 'Purchase Number', 'Price', 'Amount of Products', { role: 'annotation' }],
        [
            '2024-04-19 09:00:00',
            'P001',
            50,
            5,
            JSON.stringify([
                { name: 'Product A', quantity: 2 },
                { name: 'Product B', quantity: 3 },
            ]),
        ],
        [
            '2024-04-19 10:15:00',
            'P002',
            70,
            3,
            JSON.stringify([{ name: 'Product C', quantity: 3 }]),
        ],
        [
            '2024-04-19 11:30:00',
            'P003',
            60,
            4,
            JSON.stringify([{ name: 'Product D', quantity: 4 }]),
        ],
        [
            '2024-04-19 12:45:00',
            'P004',
            80,
            2,
            JSON.stringify([{ name: 'Product E', quantity: 2 }]),
        ],
        [
            '2024-04-19 14:00:00',
            'P005',
            90,
            6,
            JSON.stringify([{ name: 'Product F', quantity: 4 }, { name: 'Product G', quantity: 2 }]),
        ],
    ];

    // Define static data for weekly sales
    const weeklySalesData = [
        ['Week', 'Sales'],
        ['Day 1', 1000],
        ['Day 2', 1500],
        ['Day 3', 2000],
        ['Day 4', 1200],
        ['Day 5', 1200],
        ['Day 6', 1200],
        ['Day 7', 1200],
    ];


   
    const handleDayChange = (date: Date | null) => {
        if (date !== null) {
            setSelectedDate(date);
        }     // Cargar los datos correspondientes al nuevo día seleccionado
    };


    return (
        <div>
            <header className="p-3 text-bg-dark">
                <div className="row" style={{ color: 'gray' }}>
                    <div className="col-sm-3 d-flex justify-content-end align-items-center">
                        <Link href="/admin/init">
                            <button className="btn btn-dark"> Go Back</button>
                        </Link>
                    </div>
                </div>
            </header>

            <div style={{ marginLeft: '50px' }}>
                <h2>Seleccionar Fecha</h2>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDayChange}
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div style={{ display: 'flex' }}>
                            <div>
                                <h2>Sales Chart</h2>
                                <Chart
                                    width={'1000px'}
                                    height={'300px'}
                                    chartType="Table"
                                    loader={<div>Loading Chart</div>}
                                    data={salesData}
                                    options={{
                                        showRowNumber: true,
                                        cssClassNames: {
                                            tableRow: 'chart-row',
                                            headerRow: 'chart-header-row',
                                            tableCell: 'chart-cell',
                                        },
                                        allowHtml: true, // Allows HTML content in cells
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h2>Weekly Sales Pie Chart</h2>
                        <Chart
                            width={'400px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={weeklySalesData}
                            options={{
                                title: 'Weekly Sales',
                            }}
                        />
                    </div>
                </div>
            </div >


            <footer className='footer' style={{ position: 'fixed', bottom: '0', width: '100%', zIndex: '9999' }}>
                <div className="text-center p-3">
                    <h5 className="text-light"> Paula's Library</h5>
                </div>
            </footer>
        </div >
    );
}
