import React, { useState } from 'react';
import PayMethod from "@/app/Pagos/page";

const AddAddress = () => {
    const [provincia, setProvincia] = useState('');
    const [distrito, setDistrito] = useState('');
    const [direccion, setDireccion] = useState('');
    const [showMethodPay, setShowMethodPay] = useState(false);
    const storedStoreP = localStorage.getItem('tienda');
    const memoryStore = JSON.parse(storedStoreP);

    const enviarForm = (eventoDeEnvio) => {
        eventoDeEnvio.preventDefault();
        const updatedCart = {
            ...memoryStore,
            carrito: {
                ...memoryStore.carrito,
                direccionEntrega: {
                    provincia,
                    distrito,
                    direccion
                }
            }
        };
        localStorage.setItem("tienda", JSON.stringify(updatedCart));
        setShowMethodPay(true);
    };

    return (
        showMethodPay ? <PayMethod /> :
            <div className="p-pago">
                <div className="data">
                    <h1>Agregar Dirección</h1>
                    <form onSubmit={enviarForm}>
                        <div className="form-group">
                            <label htmlFor="provincia">Provincia:</label>
                            <input type="text" className="form-control" id="provincia" placeholder="Ingrese su provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="distrito">Distrito:</label>
                            <input type="text" className="form-control" id="distrito" placeholder="Ingrese su distrito" value={distrito} onChange={(e) => setDistrito(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Dirección exacta:</label>
                            <input type="text" className="form-control" id="direccion" placeholder="Ingrese su dirección exacta" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Continuar
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default AddAddress;
