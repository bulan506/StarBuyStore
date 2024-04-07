'use client'

import { useEffect, useState } from "react";

const PaymentForm = ({ cart, setCart }: { cart: any, setCart: (cart: any) => void }) => {
    const [orderNumber, setOrderNumber] = useState('');
    const [progress, setProgress] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    enum PaymentMethod {
        EFECTIVO = 'Efectivo',
        SINPE = 'Sinpe'
    }
    useEffect(() => {
        setCart(cart => ({
            ...cart,
            carrito: {
                ...cart.carrito,
                metodoDePago: cart.carrito.metodoDePago ? cart.carrito.metodoDePago : PaymentMethod.EFECTIVO
            }
        }));
        setSelectedIndex((cart.carrito.metodoDePago === PaymentMethod.EFECTIVO) ? 0 : 1);
    }, []);

    function handleSelectPayment(event: any) {
        setSelectedIndex(event.target.selectedIndex);
        setCart(cart => ({
            ...cart,
            carrito: {
                ...cart.carrito,
                metodoDePago: event.target.selectedIndex === 0 ? PaymentMethod.EFECTIVO : PaymentMethod.SINPE
            },
            verificacion: true
        }));
    }

    function generateReceiptNumber() {
        const timestamp = Date.now().toString();
        const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        setOrderNumber(timestamp + randomNumber);
    }

    useEffect(() => {
        generateReceiptNumber();
    }, [])

    const increaseProgress = () => {
        if (progress < 100) {
            setProgress(progress + 10);
        }
    };

    const Efectivo = () => {
        return <div className="card effect-card w-75">
            <div className="card-body">
                <div className="d-grid w-100 justify-content-center">
                    <strong>Número de compra: {orderNumber}</strong>
                    <p className=""></p>
                    <em>Por favor, espere la confirmación de pago del admin</em>
                </div>
            </div>
        </div>
    }

    const Sinpe = () => {
        const [comprobante, setComprobante] = useState('');
    
        const handleComprobanteChange = (event) => {
            setComprobante(event.target.value);
        };
    
        return (
            <div className="card sinpe-card w-75">
                <div className="card-body">
                    <div className="d-grid w-100 justify-content-center">
                        <strong>Número de compra: {orderNumber}</strong>
                        <strong>Número para realizar el pago: +506 6270 6880</strong>
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Indique el comprobante"
                            value={comprobante}
                            onChange={handleComprobanteChange}
                            
                        />
                        <p className=""></p>
                        <em>Por favor, espere la confirmación del admin</em>
                    </div>
                </div>
            </div>
        );
    };
    

    return <div className="container">
        <div className="d-grid justify-content-center gap-4">
            <div className="container">
                <h3>Métodos de pago</h3>
                <div className="form-group">
                    <select className="form-control" onChange={handleSelectPayment} value={cart.carrito.metodoDePago}>
                        {cart.metodosDePago.map((method: any, index: number) => <option key={index}>{method}</option>)}
                    </select>
                </div>
            </div>
            {(selectedIndex === 0 ? <Efectivo /> : <Sinpe />)}
            <div className="progress">
                <div className="custom-progress">
                <div className="custom-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <button className="btn btn-primary" onClick={increaseProgress}>Incrementar progreso</button>
            </div>
        </div>
    </div>
}

export default PaymentForm;