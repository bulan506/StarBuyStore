import React, { useState, useEffect } from 'react';

export const Payment = () => {
    const [page, setPage] = useState(0);
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * (1000 - 1) + 1));
    const [store, setStore] = useState(() => {
        const storedStore = localStorage.getItem("tienda");
        return JSON.parse(storedStore) || { carrito: { metodoDePago: '' } };
    });
    


const productIds = store.productos.map(producto => producto.id.toString());

const data = {
    productIds: productIds,  // Cada ID de producto es un elemento del array
    address: store.carrito.direccionEntrega.toString(),
    paymentMethod: store.carrito.metodoDePago,
    total: store.carrito.total
};


    const postData = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            console.log(data.productIds);
            console.log(store.carrito.direccionEntrega);
            console.log(data.paymentMethod);
            console.log(data.total);
            const response = await fetch('https://localhost:7280/api/Cart', requestOptions);
            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            const json = await response.json();
            console.log('Data received:', json);
        } catch (error) {
            console.error('Failed to post data:', error);
        }
    };

    const handleCheckboxChange = (pageNumber, metodoDePago) => {
        setPage(pageNumber);
        const updatedStore = {
            ...store,
            idCompra: randomNumber,
            necesitaVerificacion: true,
            carrito: {
                ...store.carrito,
                metodoDePago: metodoDePago

            },

        };
        localStorage.setItem("tienda", JSON.stringify(updatedStore));
        setStore(updatedStore);
        postData();
    };

    useEffect(() => {
        setPage(store.carrito.metodoDePago === 'Efectivo' ? 0 : 1);
    }, []);


    return (
        <div className="center-content">
            <input
                type="checkbox"
                checked={page === 0}
                onChange={() => handleCheckboxChange(0, 0)}
            /><label> Efectivo </label>

            <input
                type="checkbox"
                checked={page === 1}
                onChange={() => handleCheckboxChange(1, 1)}
            /><label> Sinpe </label>

            {page === 0 ? (
                <>
                    <p>Efectivo</p>
                    <p>Número de transacción: {randomNumber}</p>
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
                    <p>Número de transacción: {randomNumber}</p>
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
