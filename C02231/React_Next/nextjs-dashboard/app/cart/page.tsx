"use client";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'


const EjemploPage: React.FC = () => {
    const [car, setCar] = useState<any[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCar(carritoGuardado);
    }, []);

    useEffect(() => {
        const subtotalCalculado = car.reduce((total, item) => total + item.price, 0);
        setSubtotal(subtotalCalculado);

        const totalCalculado = car.reduce((total, item) => total + (item.price * 1.13), 0);
        setTotal(totalCalculado);
    }, [car]);

    return (
        <div style={{ backgroundColor: 'silver' }}>

            <header className="p-3 text-bg-dark">
                <div className="row" style={{ color: 'gray' }}>
                    <div className="col-sm-9">
                        <Link href="/">
                            <img src="Logo1.jpg" style={{ height: '75px', width: '200px', margin: '1.4rem' }} className="img-fluid" />
                        </Link>
                    </div>
                    <div className="col-sm-3 d-flex justify-content-end align-items-center">
                        <Link href="/">
                            <button className="btn btn-dark"> Go Home</button>
                        </Link>
                    </div>

                </div>
            </header>

            <div className='container'>
                <h2>Shopping cart</h2>

                <div className="row  my-3">
                    {car.map(item => (
                        <div key={item.id} className="col-sm-3 mb-4" >
                            <div className="card">
                                <img src={item.imageurl} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <div className="text-center">
                                        <h5 className="card-title my-3">{item.name}</h5>
                                        <p className="card-text my-3">{item.description}</p>
                                        <p className="card-text my-3">Price: ₡{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex flex-row-reverse bd-highlight">
                <div className="p-2 bd-highlight" style={{backgroundColor: 'white'}}>
                    <h2>Subtotal: ₡{subtotal}</h2>
                    <h2 className='my-3'>Impuesto: 13%</h2>
                    <h2 className='my-3'>Tax: ₡{total.toFixed(2)}</h2>
                    {car.length > 0 && (
                        <Link href="/payment">
                            <button className="btn btn-success" onClick={() => console.log('Compra realizada')}>Buy</button>
                        </Link>
                    )}
                </div>
            </div>
            <footer style={{ backgroundColor: '#0D0E1D', color: 'white'}}>
                <div className="text-center p-3">
                    <h5 className="text-light">Dev: Paula Chaves</h5>
                </div>
            </footer>
        </div>
    );
};

export default EjemploPage;