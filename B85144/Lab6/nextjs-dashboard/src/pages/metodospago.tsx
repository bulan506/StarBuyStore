'use client';
import React, { useState, useEffect } from 'react';
import { getUserData, saveUserData } from "../store/store";

export default function MetodosDePago() {
    const [metodoPago, setMetodoPago] = useState('');
    const [comprobante, setComprobante] = useState('');
    const [numeroCompra, setNumeroCompra] = useState('');
        const [datos, setDatos] = useState({
        "productos": [],
        "carrito": [],
        "subtotal": 0,
        "totalimpuesto": 0,
        "total": 0,
        "direccionEntrega": "",
        "metodoDePago": "",
    });

    const selecionarMetodoPago = (evento) => {
        setMetodoPago(evento.target.value);
        generarNumeroCompra();
    };

    const generarNumeroCompra = () => {   
        const numero = Math.floor(Math.random() * 1000000);
        setNumeroCompra(numero);
    };

    const ingresecambios = (evento) => {
        setComprobante(evento.target.value);
    };

    const confirmarPago = () => {
        alert(`Se ha seleccionado el método de pago: ${metodoPago}\nNúmero de compra: ${numeroCompra}\nComprobante: ${comprobante}`);
        console.log(datos);
    };

    useEffect(() => {
        const data = getUserData();
        setDatos(data);
    }, []);
    
    useEffect(() => {
        setDatos(previousState => ({
          ...previousState,
          metodoDePago: metodoPago,  
        }));
        saveUserData(datos);
    }, [metodoPago]);


    return (
        <div>
            <h2>Seleccione su método de pago</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        value="Efectivo"
                        checked={metodoPago === 'Efectivo'}
                        onChange={selecionarMetodoPago}
                    />
                    Efectivo
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="Sinpe"
                        checked={metodoPago === 'Sinpe'}
                        onChange={selecionarMetodoPago}
                    />
                    Sinpe
                </label>
            </div>
            {metodoPago && (
                <div>
                    <p>Número de compra: {numeroCompra}</p>
                    {metodoPago === 'Sinpe' && (
                        <div>
                            <p>Número de cuenta: XXXX-XXXX-XXXX</p>
                            <textarea value={comprobante} onChange={ingresecambios} placeholder="Ingrese el comprobante" />
                        </div>
                    )}
                    <p>Por favor, espere la confirmación del administrador con respecto al pago.</p>
                    <button onClick={confirmarPago}>Confirmar Pago</button>
                </div>
            )}
        </div>
    );
}