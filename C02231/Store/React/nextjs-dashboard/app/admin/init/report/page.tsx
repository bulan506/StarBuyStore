'use client'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '/app/ui/global.css';
import Link from 'next/link';
import { Chart } from 'react-google-charts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function ReportPage() {

    const [selectedDay, setSelectedDay] = useState(new Date());
    const [weeklySalesData, setWeeklySalesData] = useState([['Day', 'Total']]);
    const [dailySalesData, setDailySalesData] = useState([['Day', 'Total']]);


    useEffect(() => {
        fetchData();
    }, [selectedDay]);


    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5207/api/Sale`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedDay)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const weeklyData = [['Week', 'Sales']];
            const dailyData = [['Day', 'Total']];
            for (const item of data.weeklySales) {
                weeklyData.push([item.day, item.total]);
            }
            for (const item of data.dailySales) {
                dailyData.push([item.purchaseDate, item.total]);
            }
            const dailySalesDataFormatted = data.dailySales.map(item => [item.purchaseDate, item.total]);
            setDailySalesData([['Day', 'Total'], ...dailySalesDataFormatted]);

            setWeeklySalesData(weeklyData);
            //setDailySalesData(dailyData);

            console.log("Datos de ventas semanales:", weeklySalesData);
            console.log("Datos de ventas diarias:", dailySalesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleDayChange = (selectedDay: Date | null) => {
        if (selectedDay !== null) {
            setSelectedDay(selectedDay);
        }
    };


    return (
        <div>
            <header className="p-3 text-bg-dark">
                <div className="row" style={{ color: 'gray' }}>
                    <div className="col-sm-3">
                        <h1 style={{ color: 'white' }}>Reports</h1>
                    </div>
                    <div className="col-sm-9 d-flex justify-content-end align-items-center">
                        <Link href="/admin/init">
                            <button className="btn btn-dark"> Go Back</button>
                        </Link>
                    </div>
                </div>
            </header>

            <div style={{ marginLeft: '50px' }}>
                <label style={{ margin: '10px' }}> Select a Day</label>
                <DatePicker
                    selected={selectedDay}
                    onChange={handleDayChange}
                    //  onKeyDown={(e) => e.preventDefault()}
                    renderInput={(params) => <input {...params} />}

                />
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div style={{ display: 'flex' }}>
                            <div>
                                <h2>Sales Chart</h2>
                                <Chart
                                    width={'1000px'}
                                    height={'300px'}
                                    chartType="Table"
                                    loader={<div>Loading Chart</div>}
                                    data={dailySalesData}
                                    options={{
                                        showRowNumber: true,
                                        cssClassNames: {
                                            tableRow: 'chart-row',
                                            headerRow: 'chart-header-row',
                                            tableCell: 'chart-cell',
                                            title: "Weekly Sales",
                                        },
                                        allowHtml: true, // Allows HTML content in cells
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h2>Weekly Sales Pie Chart</h2>
                        <Chart
                            //400px
                            width={'100%'}
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
