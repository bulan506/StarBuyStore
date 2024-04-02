import React, { useState } from 'react';
import '../styles/paymentMethods.css';

const PaymentMethods = () => {

  const tiendaEnLocalStorage = localStorage.getItem('tienda');
  const datosTienda = JSON.parse(tiendaEnLocalStorage);  

  const [purchaseNumber, setPurchaseNumber] = useState(null);
  const [paymentCode, setPaymentCode] = useState('');
  const [confirmationPurchase, setConfirmationPurchase] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleMethodChange = (event) => {
    const newPurchaseNumber = Math.floor(Math.random() * 1000000);
    setPurchaseNumber(newPurchaseNumber);

    if (event.target.value) {
      const newp = {
        ...datosTienda,
        cart: {
          ...datosTienda.cart,
          metodoPago: event.target.value
        },
        necesitaVerifica: true,
        idCompra: newPurchaseNumber
      };
      localStorage.setItem("tienda", JSON.stringify(newp));
    }
  };

  const handlePaymentCodeChange = (event) => {
    setPaymentCode(event.target.value);
  };

  const handlePaymentMethod = () => {
    if (!datosTienda.cart.metodoPago) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    } else {
      setConfirmationPurchase(true);
    }
  };

  const pagoEfectivo = () => {
    return (
      <div className="payment-info">
        <p className="payment-info-title">Detalles de Pago:</p>
        <p>Número de compra: {purchaseNumber}</p>
        <p>Espere la confirmación del administrador con respecto al pago.</p>
      </div>
    );
  };

  const pagoSinpe = () => {
    return (
      <div className="payment-info">
        <p className="payment-info-title">Detalles de Pago:</p>
        <p>Número de compra: {purchaseNumber}</p>
        <p>Número de cuenta: 1234-5678-9012</p>
        <input type="text" value={paymentCode} onChange={handlePaymentCodeChange} className="payment-code-input" placeholder="Ingrese el comprobante" />
        <p>Espere la confirmación del administrador con respecto al pago.</p>
      </div>
    );
  };

  return (
    <div>
      {confirmationPurchase ? (
        datosTienda.cart.metodoPago === 'cash' ? pagoEfectivo() : datosTienda.cart.metodoPago === 'sinpe' ? pagoSinpe() : null
      ) : (
        <fieldset className="payment-methods">
          <legend>Escoja el método de pago</legend>
          <div className="payment-method">
            <input type="radio" id="sinpe" name="paymentMethod" value="sinpe" checked={datosTienda.cart.metodoPago === 'sinpe'} onChange={handleMethodChange} />
            <label htmlFor="sinpe">Sinpe</label>
          </div>
          <div className="payment-method">
            <input type="radio" id="cash" name="paymentMethod" value="cash" checked={datosTienda.cart.metodoPago === 'cash'} onChange={handleMethodChange} />
            <label htmlFor="cash">Efectivo</label>
          </div>
          <button className='BtnBuy' onClick={handlePaymentMethod}>Continuar compra</button>
        </fieldset>
      )}
      {warning && <div className='alert'>Por favor, seleccione un método de pago.</div>}
    </div>
  );
};

export default PaymentMethods;


