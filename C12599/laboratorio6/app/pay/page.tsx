'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import '../ui/globals.css';

const PayPage: React.FC = () => {
    const [cart, setCart] = useState({
        productos: [],
        subtotal: 0,
        porcentajeImpuesto: 0,
        total: 0,
        count: 0,
        direccionEntrega: '',
        metodoPago: '',
        comprobante: '',
        confirmacion: '',
        numeroPago: 0, 
        numeroCompra: 0, 
        isCartEmpty: true
    });

    useEffect(() => {
       let cartDataString = localStorage.getItem('cartData');
if (cartDataString !== null) {
    let cartData = JSON.parse(cartDataString);
    const TieneProductosValidos = cartData && Array.isArray(cartData.productos) && cartData.productos.length > 0;
    if (TieneProductosValidos) {
        setCart(cartData);
        setCart(prevCart => ({ ...prevCart, isCartEmpty: false }));
    } else {
        localStorage.removeItem('cartData');
        setCart(prevCart => ({ ...prevCart, isCartEmpty: true }));
    }
} else {
    setCart(prevCart => ({ ...prevCart, isCartEmpty: true }));
}
        setCart(prevCart => ({
            ...prevCart,
            numeroPago: Math.floor(Math.random() * 100000000),
            numeroCompra: Math.floor(Math.random() * 100000000)
        }));
    }, []);

    const handleDireccionEntregaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCart(prevCart => ({ ...prevCart, direccionEntrega: value }));
        updateLocalStorage({ ...cart, direccionEntrega: value });
    };
    
    const handleMetodoPagoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCart(prevCart => ({ ...prevCart, metodoPago: value }));
        updateLocalStorage({ ...cart, metodoPago: value });
    };
    
    const handleComprobanteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCart(prevCart => ({ ...prevCart, comprobante: value }));
        updateLocalStorage({ ...cart, comprobante: value });
    };

    
    const updateLocalStorage = (updatedCart: any) => {
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
    };

    const handleSubmit = () => {
        const CamposCompletos = cart.direccionEntrega && cart.metodoPago &&
            (cart.metodoPago === 'efectivo' || (cart.metodoPago === 'sinpe' && cart.comprobante));
        if (CamposCompletos) {
            const updatedCart = {
                ...cart,
                confirmacion: 'Esperando confirmación del administrador',
            };
            setCart(updatedCart);
            localStorage.setItem('cartData', '');
            setCart(prevCart => ({
                ...prevCart,
                comprobante: '',
                direccionEntrega: '',
            }));
        } else {
            setCart(prevCart => ({ ...prevCart, confirmacion: 'Por favor, complete todos los campos requeridos o agregue ítems al carrito.' }));
        }
    };

    return (
        <div>
            <h1>Pay Page</h1>
            {cart.isCartEmpty ? (
                <p>Su carrito está vacío. Por favor, agregue productos antes de proceder al pago.</p>
            ) : (
                <>
                    <div className="form-group">
                        <label htmlFor="direccionEntrega">Dirección de Entrega:</label>
                        <input
                            type="text"
                            id="direccionEntrega"
                            className="form-control"
                            value={cart.direccionEntrega}
                            onChange={handleDireccionEntregaChange}
                        />
                    </div>

                    {cart.direccionEntrega && (
                        <div className="form-group">
                            <label htmlFor="metodoPago">Método de Pago:</label>
                            <select
                                id="metodoPago"
                                className="form-control"
                                value={cart.metodoPago}
                                onChange={handleMetodoPagoChange}
                            >
                                <option value="">Seleccione un método de pago</option>
                                <option value="sinpe">Sinpe</option>
                                <option value="efectivo">Efectivo</option>
                            </select>
                        </div>
                    )}

                    {cart.metodoPago === 'sinpe' && (
                        <div>
                            <p>Número de Compra: {cart.numeroCompra}</p>
                            <p>Número de Pago: {cart.numeroPago}</p>
                            <div className="form-group">
                                <label htmlFor="comprobante">Comprobante:</label>
                                <input
                                    type="text"
                                    id="comprobante"
                                    className="form-control"
                                    value={cart.comprobante}
                                    onChange={handleComprobanteChange}
                                />
                            </div>
                        </div>
                    )}

                    {cart.metodoPago === 'efectivo' && (
                        <div>
                           <p>Número de Compra: {cart.numeroCompra}</p>
                        </div>
                    )}

                    <div className='my-4'>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Confirmar Pago
                        </button>
                        <p>{cart.confirmacion}</p>
                    </div>
                </>
            )}

            <div className='my-4'>
                <Link href="/">
                    <button className="btn btn-primary">
                        Volver a página Principal
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default PayPage;
