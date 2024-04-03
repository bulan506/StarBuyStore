import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

export const Address = ({
  goToPage,
}) => {
  const [addressDelivery, setAddressDelivery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [store, setStore] = useState(() => {
    const storedStore = localStorage.getItem("tienda");
    return JSON.parse(storedStore); 
  });

  useEffect(() => {
    if (store && store.carrito.direccionEntrega) {
      setAddressDelivery(store.carrito.direccionEntrega);
    }
  }, [store]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(addressDelivery);

    const updatedStore = {
      ...store,
      carrito: {
        ...store.carrito,
        direccionEntrega: addressDelivery
      }
    };

    localStorage.setItem("tienda", JSON.stringify(updatedStore));
    setStore(updatedStore);
    console.log("Texto:", updatedStore.carrito.direccionEntrega);

    setTimeout(() => {
      console.log("Esta línea se ejecuta después de 3 segundos");
      goToPage(3);
      // Aquí puedes poner la línea de código que deseas ejecutar después de esperar unos segundos
    }, 3000);

    
  };  
  

  const isEmpty = addressDelivery.trim() === '';

  return (
    <>
      <div className='address'>
        <form onSubmit={handleSubmit}>
          <label>
            Direccion de Entrega:
            <input
              type="text"
              value={addressDelivery}
              onChange={(e) => setAddressDelivery(e.target.value)}
            />
          </label>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className='btn-cartPayment' disabled={isEmpty}>
            Continuar
          </button>
        </form>
      </div>
    </>
  );
};
