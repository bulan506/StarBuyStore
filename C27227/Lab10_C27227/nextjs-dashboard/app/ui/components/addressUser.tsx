import React, { useState } from 'react';
import '../styles/address.css';
import PaymentMethods from './payment_method';

const AddressForm = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const isValidAddress = (address) => {
    const minLength = 10
    return address.trim().length >= minLength;
  };

  const handleContinueBuy = (event) => {
    event.preventDefault();
    if (!isValidAddress(address)) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    } else {
      setShowPaymentMethod(true);
    }
  };

  return showPaymentMethod ? (
    <PaymentMethods />
  ) : (
    <form onSubmit={handleContinueBuy}>
      <div>Ingrese su dirección</div>
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="Ej: Calle 123, Ciudad, Estado, País"
      />
      <button type="submit">Enviar</button>
      {warning && <div className='alert'>Por favor, ingrese una dirección válida.</div>}
    </form>
  );
};

export default AddressForm;
