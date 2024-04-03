import React, { useState, useEffect } from 'react';

export const Payment = () => {
    const [page, setPage] = useState(0);
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * (1000 - 1) + 1));
    const [store, setStore] = useState(() => {
        const storedStore = localStorage.getItem("tienda");
        return JSON.parse(storedStore) || { carrito: { metodoDePago: '' } }; 
    });

    useEffect(() => {
        setPage(store.carrito.metodoDePago === 'Efectivo' ? 0 : 1);
    }, []);

    const handleCheckboxChange = (pageNumber, metodoDePago) => {
        setPage(pageNumber);
        const updatedStore = {
            ...store,
            idCompra : randomNumber, 
            necesitaVerificacion: true,
            carrito: {
                ...store.carrito,
                metodoDePago: metodoDePago 

            },
            
        };
        localStorage.setItem("tienda", JSON.stringify(updatedStore));
        setStore(updatedStore);
    };

    return (
        <div className="center-content">
            <input
                type="checkbox"
                checked={page === 0}
                onChange={() => handleCheckboxChange(0, 'Efectivo')}
            /><label> Efectivo </label>

            <input
                type="checkbox"
                checked={page === 1}
                onChange={() => handleCheckboxChange(1, 'Sinpe')}
            /><label> Sinpe </label>

            {page === 0 ? (
                <>
                    <p>Efectivo</p>
                    <p>Numero de transacción: {randomNumber}</p>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <div className="center-content">
                            <h6>Esperando confirmación del Administrador</h6>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <p>Sinpe</p>
                    <p>Numero de transacción: {randomNumber}</p>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <div className="center-content">
                            <h6>Esperando confirmación del Administrador</h6>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
