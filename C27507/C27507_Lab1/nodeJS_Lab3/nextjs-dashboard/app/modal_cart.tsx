import React from 'react';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalDirection } from './modal_direction';
import { CartShopItem, ProductItem } from './layout';
import { totalPriceNoTax, totalPriceTax,getCartShopStorage,setCartShopStorage } from './page'; //precios totales - manejor LocalStorage

//Creamos la interfaz que deben seguir los props (o parametros) para el componente Modal
interface ModalCartProps {
    show: boolean;
    handleClose: () => void;
    setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;         
    allProduct: ProductItem[];
    setAllProduct: React.Dispatch<React.SetStateAction<ProductItem[]>>;         
    totalWithTax:number;
    setTotalWithTax: React.Dispatch<React.SetStateAction<number>>;
    totalWithNoTax: number;
    setTotalWithNoTax: React.Dispatch<React.SetStateAction<number>>;
    payment: string;
    setPayment: React.Dispatch<React.SetStateAction<string>>;
    direction: string;
    setDirection: React.Dispatch<React.SetStateAction<string>>;
    verify: boolean;
    setVerify: React.Dispatch<React.SetStateAction<boolean>>;
    myCartInStorage: CartShopItem | null;    
}
  
export const ModalCart: React.FC<ModalCartProps> = ({ 
    show, 
    handleClose,
    setNumberOfItems,
    allProduct,
    setAllProduct,
    totalWithTax,
    setTotalWithTax,
    totalWithNoTax,
    setTotalWithNoTax,
    payment,
    setPayment,
    direction,
    setDirection,
    verify,
    setVerify,    
    myCartInStorage    
}) => {

    //Vaciar lista de productos - Local y la del Carrito
    const deleteAllProduct = () => {
        if(myCartInStorage){        
            //setteamos todo el carrito
            const newMockup: CartShopItem = {
                allProduct: [],
                subtotal: 0,
                tax: 0,
                total: 0,
                direction: '',
                payment: '',
                verify: false,
            };            
            setCartShopStorage("A",newMockup);            
            setAllProduct(newMockup.allProduct);
            setDirection(newMockup.direction);
            setPayment(newMockup.payment);
            setTotalWithNoTax(newMockup.subtotal);
            setTotalWithTax(newMockup.total);
            setVerify(newMockup.verify);
            setNumberOfItems(0);
        }        
    }

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

                        {allProduct.map((productItem, index) => (
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
                    <div className="tax-price-cart total-price-cart">Total: <span>₡{totalWithTax}</span></div>    
                    <hr></hr>
                    <div className="notax-price-cart total-price-cart">Total sin impuestos: <span>₡{totalWithNoTax}</span></div>    
                </div>
                <Modal.Footer>
                    {
                        allProduct.length ? (
                            <>
                                <Button variant="secondary" onClick={() => setModalShow(true)}>
                                    Iniciar compra
                                </Button>                              
                            </>
                        ) : (
                            <></>
                        )
                    }
                    <Button variant="secondary" onClick={deleteAllProduct}>
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
            allProduct={allProduct}
            setAllProduct={setAllProduct}
            totalWithTax={totalWithTax}
            setTotalWithTax={setTotalWithTax}
            totalWithNoTax={totalWithNoTax}
            setTotalWithNoTax={setTotalWithNoTax}            
            payment={payment}
            setPayment={setPayment}
            direction={direction}
            setDirection={setDirection}
            verify={verify}
            setVerify={setVerify}            
            myCartInStorage={myCartInStorage}
            />
        </>
    );
}