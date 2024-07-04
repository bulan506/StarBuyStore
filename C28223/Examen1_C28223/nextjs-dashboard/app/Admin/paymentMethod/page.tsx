"use client"
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { Button, Modal, Table, Badge } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const URL = process.env.NEXT_PUBLIC_API;

const PaymentMethodsPage = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                window.location.href = '/Admin';
                return;
            }
            const decodedToken = jwtDecode(token);
            const nowTime = Date.now() / 1000;
            if (decodedToken.exp < nowTime) {
                sessionStorage.removeItem("token");
                window.location.href = '/Admin';
                return;
            }
            const response = await fetch(`${URL}/api/admin/paymentMethods`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setPaymentMethods(data);
        } catch (error) {
            setError('Error al obtener los métodos de pago.');
        }
    };

    const handleToggleStatus = (method) => {
        setSelectedPaymentMethod(method);
        setShowConfirmationModal(true);
        setConfirmationAction(method.isActive == 1 ? 'desactivar' : 'activar');
    };

    const confirmAction = async () => {
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                window.location.href = '/Admin';
                return;
            }
            const decodedToken = jwtDecode(token);
            const nowTime = Date.now() / 1000;
            if (decodedToken.exp < nowTime) {
                sessionStorage.removeItem("token");
                window.location.href = '/Admin';
                return;
            }
            const updatedStatus = selectedPaymentMethod.isActive === 1 ? 0 : 1;
            const response = await fetch(`${URL}/api/admin/updatePayment/${selectedPaymentMethod.id}?isActive=${updatedStatus}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            setPaymentMethods(prevMethods =>
                prevMethods.map(method =>
                    method.id === selectedPaymentMethod.id ? { ...method, isActive: updatedStatus } : method
                )
            );
        } catch (error) {
            setError('Error al actualizar el estado del método de pago.');
        } finally {
            setIsLoading(false);
            setShowConfirmationModal(false);
            setSelectedPaymentMethod(null);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Administración de Métodos de Pago</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Método</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentMethods.map(method => (
                        <tr key={method.id}>
                            <td>{method.id}</td>
                            <td>{method.methodName}</td>
                            <td>{method.isActive === 1 ? <Badge bg="success">Activo</Badge> : <Badge bg="danger">Inactivo</Badge>}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleToggleStatus(method)}>
                                    {method.isActive === 1 ? 'Desactivar' : 'Activar'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación de Acción</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`¿Estás seguro que deseas ${confirmationAction} este método de pago?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmAction} disabled={isLoading}>
                        {isLoading ? 'Procesando...' : 'Confirmar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PaymentMethodsPage;
