// import React from "react"
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ProductItem } from './layout';
import { totalPriceNoTax, totalPriceTax,getCartShopStorage,setCartShopStorage } from './page'; //precios totales - manejor LocalStorage


//Creamos la interfaz que deben seguir los props (o parametros) para el componente Modal
interface ModalDirectionProps {    
    show: boolean;
    onHide: () => void;
    allProduct: ProductItem[];
    //recibir todos los productos actuales del carrito
    setAllProduct: React.Dispatch<React.SetStateAction<ProductItem[]>>;         
    totalWithTax:number;
    setTotalWithTax: React.Dispatch<React.SetStateAction<number>>;
    totalWithNoTax: number;
    setTotalWithNoTax: React.Dispatch<React.SetStateAction<number>>;
  }

export const ModalDirection: React.FC<ModalDirectionProps> = ({show,onHide,allProduct,setAllProduct,totalWithTax,setTotalWithTax,totalWithNoTax,setTotalWithNoTax }) => {  

    const [finish,setFinish] = useState(false); //para activar o desactivar el boton "Finalizar Compra"    
    const [textAreaData, setTextAreaData] = useState("");//para activar o desactivar el boton segun haya texto o no en el textarea
    const [typePayment, setTypePayment] = useState("");//para activar o desactivar el boton segun haya texto o no en el textarea


    //Para habilitar o deshabilitar las opciones extra segun el tipo de pago
    const getSelectPayment = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        //activamos el evento de escucha, con el value capturamos el valor del textArea
        const actualValue = event.target.value;
        //fijamos el valor al estado
        setTypePayment(actualValue);
    }


    //Para habilitar o deshabilitar las opciones despues de la direccion de entrega
    const getTextAreaValue = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        //activamos el evento de escucha, con el value capturamos el valor del textArea
        const actualValue = event.target.value;
        //fijamos el valor al estado
        setTextAreaData(actualValue);                  
    }

    //Cada vez que capturamos datos se guarda en el textAreaData
    const verifyTextArea = () =>{
        if(textAreaData.trim() !== ""){
            setFinish(true);
        }else{            
            setFinish(false);                        
        }                
    }           
    
    //Reiniciar los datos al cerrar el modal
    const resetModal = () =>{
        setFinish(false);
        setTextAreaData("");
        setTypePayment("");
        onHide();
    }
    

    return (
        <>
        <Modal
         show={show}
         onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


            <Form>
                <fieldset>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección de entrega:</Form.Label>
                        <Form.Control rows={5} as="textarea" placeholder="Ingresa tu dirección para la entrega" value={textAreaData} onChange={getTextAreaValue} />
                        <Form.Text className="text-muted">
                            Tu información es confidencial con nosotros
                        </Form.Text>
                    </Form.Group>    

                    {/* Si finish es true se muestran el resto de campos */}
                    {finish ? (
                        <>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledSelect">Forma de pago:</Form.Label>
                                <Form.Select id="disabledSelect" onChange={getSelectPayment}>
                                    <option>Selecciones un tipo de pago:</option>
                                    <option>Efectivo</option>
                                    <option>Sinpe</option>
                                </Form.Select>
                            </Form.Group>

                            {typePayment == "SinpeEfectivo" && (

                                <>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Numero de Compra: 1</Form.Label>                                        
                                    </Form.Group>
                                </>

                            )}

                            {typePayment == "Sinpe" && (

                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Código de Compra:</Form.Label>
                                    <Form.Control rows={5} as="textarea" placeholder="Ingrese su código"/>
                                </Form.Group>
                            </>

                            )}

                            <Form.Group>                                
                                <Form.Label htmlFor="disabledSelect">Verificación</Form.Label>
                                <Form.Select id="disabledSelect">
                                    <option>Disabled select</option>
                                </Form.Select>                                
                            </Form.Group>
                        </>
                    ):null}
                                                            
                </fieldset>
            </Form>


                
            </Modal.Body>
            <Modal.Footer>
                {
                    finish ? <Button type="submit">Finalizar Compra</Button> : null
                }                
                {
                    finish ? null :  <Button onClick={verifyTextArea} onChange={verifyTextArea}>Continuar con la compra</Button>
                }
                                
                <Button onClick={()=>{onHide(); resetModal()}}>Close</Button>                
            </Modal.Footer>
        </Modal>                
        </>
    );
}