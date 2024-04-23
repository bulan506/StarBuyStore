// //hookup para navegar entre archivos
// import { useNavigate } from 'react-router-dom';
// //Componentes para copiar el antiguo diseno del modal
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// export function AddressValidation() {
//   const nav = useNavigate();

//   const paymentMethod = () => {
//     // Redirige al usuario a la página de método de pago
//     nav('/cart-validation/payment-method');
//   };

//   return (
//     <div>
//       {/* Contenido de la página de validación de dirección */}
//         <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                     Ventanas de Compras:
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <Form>
//                     <fieldset>
//                         <Form.Group className="mb-3">
//                             <Form.Label style={{ fontWeight: 'bolder' }}>Dirección de entrega:</Form.Label>
//                             <Form.Control rows={5} as="textarea" placeholder="Ingresa tu dirección para la entrega" value={textAreaDataDirection} onChange={getTextAreaDirection} />
//                             <Form.Text className="text-muted">
//                                 Tu información es confidencial con nosotros
//                             </Form.Text>
//                         </Form.Group>    

//                         {/*Cuando el useState "finish=true", mostrar las demas opciones del Select*/}
//                         {finish ? (
//                             <>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label htmlFor="disabledSelect" style={{ fontWeight: 'bolder' }}>Forma de pago:</Form.Label>
//                                     {/* El Form Select tiene un valor por defecto (el del useState) */}
//                                     <Form.Select id="disabledSelect" value={payment} onChange={getSelectPayment}>
//                                         <option value="">Seleccione un tipo de pago:</option>
//                                         {/* PaymentMethods son los pagos ya definidos en layout.tsx ya que no tiene sentido
//                                         que el usuario cree los */}
//                                         {PaymentMethods.map((method) => (
//                                             <option key={method.payment} value={method.payment}>{PaymentMethodNumber[method.payment]}</option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
                                
//                                 {payment == PaymentMethodNumber.SINPE && (

//                                 <>
//                                     <Form.Group className="mb-3">
//                                         <Form.Label><span style={{ fontWeight: 'bolder' }}>Nuestro número de teléfono:</span> 62889872</Form.Label>
//                                         <br />                                                                      
//                                         <br />                                  
//                                         <Form.Label style={{ fontWeight: 'bolder' }}>Comprobante del SINPE:</Form.Label>
//                                         <Form.Control rows={5} as="textarea" placeholder="Ingrese su comprobante" onChange={getTextAreaSinpe}/>
//                                     </Form.Group>
//                                 </>

//                                 )}

//                                 <Form.Group className="mb-3">                                                                                
//                                     <Form.Label><span style={{ fontWeight: 'bolder' }}>Código de compra:</span> 24</Form.Label>
//                                 </Form.Group>     
//                             </>
//                         ):null}                    
                                                                
//                     </fieldset>
//                 </Form>                
//                 </Modal.Body>
//                 <Modal.Footer>
//                     {
//                         finish ? <Button type="submit" onClick={purchaseProcess}>Finalizar Compra</Button> : null
//                     }                
//                     {
//                         finish ? null :  <Button onClick={verifyTextArea} onChange={verifyTextArea}>Continuar con la compra</Button>
//                     }                                
//                     <Button onClick={()=>{onHide(); resetModal()}}>Close</Button>                
//                 </Modal.Footer>
//         </Modal> 
//       <button onClick={paymentMethod}>Ir a método de pago</button>
//     </div>
//   );
// }