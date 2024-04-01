"use client"
import React from "react";
import "../../styles/cart.css"
import "bootstrap/dist/css/bootstrap.min.css"; 
import Navbar from '../../components/Navbar';

const Cart = () => {

const storedData = localStorage.getItem('tienda');   
const dataObject = JSON.parse(storedData);  

const borrarProducto = (productId) => {
  const updatedProducts = dataObject.cart.productos.filter(product => product.id !== productId);
  const updatedCart = {
    ...dataObject.cart,
    productos: updatedProducts
  };

  
  const newSubtotal = updatedProducts.reduce((total, product) => total + product.precio, 0);
  
  const newTotal = newSubtotal * (1 + dataObject.impVentas / 100);

  const updatedCartWithTotals = {
    ...updatedCart,
    subtotal: newSubtotal,
    total: newTotal
  };

  const updatedDataObject = { ...dataObject, cart: updatedCartWithTotals };
  localStorage.setItem('tienda', JSON.stringify(updatedDataObject));
  
  window.location.reload(); 
};

const isCartEmpty = dataObject.cart.productos.length === 0; 
   
return (

  <article>
    <div>
        <Navbar size={dataObject.cart.productos.length}/>
    </div>
    {dataObject.cart.productos.map((item) => (
      <div className="cart_box" key={item.id}>
        <div className="cart_id">
          <span>{item.name}</span>
        </div>
        <div className="cart_description">
          <span>{item.description}</span>
        </div>
        <div className="cart_precio">
          <span>${item.precio}</span>
        </div>
        <div className="cart_image">
          <img
            src={item.imageUrl}
            alt="Product Image"
            style={{ height: '70px', width: '80%' }}
            className="imgProduct"
          />
        </div>
        <button
          className="btn btn-danger mt-3"
          onClick={() => borrarProducto(item.id)}
        >
          Eliminar producto
        </button>
      </div>
    ))}


    <div className="cart_box" style={{ flex: 1, justifyContent: 'flex-end' }}>
      <span>subtotal sin impuesto: ${dataObject.cart.subtotal}</span>
    </div>

   
    <div className="cart_box" style={{ flex: 1, justifyContent: 'flex-end' }}>
      <span>total con impuesto: ${dataObject.cart.total.toFixed(2)}</span>
    </div>


    <div className="cart_box" style={{ flex: 1, justifyContent: 'flex-end' }}>
    <a
    href="/direccion" 
    className="btn btn-info mt-3"
    disabled={isCartEmpty} 
    >
    Continuar con la compra
    </a>
    </div>
  </article>
);
}

export default Cart


