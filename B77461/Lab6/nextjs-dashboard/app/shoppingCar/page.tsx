'use client'

import { useState } from "react";
import AddressForm from "../address/page";

const Cart = ({ cart, setCart, toggleCart, clearProducts, removeProduct }: { cart: any, setCart: (cart: any) => void, toggleCart: (action: boolean) => void, 
    clearProducts: () => void, removeProduct: (product: any) => void }) => {
    const [showAddressForm, setShowAddressForm] = useState(false);

    function handleAddressForm() {
        setShowAddressForm(!showAddressForm);
    }

    return (
        showAddressForm ? <AddressForm handleAddressForm={handleAddressForm}
            cart={cart} setCart={setCart} clearProducts={clearProducts} /> :
            <div className="container">
                <h1>Tu carrito de compras:</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.carrito.productos.map((producto: any, index: number) =>
                            <tr key={index}>
                                <td>{producto.name}</td>
                                <td>{producto.description}</td>
                                <td>${producto.price}</td>
                                <td>{producto.cantidad}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => removeProduct(producto)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="d-flex justify-content-start align-items-center">
                    <div className="d-flex w-100 justify-content-center">
                        <button type="button" className="btn btn-primary mr-2" onClick={() => toggleCart(false)}>Atrás</button>
                        <button type="button" className="btn btn-primary mr-2" onClick={handleAddressForm}>Continuar compra</button>
                        <button type="button" className="btn btn-danger mr-2" onClick={clearProducts}>Cancelar compra</button>
                    </div>
                </div>
            </div>
    )
}

export default Cart;
