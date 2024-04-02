import React, { useState } from 'react';

const metodoPago = () => {
    const [showModal, setShowModal] = useState(false);
    const [formaDePago, setFormaDePago] = useState('');
    const [accepted, setAccepted] =useState(false);
    const memoryStore = JSON.parse(localStorage.getItem('tienda'));
    let numOrden='';

    const generarIDCompra = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = '';
        for (let i = 0; i < 10; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        numOrden=autoId;
        return autoId;
    };

    const handleAceptar = () => {
        if (formaDePago.trim() === '') {
            setShowModal(true);
        } else {
            const newID = generarIDCompra();
            const updatedCart = {
                ...memoryStore,
                carrito: {
                    ...memoryStore.carrito,
                    metodoDePago: formaDePago
                },
                idCompra: newID,
                necesitaVerificacion: true
            };
            localStorage.setItem("tienda", JSON.stringify(updatedCart));
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
                        <h4>Número de SinpeMóvil: +506 3875 8524</h4>
                        <input type="text" placeholder="Número de comprobante"></input>
                        <button className="btn btn-primary" onClick={handleAceptar}>Aceptar</button>
                        <h3>Esperando la confirmación del Administrador</h3>
                    </div>
                </div>
            </div>
        );
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const handleMetodoChange = (metodoDePagoSelec) => {
        setFormaDePago(metodoDePagoSelec.target.value);
    };

    return (
        accepted ? (
            <div>
                {formaDePago === 'pagoEfectivo' ? pagoE() : formaDePago === 'pagoSinpe' ? pagoS() : <div className="cart-box"><h1>Ha ocurrido un error</h1></div>}
            </div>
        ) : (

            <div>
                {showModal && <ModalSinMetodoPago closeModal={closeModal} />}
                <div className='metodoPago'>
                    <div className="centro">
                        <h1>Métodos de pago</h1>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="inlineCheckbox1" value="pagoEfectivo" onChange={handleMetodoChange} checked={formaDePago === 'pagoEfectivo'} />
                            <label className="form-check-label" htmlFor="inlineCheckbox1">En Efectivo</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="inlineCheckbox2" value="pagoSinpe" onChange={handleMetodoChange} checked={formaDePago === 'pagoSinpe'} />
                            <label className="form-check-label" htmlFor="inlineCheckbox2">SinpeMóvil</label>
                        </div>
                        <button className="btn btn-primary" onClick={handleAceptar}>Aceptar</button>
                    </div>
                </div>
            </div>
        )
    );
};

const ModalSinMetodoPago = ({ closeModal }) => {
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Método de pago</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Por favor seleccione un método de pago disponible.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default metodoPago;
