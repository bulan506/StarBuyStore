"use client";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'


export default function CartPage() {
    const [cart, setCar] = useState<any[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const itemsCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCar(itemsCart);
    }, []);

    useEffect(() => {
        const calculateSubtotal = cart.reduce((total, item) => total + item.price, 0);
        setSubtotal(calculateSubtotal);

        const totalCalculado = cart.reduce((total, item) => total + (item.price * 0.13), 0);
        setTotal(totalCalculado);
    }, [cart]);

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
                <h2 className='text-left mt-5 mb-5'>Shopping cart</h2>

                <div className="row  my-3">
                    {cart.map(item => (
                        <div key={item.id} className="col-sm-3 mb-4" >
                            <div className="card">
                                <img src={item.imageurl} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <div className="text-center">
                                        <h4 className="card-title my-3">{item.name}</h4>
                                        <p className="card-text my-3">{item.description}</p>
                                        <p className="card-text my-3">Price: ₡{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="d-flex justify-content-end" style={{ position: 'fixed', bottom: '70px', right: '10px', zIndex: '1000' }}>
                <div style={{ backgroundColor: 'white', margin: '100' }}>
                    <h2>Subtotal: ₡{subtotal}</h2>
                    <h2 className='my-3'>Tax: 13%</h2>
                    <h2 className='my-3'>Total: ₡{total.toFixed(2)}</h2>
                    {cart.length > 0 ? (
                        <Link href="/payment">
                            <button className="btn btn-success" style={{ display: 'flex', justifyContent: 'center' }} onClick={() => console.log('Compra realizada')}>Click to Buy</button>
                        </Link>
                    ) : (
                        <button className="btn btn-success" style={{ display: 'flex', justifyContent: 'center' }} disabled>Click to Buy</button>
                    )}
                </div>
            </div>
            <footer style={{  backgroundColor: '#0D0E1D', color: 'white' }}>
                <div className="text-center p-3">
                    <h5 className="text-light">Dev: Paula Chaves</h5>
                </div>
            </footer>
        </div>
    );
};

