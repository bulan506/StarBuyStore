"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import React, { useState, useEffect } from 'react';
import "@/app/ui/styles.css";
import AddAddress from "@/app/Address/page";

const Carrito = () => {
    const storedStoreP = localStorage.getItem('tienda');
    const memoryStore = JSON.parse(storedStoreP);

    const [subtotal, setSubtotal] = useState(0);
    const [subtotalImpuesto, setSubtotalImpuesto] = useState(0);
    const [totalCompra, setTotalCompra] = useState(0);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [cartUpdated, setCartUpdated] = useState(false); // State to trigger update
    

    const handlePrice = () => {
        let subtotalCalc = 0;
        memoryStore.productos.forEach((item) => {
          subtotalCalc += item.price;
        });
      
        const subtotalImpuestoCalc = subtotalCalc * (memoryStore.carrito.porcentajeImpuesto / 100);
        const totalCompraCalc = subtotalCalc + subtotalImpuestoCalc;
      
        setSubtotal(subtotalCalc);
        setSubtotalImpuesto(subtotalImpuestoCalc);
        setTotalCompra(totalCompraCalc);
        updateStore(subtotalCalc, subtotalImpuestoCalc); 

      };
      
      
    const handlePayment = () => {
        setShowAddAddress(true);
    };

    const handleRemove = (id) => {
        const updatedProducts = memoryStore.productos.filter((item) => item.id !== id);
        const updatedStore = { ...memoryStore, productos: updatedProducts };
        localStorage.setItem("tienda", JSON.stringify(updatedStore));
        setCartUpdated(!cartUpdated); 
    };
    const updateStore = (subtotalCalc, subtotalImpuestoCalc) => {
        const updatedStore = { 
          ...memoryStore, 
          carrito: {
            ...memoryStore.carrito,
            subtotal: subtotalCalc,
            total: subtotalCalc + subtotalImpuestoCalc,
          },
        };
        localStorage.setItem("tienda", JSON.stringify(updatedStore));
    };

    useEffect(() => {
        handlePrice();
    }, [cartUpdated]); 

    if (!(memoryStore.productos.length>0)){
        return (
            <div className='total'>
                <span >Tu carrito está vacío</span>
            </div>
        );
    }

    return (
        showAddAddress ? <AddAddress /> : <div className='Compra'>
            {
                memoryStore.productos?.map((item) => (
                    <div className="cart_box" key={item.id}>
                        <div className="cart_img">
                            <img src={item.imageURL} alt={item.name} />
                            <div className='data-prod'>
                                <h5>{item.name}</h5>
                                <p>{item.description}</p>
                            </div>
                        </div>
                        <div className='price-del'>
                            <span>₡ {item.price} colones</span>
                            <button onClick={() => handleRemove(item.id)} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            <div className='total'>
                <div>
                    <h3>Subtotal sin impuesto:</h3>
                    <span>₡ {subtotal.toFixed(2)} colones</span>
                </div>
                <div>
                    <h3>Subtotal con impuesto (13%):</h3>
                    <span>₡ {subtotalImpuesto.toFixed(2)} colones</span>
                </div>
                <div>
                    <h3>Total de la compra:</h3>
                    <span>₡ {totalCompra.toFixed(2)} colones</span>
                </div>
                <button className="btn btn-primary" onClick={handlePayment} disabled={showAddAddress} >Pagar</button>
            </div>
        </div>
    );
};

export default Carrito;