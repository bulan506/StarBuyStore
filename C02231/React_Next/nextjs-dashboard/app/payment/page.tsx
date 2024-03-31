'use client'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../ui/global.css';
import Link from 'next/link';

export default function PaymentPage() {
    const [address, setAddress] = useState('');
    const [paymentMethod, setpaymentMethod] = useState('');
    const [voucher, setVoucher] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [orderNum, setorderNum] = useState(Math.floor(Math.random() * 1500) + 1);


    const handleDeliveryAddressChange = (value: string) => {
        setAddress(value);
        setpaymentMethod('');
    };

    const handleVoucherChange = (value: string) => {
        setVoucher(value);
    };

    const handlePaymentMethodChange = (value: string) => {
        setpaymentMethod(value);
        setVoucher('');
        setConfirmation('');
    };


    const handleSubmit = () => {
        setConfirmation('Awaiting confirmation from the administrator');
        localStorage.setItem('cartItems', '');
        localStorage.setItem('count', '');
        setVoucher('');
        setorderNum(0);
        setAddress('');
    }

    return (
        <div>

            <header className="p-3 text-bg-dark">
                <div className="row" style={{ color: 'gray' }}>
                    <div className="col-sm-9">
                        <img src="Logo1.jpg" style={{ height: '75px', width: '200px', margin: '1.4rem' }} className="img-fluid" />
                    </div>

                    <div className="col-sm-3 d-flex justify-content-end align-items-center">
                        <Link href="/cart">
                            <button className="btn btn-dark"> Go Cart</button>
                        </Link>
                        <Link href="/">
                            <button className="btn btn-dark"> Go Home</button>
                        </Link>
                    </div>

                </div>
            </header>

            <div className='container'>
                <h2>Payment Page</h2>
                <div className="form-group">
                    <label htmlFor="direccionEntrega">Delivery address:</label>
                    <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={address}
                        onChange={(e) => handleDeliveryAddressChange(e.target.value)}
                    />
                </div>

                {address && (
                    <div className="form-group">
                        <label htmlFor="paymentMethod">Payment method:</label>
                        <select
                            id="paymentMethod"
                            className="form-control"
                            value={paymentMethod}
                            onChange={(e) => handlePaymentMethodChange(e.target.value)}
                        >
                            <option value="">Select a payment method:</option>
                            <option value="sinpe">Sinpe</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>
                )}

                {paymentMethod === 'cash' && (
                    <div>
                        <p>Order Num: {orderNum}</p>
                            <button className="btn btn-success" onClick={handleSubmit} >
                                Confirm Payment
                            </button>
                        <p>{confirmation}</p>
                    </div>
                )}
                    {paymentMethod === 'sinpe' && (
                    <div>
                        <p>Order Number: {orderNum}</p>
                        <p>Sinpe Number: +506 86920997</p>
                        <div className="form-group">
                            <label htmlFor="comprobante">Voucher:</label>
                            <input
                                type="text"
                                id="voucher"
                                className="form-control"
                                value={voucher}
                                onChange={(e) => handleVoucherChange(e.target.value)}
                            />
                        </div>
                        {voucher.length > 0 &&(
                        <button className="btn btn-success" onClick={handleSubmit} >
                            Confirm Payment
                        </button>
                        )}
                        <p>{confirmation}</p>
                    </div>
                )}
            </div>

            <footer style={{ backgroundColor: '#0D0E1D', color: 'white', position: 'fixed', bottom: '0', width: '100%' }}>
                <div className="text-center p-3">
                    <h5 className="text-light">Dev: Paula Chaves</h5>
                </div>
            </footer>
        </div>
    );
};
