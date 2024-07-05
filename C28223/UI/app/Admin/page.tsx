"use client";
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "@/app/ui/styles.css";
import {jwtDecode} from 'jwt-decode';
import { Modal, Button } from 'react-bootstrap';

const LoginAdmin = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const URLConection = process.env.NEXT_PUBLIC_API;
  
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const nowTime = Date.now() / 1000;
                if (decodedToken.exp > nowTime) {
                    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    if (userRole === "Admin") {
                        window.location.href = '/Admin/init';
                        return;
                    }
                } else {
                    setModalContent('Sesión expirada. Por favor, vuelve a iniciar sesión.');
                    setShowModal(true);
                }
            } catch (error) {
                setModalContent('Ha ocurrido un error en el proceso de registro. Por favor, vuelve a iniciar sesión.');
                setShowModal(true);
            }
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent('');
    };

    const handleSubmit = async (event) => {
        if (event == undefined) {
            throw new Error('Los parametros de inicio de sesión, no pueden ser indefinidos.');
        }
        event.preventDefault();
        const loginData = {
            userLog: usuario,
            passwordLog: contrasena
        };
        try {
            const response = await fetch(URLConection + '/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('token', data.token);
                const decodedToken = jwtDecode(data.token);
                const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (userRole === "Admin") {
                    window.location.href = '/Admin/init';
                } else {
                    setModalContent('No tienes permisos de administrador.');
                    setShowModal(true);
                }
            } else {
                const errorData = await response.json();
                setModalContent(errorData.message || 'Error en la solicitud. Por favor, intente de nuevo más tarde.');
                setShowModal(true);
            }
        } catch (error) {
            setModalContent('Error en la solicitud. Por favor, intente de nuevo más tarde.');
            setShowModal(true);
        }
    };

    return (
        <div className="log">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <h1>Ingreso al Sistema</h1>
                    <div className="form-group">
                        <label htmlFor="Usuario">Usuario:</label>
                        <input type="text" className="form-control" id="Usuario" placeholder="Ingrese su usuario"
                            minLength={4} value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Contrasena">Contraseña</label>
                        <input type="password" className="form-control" id="Contrasena" placeholder="Ingrese su contraseña"
                            minLength={5} value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensaje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalContent}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LoginAdmin;
