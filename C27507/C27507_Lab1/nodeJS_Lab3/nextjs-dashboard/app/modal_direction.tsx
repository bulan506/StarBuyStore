// import React from "react"
import {useEffect} from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartShopItem, ProductItem } from './layout';
import { AlertShop } from './generic_overlay';
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

    //Estados de los campos del formulario
    const [finish,setFinish] = useState(false); //para activar o desactivar el boton "Finalizar Compra"    
    const [textAreaDataDirection, setTextAreaDataDirection] = useState(direction);//para activar o desactivar el boton segun haya texto o no en el textarea direction
    const [typePayment, setTypePayment] = useState(payment);//para activar o desactivar el boton segun haya texto o no en el textarea
    const [textAreaSinpe, setTextAreaSinpe] = useState(""); //campo del codigo del sinpe
    const [adminVerify,setAdminVerify] = useState(verify); //campo de verificacion

    //Estados  para los alert de Boostrap
    const [showAlert, setShowAlert] = useState(false);
    const [alertInfo,setAlertInfo] = useState("");
    const [alertTitle,setAlertTitle] = useState("");
    const [alertType,setAlertType] = useState("");

    // //funciones para gestionar los alert
    function closeAlertShop(): void {
        setShowAlert(false);     
    }
    function callAlertShop (alertType:string,alertTitle:string,alertInfo:string): void {
        setAlertTitle(alertTitle);
        setAlertInfo(alertInfo);
        setAlertType(alertType)
        setShowAlert(true);
    }
    
 
    //Para habilitar o deshabilitar las opciones extra segun el tipo de pago
    const getSelectPayment = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        //activamos el evento de escucha, con el value capturamos el valor del textArea
        const actualValue = event.target.value;
        setTypePayment(actualValue);
        //Guardamos los datos en el LocalStorage        
        if (myCartInStorage) {
            myCartInStorage.payment = actualValue;            
            setCartShopStorage("A", myCartInStorage);                        
            setTypePayment(actualValue);
        }        
    }
    //Para habilitar o deshabilitar las opciones despues de la direccion de entrega
    const getTextAreaDirection = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{        
        const actualValue = event.target.value;        
        setTextAreaDataDirection(actualValue);           
        if (myCartInStorage) {
            myCartInStorage.direction = textAreaDataDirection;
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
        let isEmpty = textAreaDataDirection.trim() !== "";
        //en vez de un if
        setFinish(isEmpty);        
    }           
    
    //Reiniciar los datos al cerrar el modal
    const resetModal = () =>{
        setFinish(false);
        setTextAreaDataDirection("");
        setTextAreaSinpe("");
        setTypePayment("");
        setAdminVerify(false);
        onHide();
    }

    //Validcacion de inputs
    const purchaseProcess = () =>{
        //Verificar direccion
        if(textAreaDataDirection.trim() === ""){
            callAlertShop("danger","Campo de entrega vacío","Por favor, verifique el campo de direccón no esté vacío...")
            return;
        }
        //Verificar que estemos tanto en la ultima pantalla y que haya un tipo de pago seleccionado
        //se deben verificar al mismo tiempo, ya que el tipo de pago solo aparece si estamos en la utlima pantalla        
        let isFinishAndSelectPaymentEmpty = finish && typePayment.trim() === "Seleccione un tipo de pago:" || typePayment.trim() === ""
        if(isFinishAndSelectPaymentEmpty){            
            callAlertShop("danger","Campo de pago vacío","Por favor, indique un método de pago...")
            return;
        }     

        //Verificar que el value de la caja Sinpe sea igual al codigo dado por el sistema
        let isSinpeCodeOk = typePayment === "Sinpe" && textAreaSinpe.trim() !== "24";
        if(isSinpeCodeOk){                        
            callAlertShop("danger","Código de compra no coincide","El codigo de compra introducido no coincide con el brindado por el sistema")
            return;            
        }            
        callAlertShop("success","Compra finalizada","Compra realizada con éxito")
        
        //resetModal();
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
                        <Form.Control rows={5} as="textarea" placeholder="Ingresa tu dirección para la entrega" value={textAreaDataDirection} onChange={getTextAreaDirection} />
                        <Form.Text className="text-muted">
                            Tu información es confidencial con nosotros
                        </Form.Text>
                    </Form.Group>    

                    {/* Si finish es true se muestran el resto de campos */}
                    {finish ? (
                        <>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledSelect">Forma de pago:</Form.Label>
                                <Form.Select id="disabledSelect" value={typePayment} onChange={getSelectPayment}>
                                    <option value="">Seleccione un tipo de pago:</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Sinpe">Sinpe</option>
                                </Form.Select>
                            </Form.Group>

                            {typePayment == "Efectivo" && (

                                <>
                                    <Form.Group className="mb-3">                                                                                
                                        <Form.Label><span style={{ fontWeight: 'bolder' }}>Código de compra:</span> 24</Form.Label>
                                    </Form.Group>
                                </>

                            )}

                            {typePayment == "Sinpe" && (

                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label><span style={{ fontWeight: 'bolder' }}>Número de teléfono:</span> 62889872</Form.Label>
                                    <br />                                  
                                    <br />                                  
                                    <Form.Label><span style={{ fontWeight: 'bolder' }}>Código de compra:</span> 24</Form.Label>      
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
        <AlertShop alertTitle={alertTitle} alertInfo={alertInfo} alertType={alertType} showAlert={showAlert} onClose={closeAlertShop}/>        
        </>
    );
}