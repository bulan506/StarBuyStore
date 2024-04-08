'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import '../ui/globals.css';

const PayPage: React.FC = () => {
    const [cart, setCart] = useState({
        productos: [],
        direccionEntrega: '',
        metodoPago: '',
        comprobante: '',
        confirmacion: '',
        numeroPago: 0,
        numeroCompra: 0,
        isCartEmpty: true
    });

    useEffect(() => {
        // Código para cargar el carrito desde localStorage al inicio
        let cartDataString = localStorage.getItem('cartData');
        if (cartDataString !== null) {
            let cartData = JSON.parse(cartDataString);
            const tieneProductosValidos = cartData && Array.isArray(cartData.productos) && cartData.productos.length > 0;
            if (tieneProductosValidos) {
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
            numeroPago: 71133894,
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
    const handleSubmit = async () => {
        const { direccionEntrega, metodoPago, comprobante, productos } = cart;

        if (direccionEntrega && metodoPago && (metodoPago === 'efectivo' || metodoPago === 'sinpe')) {
            const productIds = productos.map((producto: any) => String(producto.id));

            let paymentMethodValue = 0;
            if (metodoPago === 'sinpe') {
                paymentMethodValue = 1;
            }

            const dataToSend = {
                productIds: productIds,
                address: direccionEntrega,
                paymentMethod: paymentMethodValue
            };

            console.log('Data a enviar:', dataToSend);

            try {
                const response = await fetch('https://localhost:7043/api/Cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                if (response.ok) {
                    console.log('datos enviados correctamente')
                    setCart(prevCart => ({ ...prevCart, confirmacion: '¡Pago confirmado correctamente!' }));
                    localStorage.removeItem('cartData');
                    setCart({
                        productos: [],
                        direccionEntrega: '',
                        metodoPago: '',
                        comprobante: '',
                        confirmacion: '',
                        numeroPago: 0,
                        numeroCompra: Math.floor(Math.random() * 100000000),
                        isCartEmpty: true
                    });
                } else {
                    const errorResponseData = await response.json();
                    throw new Error(errorResponseData.message || 'Error al procesar el pago');
                }
            } catch (error) {
                console.error('Error al enviar datos de pago:', error);
                setCart(prevCart => ({ ...prevCart, confirmacion: 'Error al procesar el pago. Inténtalo de nuevo más tarde.' }));
            }
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
