'use client';
import React, { useState, useEffect } from 'react';
import { getUserData, saveUserData } from "../store/store";
import { useRouter } from 'next/navigation'

export default function DirecciónEntrega() {
    const router = useRouter();
    const [datos, setDatos] = useState({
        "productos": [],
        "carrito": [],
        "subtotal": 0,
        "totalimpuesto": 0,
        "total": 0,
        "direccionEntrega": "",
        "metodoDePago": "",
    });

    useEffect(() => {
        const data = getUserData();
        setDatos(data);
    }, []);
    const [dirección, setDirección] = useState('');
    useEffect(() => {
        setDatos(previousState => ({
          ...previousState,
          direccionEntrega: dirección  
        }));
        saveUserData(datos);
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