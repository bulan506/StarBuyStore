import React from 'react';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalDirection } from './modal_direction';
import { CartShopItem, ProductItem } from './layout';
import { totalPriceNoTax, totalPriceTax,deleteAllProduct,getCartShopStorage,setCartShopStorage } from './page'; //precios totales - manejor LocalStorage

//Creamos la interfaz que deben seguir los props (o parametros) para el componente Modal
interface ModalCartProps {
    show: boolean;
    handleClose: () => void;    
    myCartInStorage: CartShopItem | null;    
    setMyCartInStorage: React.Dispatch<React.SetStateAction<CartShopItem | null>>;

}
  
export const ModalCart: React.FC<ModalCartProps> = ({ 
    show, 
    handleClose,    
    myCartInStorage,
    setMyCartInStorage
}) => {

    //States del ModalDirection (activarlo despues de presionar el boton "iniciar Compra")
    const [modalShow, setModalShow] = React.useState(false);

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

                        {/* asegurarnos de que no venga nulo el carrito */}
                        {myCartInStorage && myCartInStorage.allProduct.map((productItem, index) => (
                            //Tecnica rapida para evitar colocar otro div
                            <>                    
                                <div key={productItem.id}>
                                    <img src={productItem.imageUrl} alt="" />
                                    <p>{productItem.name}</p>
                                    <p><span>Cantidad:</span> {productItem.quantity}</p>
                                    <p><span>Precio:</span> ₡{productItem.price}</p>
                                    <button>Eliminar</button>
                                </div>
                                <hr></hr>
                            </>
                        ))}                
                    </div>                    
                

                </Modal.Body>
                
                <div className="total-price-container">
                    <div className="tax-price-cart total-price-cart">Total: <span>₡{myCartInStorage && myCartInStorage.total}</span></div>    
                    <hr></hr>
                    <div className="notax-price-cart total-price-cart">Total sin impuestos: <span>₡{myCartInStorage && myCartInStorage.subtotal}</span></div>    
                </div>
                <Modal.Footer>
                    {
                        myCartInStorage && myCartInStorage.allProduct.length ? (
                            <>
                                <Button variant="secondary" onClick={() => setModalShow(true)}>
                                    Iniciar compra
                                </Button>                              
                            </>
                        ) : (
                            <></>
                        )
                    }
                    <Button variant="secondary" onClick={() => deleteAllProduct(myCartInStorage,setMyCartInStorage, setCartShopStorage)}>
                        Vaciar Carrito
                    </Button>          
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>                    
                    
                </Modal.Footer>
            </Modal>

            {/* Modal para la direccion del usuario */}
            
            <ModalDirection 
                show={modalShow}
                onHide={() => setModalShow(false)}
                // allProduct={allProduct}
                // setAllProduct={setAllProduct}       
                myCartInStorage={myCartInStorage}
                setMyCartStorage={setMyCartInStorage}
            />
        </>
    );
}