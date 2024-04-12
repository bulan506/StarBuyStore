"use client"; //Para utilizar el cliente en lugar del servidor
import { useEffect, useState } from 'react';
import "@/public/styles.css";
import Link from 'next/link';

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || { products: {} };
    const productIds = Object.keys(storedCart.products);
    setCartProducts(productIds);
    const storedAddress = localStorage.getItem('address') || '';
    setAddress(storedAddress);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedMethod', selectedMethod);
  }, [selectedMethod]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPaymentConfirmed(false);
  };

  const handleSinpePaymentConfirmation = () => {
    setPaymentConfirmed(true);
  };

  const handleConfirmation = () => {
    const send = async () => {

      let paymentMethodValue = 0;
      if (selectedMethod == 'Sinpe') {
        paymentMethodValue = 1;
      }

      const dataSend = {
        ProductIds: cartProducts,
        Address: address,
        PaymentMethod: paymentMethodValue
      };

      try {
        const response = await fetch('https://localhost:7067/api/Cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataSend)
        });

        console.log(dataSend);

        if (response.ok) {
          console.log('Data sended');
        } else {
          const errorResponseData = await response.json();
          throw new Error(errorResponseData.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    send();
  };


  return (
    <div>
      <div className="header">
        <Link href="/">
          <h1>Tienda</h1>
        </Link>
      </div>

      <div className="body">
        <h2>Payment Method</h2>
        <div>
          <button className="Button" onClick={() => handleMethodSelect('Cash')}>Cash</button>
          <button className="Button" onClick={() => handleMethodSelect('Sinpe')}>Sinpe</button>
        </div>
        {selectedMethod === 'Cash' && (
          <div>
            <p>Purchase number: 00000.</p>
            <p>Awaiting confirmation from the administrator regarding the payment.</p>
          </div>
        )}
        {selectedMethod === 'Sinpe' && (
          <div>
            <p>Purchase number: 00000.</p>
            <p>Make the payment through Sinpe to the number 8596-1362.</p>
            <input type="text" placeholder="Enter the receipt code here" />
            <button className="Button" onClick={handleSinpePaymentConfirmation}>Confirm</button>
            {paymentConfirmed && <p>Awaiting confirmation from the administrator regarding the payment.</p>}
          </div>
        )}
        <button className="Button" onClick={handleConfirmation}>Confirm Purchase</button>
      </div>

      <div className="footer">
        <h2>Tienda.com</h2>
      </div>
    </div>
  );
}