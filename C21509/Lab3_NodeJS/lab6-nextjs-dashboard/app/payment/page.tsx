"use client"
import React, { useState, useEffect } from 'react';
import { ProductItem } from '../layout'

const PurchasedItems = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentConfirmation, setPaymentConfirmation] = useState('');
  const [paymentReceipt, setPaymentReceipt] = useState('');
  const [cartProducts, setCartProducts] = useState([]);
  const [purchaseNumber, setPurchaseNumber] = useState('');
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  useEffect(() => {
    const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
    setCartProducts(savedCartProducts);
  }, []);

  const handleContinue = () => {
    if (deliveryAddress.trim() !== '') {
      setShowPaymentMethod(true);
    }
  };

  const generatePurchaseNumber = () => {
    // Genera un número de compra aleatorio
    return Math.floor(10000000 + Math.random() * 90000000);
  };

  const managePaymentMethodSelection = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const managePaymentConfirmation = () => {
    // Lógica para procesar el pago según el método seleccionado
    if (selectedPaymentMethod === 'Efectivo') {
      // Procesar pago en efectivo
      const purchaseNum = generatePurchaseNumber();
      setPaymentConfirmation(`Su compra ha sido confirmada. El número de compra es: ${purchaseNum}. Espere la confirmación del administrador.`);
      setPurchaseNumber(purchaseNum.toString());
    } else if (selectedPaymentMethod === 'Sinpe') {
      // Procesar pago con Sinpe
      const purchaseNum = generatePurchaseNumber();
      setPaymentConfirmation(`Por favor realice el pago a la cuenta indicada. El número de teléfono al cual depositar es: ${purchaseNum}. Una vez realizado, ingrese el comprobante y espere la confirmación del administrador.`);
      setPurchaseNumber(purchaseNum.toString());
    }
  };

  return (
    <div>
      <h1>Procesar Compra</h1>

      <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Ingrese la dirección de entrega" />
      <button onClick={handleContinue} disabled={!deliveryAddress} className="button">Continuar</button>

      {showPaymentMethod && (
        <div>
          <h2>Seleccione el método de pago:</h2>
          <button onClick={() => managePaymentMethodSelection('Efectivo')} className="button">Efectivo</button>
          <button onClick={() => managePaymentMethodSelection('Sinpe')} className="button">Sinpe</button>
        </div>
      )}
      {/* Confirmación de pago */}
      {selectedPaymentMethod && (
        <div>
          <h2>Confirmación de Pago</h2>
          <p>Método de Pago: {selectedPaymentMethod}</p>
          <button onClick={managePaymentConfirmation} className="button">Confirmar Pago</button>
          {paymentConfirmation && <p>{paymentConfirmation}</p>}
          {paymentReceipt && <p>Adjunte el comprobante: {paymentReceipt}</p>}
          {purchaseNumber && <p>Número de Compra: {purchaseNumber}</p>}

          {/* Funcionalidad adicional para el método de pago Sinpe */}
          {selectedPaymentMethod === 'Sinpe'  && paymentConfirmation && (
            <div>
              <p>Número donde realizar el pago: {generatePurchaseNumber()}</p>
              <p>Ingrese el número de comprobante:</p>
              <input type="text" value={paymentReceipt} onChange={(e) => setPaymentReceipt(e.target.value)} placeholder="Ingrese el comprobante" />
              <p>Una vez realizado el pago, espere la confirmación del administrador.</p>
            </div>
          )}
        </div>
      )}

      {/* Mostrar productos del carrito */}
      <div>
        <h2>Productos en el Carrito</h2>
        <ul>
          {cartProducts.map((product: ProductItem) => (
            <li key={product.id}>
              <p>{product.name}</p>
              <p>Precio: ${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PurchasedItems;
