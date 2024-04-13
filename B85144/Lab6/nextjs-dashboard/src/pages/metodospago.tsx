'use client';
import React, { useState, useEffect } from 'react';
import { getUserData, saveUserData } from "../store/store";
import "./css/metodopago.css";

const MetodoPagoEnum = {
    EFECTIVO: 'Efectivo',
    SINPE: 'Sinpe'
};

export default function MetodosDePago() {
    const [metodoPago, setMetodoPago] = useState(MetodoPagoEnum.EFECTIVO); 
    const [comprobante, setComprobante] = useState('');
    const [numeroCompra, setNumeroCompra] = useState('');
    const [compraMensaje, setCompraMensaje] = useState("");
    const [datos, setDatos] = useState({
        "productos": [],
        "carrito": {
            "productos": [],
            "subtotal": 0,
            "porcentajeImpuesto": 13,
            "total": 0,
            "direccionEntrega": "",
            "metodosDePago": {}
        },
        "metodosDePago": [
            {
                "necesitaVerificacion": true
            }]
    });

    const seleccionarMetodoPago = (evento) => {
        setMetodoPago(evento.target.value);
        generarNumeroCompra();
    };

    const generarNumeroCompra = () => {
        const numero = Math.floor(Math.random() * 1000000);
        setNumeroCompra(numero);
    };

    const ingresarCambios = (evento) => {
        setComprobante(evento.target.value);
    };

    const confirmarPago = () => {
        if (metodoPago === MetodoPagoEnum.SINPE) {
            setCompraMensaje(`Se ha seleccionado el método de pago: ${metodoPago}\nNúmero de compra: ${numeroCompra}\nComprobante: ${comprobante}`);
        } else {
            setCompraMensaje(`Se ha seleccionado el método de pago: ${metodoPago}\nNúmero de compra: ${numeroCompra}`);
        }
        console.log(datos);
    };

    useEffect(() => {
        const data = getUserData();
        setDatos(data);
    }, []);

    useEffect(() => {
        setDatos(previousState => {
            return { ...previousState, carrito: { ...previousState.carrito, metodosDePago: metodoPago } }
        });
        const cantidadProductos=datos.productos.length;
        if (cantidadProductos > 0) {
            saveUserData(datos);
            setCompraMensaje("");
        }
    }, [metodoPago]);


    return (
        <div>
            <h2>Seleccione su método de pago</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        value={MetodoPagoEnum.EFECTIVO}
                        checked={metodoPago === MetodoPagoEnum.EFECTIVO}
                        onChange={seleccionarMetodoPago}
                    />
                    Efectivo
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value={MetodoPagoEnum.SINPE}
                        checked={metodoPago === MetodoPagoEnum.SINPE}
                        onChange={seleccionarMetodoPago}
                    />
                    Sinpe
                </label>
            </div>
            {metodoPago && (
                <div>
                    <p>Número de compra: {numeroCompra}</p>
                    {metodoPago === MetodoPagoEnum.SINPE && (
                        <div>
                            <p>Número de cuenta: XXXX-XXXX-XXXX</p>
                            <textarea value={comprobante} onChange={ingresarCambios} placeholder="Ingrese el comprobante" />
                        </div>
                    )}
                    <p>Por favor, espere la confirmación del administrador con respecto al pago.</p>
                    <button onClick={confirmarPago}>Confirmar Pago</button>
                </div>

            )}
            <pre className='mensaje'>
                {compraMensaje}
            </pre>
        </div>
    );
}