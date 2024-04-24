'use client'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '/app/ui/global.css';
import Link from 'next/link';
import { Chart } from 'react-google-charts';

export default function ReportPage() {

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

    const handleLogin = async () => {


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


           

            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
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
                <div>
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

            <footer className='footer' style={{ position: 'fixed', bottom: '0', width: '100%', zIndex: '9999' }}>
                <div className="text-center p-3">
                    <h5 className="text-light"> Paula's Library</h5>
                </div>
            </footer>
        </div>
    );
}
