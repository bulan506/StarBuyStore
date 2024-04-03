"use client";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Importar los scripts de Bootstrap
import Link from 'next/link';
import { useRouter } from 'next/router';
import Overlay from 'react-bootstrap/Overlay';
interface Product {
    id: number;
    name: string;
    price: number;
}

interface PaymentMethod {
    name: string;
    requiresVerification: boolean;
}

interface Order {
    products: Product[];
    cart: {
        products: Product[];
        subtotal: number;
        taxPercentage: number;
        total: number;
        shippingAddress: string;
    };
    paymentMethod: PaymentMethod;
    paymentDetails?: {
        transactionNumber?: string;
        voucherNumber?: string;
    };
}

// Función para generar un número aleatorio en un rango específico
const randomNumberInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mock de datos
const mockOrder: Order = {
    products: [{ id: 1, name: "Product 1", price: 10 }, { id: 2, name: "Product 2", price: 20 }],
    cart: {
        products: [{ id: 1, name: "Product 1", price: 10 }, { id: 2, name: "Product 2", price: 20 }],
        subtotal: 30,
        taxPercentage: 13,
        total: 33.90,
        shippingAddress: "Calle Principal 123"
    },
    paymentMethod: { name: "Efectivo", requiresVerification: true },
    paymentDetails: {
        transactionNumber: randomNumberInRange(51234, 789065).toString()
    }
};


export default function Pago() {
    // Estado para controlar qué sección está habilitada
    const [seccionHabilitada, setSeccionHabilitada] = useState(false);
    const [seccionEfectivo, setSeccionEfectivo] = useState(false);
    const [seccionSinpe, setSeccionSinpe] = useState(false);
    const [seccionMessage, setSeccionMessage] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [mensaje, setMensaje] = useState(""); // Estado para el mensaje a mostrar

    // Función para manejar el clic en el botón Continuar
    const handleContinuarClick = () => {
        const direccionIngresada = document.getElementById('address')?.value.trim();
        if (direccionIngresada) {
            // Habilitar la sección de método de pago
            setSeccionHabilitada(true);
        } else {
            setShowOverlay(true);
            setMensaje("Por favor ingrese la dirección de envío.");
        }
    };

    // Función para manejar el clic en el botón Seleccionar método de pago
    const paymentMethod = () => {
        if (document.getElementById('opcion1')?.checked) {
            setSeccionEfectivo(true);
            setOrder({ ...mockOrder, paymentMethod: { name: "Efectivo", requiresVerification: true } });
        }
        if (document.getElementById('opcion2')?.checked) {
            setSeccionSinpe(true);
            setOrder({ ...mockOrder, paymentMethod: { name: "Sinpe", requiresVerification: false } });
        }
    };

    // Función para manejar el envío del formulario de pago
    const message = () => {
        const voucherInputElement = document.getElementById('voucher') as HTMLInputElement;
        const voucherNumber = voucherInputElement.value.trim();

        if (voucherNumber) {
            setSeccionMessage(true);
            setOrder((prevOrder: Order | null) => ({
                ...prevOrder!,
                paymentDetails: { ...prevOrder?.paymentDetails, voucherNumber }
            }));
        } else {
            setShowOverlay(true);
            setMensaje("Por favor ingrese el número de comprobante.");
        }

    };
    return (
        <div className='container'>
            <Link href={"/cart"}>
                <img src='https://cdn.pixabay.com/photo/2020/03/22/15/19/arrow-4957487_1280.png' style={{ height: "1cm" }} />
            </Link>
            <h2>Pago</h2>
            <form>
                <div className="form-group">
                    <h4>1. Ingrese su Dirección</h4>
                    <input type="text" className="form-control" id="address" style={{ width: "15cm" }} />
                </div>
                <a href="#MetodoPago">
                    <button type="button" style={{ backgroundColor: "black", color: "white" }} className="button" onClick={handleContinuarClick} id='btnAddress'>Continuar</button>
                </a>
            </form>
            <br></br>
            <section id="MetodoPago" style={{ display: seccionHabilitada ? 'block' : 'none' }}>
                <h4>2. Seleccione un método de Pago</h4>
                <div className='radio'><h6><input type="radio" name="optradio" id='opcion1' />Efectivo</h6></div>
                <div className='radio'><h6><input type="radio" name="optradio" id='opcion2' />Sinpe</h6></div>
                <button className='button' style={{ backgroundColor: "black", color: "white" }} onClick={paymentMethod}>Seleccionar</button>
            </section>
            <br></br>

            {seccionEfectivo && (
                <div>
                    <h4>3.Detalle de pago </h4>
                    <p>Número de compra: {order?.paymentDetails?.transactionNumber}</p>
                    <h6>Espere la confirmación del administrador</h6>
                </div>
            )}
            {seccionSinpe && (
                <div>
                    <h4>Detalle de pago </h4>
                    <h6>Número de compra: {order?.paymentDetails?.transactionNumber}</h6>
                    <h6>Número sinpe: 8976-3456</h6>
                    <input type="text" placeholder="Número de transacción" id='voucher' />
                    <br></br>
                    <button className='button' style={{ backgroundColor: "black", color: "white" }} onClick={message} id='btnVoucher'>Enviar</button>
                </div>
            )}
            {seccionMessage && (
                <div>
                    <h5>Espere la confirmación de un administrador</h5>
                </div>
            )}  
            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <p>{mensaje}</p>
                        <button onClick={() => setShowOverlay(false)} style={{ backgroundColor: "black", color: "white" }}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
