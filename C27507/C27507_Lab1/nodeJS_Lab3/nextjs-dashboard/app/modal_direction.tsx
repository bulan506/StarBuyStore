// import React from "react"
import {useEffect} from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartShopItem, ProductItem } from './layout';
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
    payment: string;
    setPayment: React.Dispatch<React.SetStateAction<string>>;
    direction: string;
    setDirection: React.Dispatch<React.SetStateAction<string>>;
    verify: boolean;
    setVerify: React.Dispatch<React.SetStateAction<boolean>>;
    myCartInStorage: CartShopItem | null;
  }

export const ModalDirection: React.FC<ModalDirectionProps> = ({
    show,onHide,allProduct,setAllProduct,totalWithTax,setTotalWithTax,totalWithNoTax,setTotalWithNoTax,
    payment,setPayment,direction,setDirection,verify,setVerify,myCartInStorage
}) => {  

    const [finish,setFinish] = useState(false); //para activar o desactivar el boton "Finalizar Compra"    
    const [textAreaData, setTextAreaData] = useState(direction);//para activar o desactivar el boton segun haya texto o no en el textarea
    const [typePayment, setTypePayment] = useState(payment);//para activar o desactivar el boton segun haya texto o no en el textarea
    const [textAreaSinpe, setTextAreaSinpe] = useState("");//para
    const [adminVerify,setAdminVerify] = useState(verify);        

    //Para habilitar o deshabilitar las opciones extra segun el tipo de pago
    const getSelectPayment = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        //activamos el evento de escucha, con el value capturamos el valor del textArea
        const actualValue = event.target.value;
        setTypePayment(actualValue);
        //Guardamos los datos en el LocalStorage        
        if (myCartInStorage) {
            myCartInStorage.payment = actualValue;            
            setCartShopStorage("A", myCartInStorage);            
            setPayment(actualValue);
        }        
    }
    //Para habilitar o deshabilitar las opciones despues de la direccion de entrega
    const getTextAreaValue = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{        
        const actualValue = event.target.value;        
        setTextAreaData(actualValue);           
        if (myCartInStorage) {
            myCartInStorage.direction = textAreaData;
            setCartShopStorage("A", myCartInStorage);            
        }            
    }
    const getTextAreaSinpe = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{        
        const actualValue = event.target.value;        
        setTextAreaSinpe(actualValue);                  
    }
    const getCheckBoxVerify = (event: React.ChangeEvent<HTMLInputElement>)=>{

        const isChecked = event.target.checked        
        setAdminVerify(isChecked);        
        if (myCartInStorage) {
            myCartInStorage.verify = isChecked;
            setCartShopStorage("A", myCartInStorage);            
        }            
    }

    //Cambiar el estado del modal, segun haya contenido o no en el campo de Direccion
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
        setTextAreaSinpe("");
        setTypePayment("");
        setAdminVerify(false);
        onHide();
    }

    //Validcacion de inputs
    const purchaseProcess = () =>{
        //Verificar direccion
        if(textAreaData.trim() === ""){
            alert("Por favor, verifique el campo de direccón no esté vacío...");
            return;
        }
        //Verificar tipo de pago
        if(finish){//verifica que estemos en la ultima pantalla
            if(typePayment.trim() === "Seleccione un tipo de pago:" || typePayment.trim() === ""){
                alert("Por favor, indique un método de pago...");
                return;
            }
        }     

        //Verificar que value de la caja Sinpe sea igual al codigo
        if(typePayment === "Sinpe"){
            if(textAreaSinpe.trim() !== "1"){
                alert("El codigo de compra introducido no coincide por el brindado por el sistema");
                return;
            }
        }
        alert("La compra se ha realizado");
    }
    

    return (
        <>
        <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Ventanas de Compras:
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
                                <Form.Select id="disabledSelect" value={payment} onChange={getSelectPayment}>
                                    <option value="">Seleccione un tipo de pago:</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Sinpe">Sinpe</option>
                                </Form.Select>
                            </Form.Group>

                            {typePayment == "Efectivo" && (

                                <>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Numero de Compra: 1</Form.Label>                                        
                                    </Form.Group>
                                </>

                            )}

                            {typePayment == "Sinpe" && (

                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>1</Form.Label>      
                                    <br />                                  
                                    <br />                                  
                                    <Form.Label>Código de Compra:</Form.Label>
                                    <Form.Control rows={5} as="textarea" placeholder="Ingrese su código" onChange={getTextAreaSinpe}/>
                                </Form.Group>
                            </>

                            )}

                            <Form.Group>                                
                                <Form.Label htmlFor="disabledSelect">Indique si el pago requiere Verificación:</Form.Label>
                                <Form.Check 
                                    type="checkbox" label="Marque la casilla si requiere Verificación"
                                    checked={adminVerify}
                                    onChange={getCheckBoxVerify}
                                />
                            </Form.Group>
                        </>
                    ):null}
                                                            
                </fieldset>
            </Form>                
            </Modal.Body>
            <Modal.Footer>
                {
                    finish ? <Button type="submit" onClick={purchaseProcess}>Finalizar Compra</Button> : null
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