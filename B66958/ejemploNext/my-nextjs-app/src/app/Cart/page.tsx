'use client'

const Cart = ({ cart }) => {

    return <div className="container">
        <h1>Tu carrito de compras:</h1>
        <div className="list-group">
            {cart.carrito.productos.map(producto =>
                <a className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex justify-content-start align-items-center">
                        <img className="card-img-top mr-3"
                            src={producto.imageUrl}
                            style={{ width: "200px", height: "90px" }} />
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{producto.name}</h5>
                            <small>${producto.price}</small>
                        </div>
                    </div>
                    <p className="mb-1">{producto.description}</p>
                </a>
            )}
        </div>
        <button type="button" className="btn btn-primary" data-mdb-ripple-init>Cotinuar compra</button>
    </div>
}

export default Cart;