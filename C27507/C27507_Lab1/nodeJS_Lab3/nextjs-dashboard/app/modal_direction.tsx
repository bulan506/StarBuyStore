// import React from "react"
import React, {useEffect} from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//Interfaces
import {CartShopAPI,ProductAPI,PaymentMethods,PaymentMethodNumber} from './layout';
//Componentes
import { AlertShop } from './generic_overlay';
//Metodos exportados
import {setCartShopStorage,sendDataAPI, deleteAllProduct } from './page';


//Creamos la interfaz que deben seguir los props (o parametros) para el componente Modal
interface ModalDirectionProps {    
    show: boolean;
    onHide: () => void;            
    myCartInStorage: CartShopAPI | null;
    setMyCartStorage: React.Dispatch<React.SetStateAction<CartShopAPI | null>>;
  }

export const ModalDirection: React.FC<ModalDirectionProps> = ({
    show,onHide,myCartInStorage,setMyCartStorage
}) => {  

    //Estados de los campos del formulario    
        //para activar o desactivar el boton "Finalizar Compra"    
    const [finish, setFinish] = useState(false);
        //para activar o desactivar el boton "Finalizar Compra"            
    const [textAreaDataDirection, setTextAreaDataDirection] = useState("");
        //asi evitamos que el myCartInStorage o el valor guardado de PaymentMethodNumber pueda ser nulo 
    const [payment, setPayment] = useState<PaymentMethodNumber>(myCartInStorage?.paymentMethod.payment ?? PaymentMethodNumber.CASH);
    // const [verify, setVerify] = useState<boolean>(false); //    
    const [textAreaSinpe, setTextAreaSinpe] = useState("");//campo del codigo del sinpe    
  
    //Estados  para los alert de Boostrap
    const [showAlert, setShowAlert] = useState(false);
    const [alertInfo,setAlertInfo] = useState("");
    const [alertTitle,setAlertTitle] = useState("");
    const [alertType,setAlertType] = useState("");

    //funciones para gestionar los alert
    function closeAlertShop(): void {
        setShowAlert(false);     
    }
    function callAlertShop (alertType:string,alertTitle:string,alertInfo:string): void {
        setAlertTitle(alertTitle);
        setAlertInfo(alertInfo);
        setAlertType(alertType)
        setShowAlert(true);
    }
    
    const getSelectPayment = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //Obtenemos el valor 1,2,3 o 4  del Select
        const actualValue = parseInt(event.target.value);        

        if (myCartInStorage) {
            // Verificamos si existe paymentMethod antes de modificarlo
            if (myCartInStorage.paymentMethod) {
                myCartInStorage.paymentMethod.payment = actualValue;
            } else {
                // Si no existe paymentMethod lo creamos
                myCartInStorage.paymentMethod = {
                    payment: actualValue,
                    verify: false
                };
            }
            setCartShopStorage("A", myCartInStorage);                        
            setPayment(actualValue);
        }        
    };


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
        onHide();
    }

    //Validcacion de inputs
    const purchaseProcess = async () =>{
        //Verificar direccion
        if(textAreaDataDirection.trim() === ""){
            callAlertShop("danger","Campo de entrega vacío","Por favor, verifique el campo de direccón no esté vacío...")
            return;
        }
        //Verificar que estemos tanto en la ultima pantalla y que haya un tipo de pago seleccionado
        //se deben verificar al mismo tiempo, ya que el tipo de pago solo aparece si estamos en la utlima pantalla        
        let isFinishAndSelectPaymentEmpty = finish && !payment
        if(isFinishAndSelectPaymentEmpty){            
            callAlertShop("danger","Campo de pago vacío","Por favor, indique un método de pago...")
            return;
        }     

        //Verificar que el value de la caja Sinpe sea igual al codigo dado por el sistema
        let isSinpeCodeOk = payment === PaymentMethodNumber.SINPE && textAreaSinpe.trim() === "";
        if(isSinpeCodeOk){                        
            callAlertShop("danger","Código de SINPE vacío","Debe colocar el cÓdigo de la transaccion SINPE")
            return;            
        }            

        const purchaseNum = await sendDataAPI("https://localhost:7161/api/Cart", myCartInStorage);        
        resetModal();//setteamos el modal o mandamos el resumen a la pagina
        deleteAllProduct(myCartInStorage,setMyCartStorage);
        callAlertShop("success","Compra finalizada","El codigo de su compra es: " + purchaseNum);      
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
                        <Form.Label style={{ fontWeight: 'bolder' }}>Dirección de entrega:</Form.Label>
                        <Form.Control rows={5} as="textarea" placeholder="Ingresa tu dirección para la entrega" value={textAreaDataDirection} onChange={getTextAreaDirection} />
                        <Form.Text className="text-muted">
                            Tu información es confidencial con nosotros
                        </Form.Text>
                    </Form.Group>    

                    {/*Cuando el useState "finish=true", mostrar las demas opciones del Select*/}
                    {finish ? (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledSelect" style={{ fontWeight: 'bolder' }}>Forma de pago:</Form.Label>
                                {/* El Form Select tiene un valor por defecto (el del useState) */}
                                <Form.Select id="disabledSelect" value={payment} onChange={getSelectPayment}>
                                    <option value="">Seleccione un tipo de pago:</option>
                                    {/* PaymentMethods son los pagos ya definidos en layout.tsx ya que no tiene sentido
                                    que el usuario cree los */}
                                    {PaymentMethods.map((method) => (
                                        <option key={method.payment} value={method.payment}>{PaymentMethodNumber[method.payment]}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            
                            {payment == PaymentMethodNumber.SINPE && (

                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label><span style={{ fontWeight: 'bolder' }}>Nuestro número de teléfono:</span> 62889872</Form.Label>
                                    <br />                                                                      
                                    <br />                                  
                                    <Form.Label style={{ fontWeight: 'bolder' }}>Comprobante del SINPE:</Form.Label>
                                    <Form.Control rows={5} as="textarea" placeholder="Ingrese su comprobante" onChange={getTextAreaSinpe}/>
                                </Form.Group>
                            </>

                            )}

                            <Form.Group className="mb-3">                                                                                
                                <Form.Label><span style={{ fontWeight: 'bolder' }}>Código de compra:</span> 24</Form.Label>
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