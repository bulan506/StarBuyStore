// import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ProductItem } from './layout';


//Creamos la interfaz que deben seguir los props (o parametros) para el componente Modal
interface ModalCartProps {
    show: boolean;
    handleClose: () => void;
    allProduct: ProductItem[];
    setAllProduct: React.Dispatch<React.SetStateAction<ProductItem[]>>;     
    //recibir todos los productos actuales del carrito
  }
  
export const ModalCart: React.FC<ModalCartProps> = ({ show, handleClose,allProduct,setAllProduct }) => {


  return (
    <>     
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>
                <div className="cart_title_btn">
                    <h4><i className="fas fa-shopping-cart"></i>Tu Carrito:</h4>                    
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="product-menu-cart">
                {allProduct.map((productItem, index) => (
                    //Tecnica rapida para evitar colocar otro div
                    <>                    
                        <div key={productItem.id}>
                            <img src={productItem.imageUrl} alt="" />
                            <p>{productItem.name}</p>
                            <p>{productItem.price}</p>
                            <button>Eliminar</button>
                        </div>
                        <hr></hr>
                    </>
                ))}
            </div>            
           

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary">
                Vaciar Carrito
            </Button>          
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>                    
        </Modal.Footer>
      </Modal>
    </>
  );
}