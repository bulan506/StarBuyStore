import React, { useState, useEffect } from 'react';

const MetodoPago = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const memoryStore = JSON.parse(localStorage.getItem('tienda'));
    const [numeroCompra, setNumeroCompra] = useState('');
    const [numeroComprobante, setNumeroComprobante] = useState('');
    const [modalData, setModalData] = useState(null);
    const [modalData2, setModalData2] = useState(false);
    const URLConection = process.env.NEXT_PUBLIC_API;

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${URLConection}/api/admin/paymentMethods`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPaymentMethods(data.filter(method => method.isActive === 1));
            } else {
                showModal('Error', 'No se pudieron cargar los métodos de pago.');
            }
        } catch (error) {
            throw new Error('Error al obtener los métodos de pago');

        }
    };

    const closeModal = () => {
        setModalData(null);
    };

    const showModal = (title, content) => {
        if (!title || !content) {
            throw new Error('Error: Los argumentos title, content deben existir.');
        }
        setModalData({ title, content });
    };

    const handleAceptar = () => {
        if (paymentMethods.length == 0) {
            showModal('Error en los método de pago', `No hay métodos de pago disponibles en este momento.`);
        }
        if (!selectedMethod) {
            showModal('Método de pago', 'Por favor seleccione un método de pago disponible.');
        } else {
            const updatedCart = {
                ...memoryStore,
                carrito: {
                    ...memoryStore.carrito,
                    metodoDePago: selectedMethod.id
                },
                necesitaVerificacion: true
            };
            localStorage.setItem("tienda", JSON.stringify(updatedCart));
            setAccepted(true);
        }
    };

    const handleMetodoChange = (event) => {
        const selectedId = parseInt(event.target.value);
        const method = paymentMethods.find(m => m.id === selectedId);
        setSelectedMethod(method);
    };

    const renderPaymentForm = () => {
        if (selectedMethod?.methodName.toLowerCase().includes('sinpe')) {
            return (
                <div>
                    <h4>Número de SinpeMóvil: +506 3875 8524</h4>
                    <input
                        type="text"
                        placeholder="Número de comprobante"
                        onChange={(e) => setNumeroComprobante(e.target.value)}
                        required
                    />
                </div>
            );
        }
        return null;
    };

    const enviarDatosaAPI = async () => {
        if (selectedMethod?.methodName.toLowerCase().includes('sinpe') && !numeroComprobante) {
            showModal('Sin comprobante de pago', 'Por favor ingrese el comprobante de pago para finalizar la compra.');
            return;
        }

        const productData = memoryStore?.productos?.map((producto) => ({
            ProductId: String(producto.id),
            Quantity: producto.cant
        }));

        const dataToSend = {
            ProductIds: productData,
            Address: memoryStore?.carrito?.direccionEntrega,
            PaymentMethod: selectedMethod.id,
            ComprobantePago: numeroComprobante
        };

        try {
            const response = await fetch(`${URLConection}/api/Cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                const data = await response.json();
                setNumeroCompra(data.numeroCompra);
                setModalData2(true);
                showModal('Compra exitosa', `¡Su compra ${data.numeroCompra} ha sido procesada con éxito! Será redirigido al inicio.`);
            } else {
                const errorResponseData = await response.json();
                throw new Error(errorResponseData.message || 'Error al procesar el pago');
            }
        } catch (error) {
            showModal('Error', error.message);
        }
    };

    return (
        accepted ? (
            <div className="Compra">
                {modalData && modalData.title === 'Compra exitosa' && (
                    <ModalPagoAceptado title={modalData.title} content={modalData.content} onClose={closeModal} />
                )}
                
                <div className="smsFinal">
                    <div className="text-center">
                        <h5>Número de compra: {numeroCompra}</h5>
                        {renderPaymentForm()}
                        <h4>Esperando la confirmación del Administrador</h4>
                        <button className="btn btn-primary" onClick={enviarDatosaAPI}>Confirmar Pago</button>
                    </div>
                </div>
            </div>
        ) : (
            <div>
                {modalData && <Modal title={modalData.title} content={modalData.content} onClose={closeModal} />}
                <div className='metodoPago'>
                    <div className="centro">
                        <h1>Métodos de pago</h1>
                        {paymentMethods.map(method => (
                            <div key={method.id} className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id={`paymentMethod${method.id}`}
                                    value={method.id}
                                    onChange={handleMetodoChange}
                                    checked={selectedMethod?.id === method.id}
                                    required
                                />
                                <label className="form-check-label" htmlFor={`paymentMethod${method.id}`}>
                                    {method.methodName}
                                </label>
                            </div>
                        ))}
                        <button className="btn btn-primary" onClick={handleAceptar}>Aceptar</button>
                    </div>
                </div>
            </div>
        )
    );
};

const Modal = ({ title, content, onClose, closeButtonText = 'Cerrar', showCloseButton = true }) => {
    if (!title || !content || !onClose || typeof onClose !== 'function') { throw new Error('Error: Los argumentos title, content y onClose son obligatorios y onClose debe ser una función.'); }
    if (title == undefined || content == undefined || onClose == undefined) { throw new Error('Error: Los argumentos title, content no pueden ser indefinidos'); }
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        {showCloseButton && (
                            <button type="button" className="close" onClick={onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        )}
                    </div>
                    <div className="modal-body">
                        <p>{content}</p>
                    </div>
                    {showCloseButton && (
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                {closeButtonText}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
const ModalPagoAceptado = ({ title, content, onClose, closeButtonText = 'Ir al inicio', showCloseButton = true }) => {
    if (!title || !content || !onClose || typeof onClose !== 'function') { throw new Error('Error: Los argumentos title, content y onClose son obligatorios y onClose debe ser una función.'); }
    if (title == undefined || content == undefined || onClose == undefined) { throw new Error('Error: Los argumentos title, content no pueden ser indefinidos'); }
    const handleCerrarModal = () => {
        onClose();
        window.location.replace('/');
        localStorage.removeItem("tienda");
        return;
    };
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        {showCloseButton && (
                            <button type="button" className="close" onClick={handleCerrarModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        )}
                    </div>
                    <div className="modal-body">
                        <p>{content}</p>
                    </div>
                    {showCloseButton && (
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCerrarModal}>
                                {closeButtonText}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetodoPago;
