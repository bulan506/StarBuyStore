'use client';
import React, { useState, useEffect } from 'react';
import { getUserData, saveUserData } from "../store/store";
import "./css/metodopago.css";

export default function MetodosDePago() {
    const [metodoPago, setMetodoPago] = useState('');
    const [comprobante, setComprobante] = useState('');
    const [numeroCompra, setNumeroCompra] = useState('');
    const [compraMensaje, setcompraMensaje] = useState("");
    const [datos, setDatos] = useState({
        "productos":[],
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
        if(metodoPago=="Sinpe"){
            setcompraMensaje(`Se ha seleccionado el método de pago: ${metodoPago}\nNúmero de compra: ${numeroCompra}\nComprobante: ${comprobante}`);    
        }else{
            setcompraMensaje(`Se ha seleccionado el método de pago: ${metodoPago}\nNúmero de compra: ${numeroCompra}`);    
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
          if(datos.productos.length>0){
            saveUserData(datos);
            setcompraMensaje("");
        }
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
            <pre className='mensaje'>
                {compraMensaje}
            </pre>
        </div>
    );
}