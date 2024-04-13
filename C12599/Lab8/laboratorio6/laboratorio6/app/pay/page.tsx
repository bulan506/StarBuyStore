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
        isCartEmpty: true
    });

    useEffect(() => {
        let cartDataString = localStorage.getItem('cartData');
        if (cartDataString !== null) {
            let cartData = JSON.parse(cartDataString);
            const tieneProductosValidos = cartData && Array.isArray(cartData.productos) && cartData.productos.length > 0;
            if (tieneProductosValidos) {
                setCart({ ...cartData, isCartEmpty: false });
            } else {
                localStorage.removeItem('cartData');
                setCart({ ...cart, isCartEmpty: true });
            }
        } else {
            setCart({ ...cart, isCartEmpty: true });
        }
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

    const updateLocalStorage = (updatedCart: any) => {
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
    };

    const handleSubmit = async () => {
        const { direccionEntrega, metodoPago, productos, total } = cart; 
        const esPedidoValido = direccionEntrega && metodoPago && (metodoPago === 'efectivo' || metodoPago === 'sinpe');

        if (esPedidoValido) {
            const productIds = productos.map((producto: any) => String(producto.id));

            let paymentMethodValue = 0;
            if (metodoPago === 'sinpe') {
                paymentMethodValue = 1;
            }

            const dataToSend = {
                productIds: productIds,
                address: direccionEntrega,
                paymentMethod: paymentMethodValue,
                total: total 
            };

            try {
                const response = await fetch('https://localhost:7043/api/Cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const { numeroCompra } = responseData; // Obtener el número de compra de la respuesta

                    // Actualizar el carrito en el estado y guardar en localStorage
                    setCart({
                        productos: [],
                        direccionEntrega: '',
                        metodoPago: '',
                        isCartEmpty: true,
                        numeroCompra: numeroCompra // Agregar el número de compra al estado del carrito
                    });

                    updateLocalStorage({
                        productos: [],
                        direccionEntrega: '',
                        metodoPago: '',
                        isCartEmpty: true,
                        numeroCompra: numeroCompra // Agregar el número de compra a cartData en localStorage
                    });
                } else {
                    const errorResponseData = await response.json();
                    throw new Error('Error al enviar datos de pago: ' + JSON.stringify(errorResponseData));
                }
            } catch (error) {
                console.error('Error al procesar el pago:', error);
            }
        } else {
            setCart(prevCart => ({ ...prevCart, confirmacion: 'Por favor, complete todos los campos requeridos o agregue ítems al carrito.' }));
        }
    };   return (
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
                </>
            )}

            <div className='my-4'>
                {cart.metodoPago === 'sinpe' && (
                    <Link href="/confirmacionSinpe">
                        <button className="btn btn-primary" onClick={handleSubmit}>Ir a Confirmación Sinpe</button>
                    </Link>
                )}
                {cart.metodoPago === 'efectivo' && (
                    <Link href="/confirmacionEfectivo">
                        <button className="btn btn-primary" onClick={handleSubmit}>Ir a Confirmación Efectivo</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default PayPage;