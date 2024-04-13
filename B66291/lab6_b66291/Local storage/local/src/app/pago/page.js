"use client"; 
import React from "react";
import "../../styles/pago.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../../components/Navbar';

const Pago = () => {
  const storedData = localStorage.getItem("tienda");
  const dataObject = JSON.parse(storedData);

  const agregarPago = (e) => {
    e.preventDefault();
    const pago = e.target.pago.value; 
    const updatedCart = {
      ...dataObject.cart,
      metodosPago: pago, 
      necesitaVerificacion: true,
    };
    const updatedDataObject = { ...dataObject, cart: updatedCart };
    localStorage.setItem("tienda", JSON.stringify(updatedDataObject));
    window.location.reload();
  };


  return (
    <article>
      <div>
        <Navbar size={dataObject.cart.productos.length}/>
      </div>
      <div className="form_pago">
        <form onSubmit={agregarPago}>
          <div className="form-check">
            <input
              type="radio"
              id="pago1"
              name="pago"
              value="Efectivo"
              className="form-check-input"
            />
            <label htmlFor="pago1" className="form-check-label">
              Efectivo
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="pago2"
              name="pago"
              value="Sinpe Movil"
              className="form-check-input"
            />
            <label htmlFor="pago2" className="form-check-label">
              Sinpe Movil
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Seleccionar tipo de pago
          </button>
        </form>
        <div className="cart_box">
        <a
          href="/detalle" 
          className="btn btn-info mt-3"
        >
          Continuar con la compra
        </a>
      </div>
      </div>
    </article>
  );
};

export default Pago;