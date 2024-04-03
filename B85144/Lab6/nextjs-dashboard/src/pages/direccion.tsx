'use client';
import React, { useState, useEffect } from 'react';
import { getUserData, saveUserData } from "../store/store";
import { useRouter } from 'next/navigation'

export default function DirecciónEntrega() {
    const router = useRouter();
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

    useEffect(() => {
        const data = getUserData();
        setDatos(data);
    }, []);
    const [dirección, setDirección] = useState('');
    useEffect(() => {
        setDatos(previousState => {
            return { ...previousState, carrito: { ...previousState.carrito, direccionEntrega: dirección } }
        });
        const cantidadProductos = datos.productos.length;
        if (cantidadProductos > 0) {
            saveUserData(datos);
        }

    }, [dirección]);


    const continuarCompra = () => {
        router.push("/metodospago");
    }
    const cambioDirección = (evento) => {
        const value = evento.target.value;
        setDirección(value);
    };

    return (
        <div>
            <h2>Ingrese la dirección de su entrega</h2>
            <input
                type="text"
                value={dirección}
                onChange={cambioDirección}
                placeholder="Ingrese su dirección"
            />
            <button onClick={continuarCompra} disabled={!dirección}>
                Continuar Compra
            </button>
        </div>
    );
}