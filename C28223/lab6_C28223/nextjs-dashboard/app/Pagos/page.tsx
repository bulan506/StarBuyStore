import React, { useState } from 'react';

const PayMethod = () => {
    const [numOrden, setNumOrden] = useState('');
    const [metodo, setMetodo] = useState('');
    const [accepted, setAccepted] = useState(false);
    const storedStoreP = localStorage.getItem('tienda');
    const memoryStore = JSON.parse(storedStoreP);

    const generarIDCompra = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = '';
        for (let i = 0; i < 10; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setNumOrden(autoId)
        return autoId; 
    };

    const handleAceptar = () => {
        if (metodo.trim() === '') {
            alert('Por favor ingrese el tipo de método de pago.');
        } else {
            const newID = generarIDCompra(); 
            const updatedCart = {
                ...memoryStore,
                carrito: {
                    ...memoryStore.carrito,
                    metodoDePago: metodo
                    
                },
                idCompra: newID, 
                necesitaVerificacion:true
            };
            localStorage.setItem("tienda", JSON.stringify(updatedCart));
            setNumOrden(newID); 
            setAccepted(true);
        }
    };

    const pagoE = () => {
        return (
            <div className="Compra">
                <div className="smsFinal">
                    <div className="text-center">
                        <h5>Número de compra: {numOrden}</h5>
                        <h4>Esperando la confirmación del Administrador</h4>
                    </div>
                </div>
            </div>
        );
    };

    const pagoS = () => {
        return (
            <div className="Compra">
                <div className="smsFinal">
                    <div className="text-center">
                        <h5>Número de compra: {numOrden}</h5>
                        <h4>Número de SinpeMovil: +506 3875 8524</h4>
                        <input type="text" placeholder="Número de comprobante"></input>
                        <button className="btn btn-primary" onClick={handleAceptar}>Aceptar</button>
                        <h3>Esperando la confirmación del Administrador</h3>
                    </div>
                </div>
            </div>
        );
    };

    const handleMetodoChange = (pago) => {
        setMetodo(pago.target.value);
    };

    return (
        accepted ? (
            <div>
                {metodo === 'pagoEfectivo' ? pagoE() : metodo === 'pagoSinpe' ? pagoS() : <div className="cart-box"><h1>Ha ocurrido un error</h1></div>}
            </div>
        ) : (
            <div>
                <div className='metodoPago'>
                    <div className="centro">
                        <h1>Metodos de pago</h1>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="inlineCheckbox1" value="pagoEfectivo" onChange={handleMetodoChange} checked={metodo === 'pagoEfectivo'} />
                            <label className="form-check-label" htmlFor="inlineCheckbox1">En Efectivo</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="inlineCheckbox2" value="pagoSinpe" onChange={handleMetodoChange} checked={metodo === 'pagoSinpe'} />
                            <label className="form-check-label" htmlFor="inlineCheckbox2">SinpeMovil</label>
                        </div>
                        <button className="btn btn-primary" onClick={handleAceptar}>Aceptar</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default PayMethod;
