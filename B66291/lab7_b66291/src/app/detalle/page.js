"use client"
import "../../styles/direccion.css"
import "bootstrap/dist/css/bootstrap.min.css"; 
import Navbar from '../../components/Navbar';

const Detalle = () => {
  const storedData = localStorage.getItem('tienda');
  const dataObject = JSON.parse(storedData);

  const mostrarTextArea = dataObject && dataObject.cart && dataObject.cart.metodosPago === 'Sinpe Movil'; 

  function procesarPago(e) {
    e.preventDefault();
    const updatedCart = {
      ...dataObject.cart, 
      necesitaVerificacion: true,
    };
    const updatedDataObject = { ...dataObject, cart: updatedCart };
    localStorage.setItem("tienda", JSON.stringify(updatedDataObject));
   
  };

  return (
    <article>
      <div>
        <Navbar cantidad_Productos={dataObject.cart.productos.length}/>
      </div>
      <div className="detalleCompra">
        <p>Número de compra: #{generarNumeroCompra()}</p>
        <p>Número de telefono: {generarNumeroTelefono()}</p>
        {mostrarTextArea && (
          <textarea className="form-control" rows="5" placeholder="Comprobante de pago" />
        )}
        <button
          onClick={procesarPago} 
          className="btn btn-info mt-3" 
        >
          Continuar con la compra
        </button>
      </div>
    </article>
  );
};

function generarNumeroCompra() {
  return Math.floor(Math.random() * 1000000);
}

function generarNumeroTelefono() {
  return Math.floor(Math.random() * 100000000);
}

export default Detalle;

