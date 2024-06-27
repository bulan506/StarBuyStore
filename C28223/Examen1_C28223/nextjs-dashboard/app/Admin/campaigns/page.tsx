"use client";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Importar CSS de Bootstrap
import "@/app/ui/styles.css"; // Importar tus propios estilos
import Menu from "@/app/Admin/init/page"
import { jwtDecode } from 'jwt-decode';
import { Form, Button ,Modal } from 'react-bootstrap';
const URL = process.env.NEXT_PUBLIC_API;


const NewCampaign = () => {
    const [title, setTitle] = useState('');
    const [contentCam, setContentCam] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        var token = sessionStorage.getItem("token");
        if(!token){
            window.location.href = '/Admin';
            return;
          }
          if (token) {
            const decodedTokenStorage = jwtDecode(token);
            const nowTime = Date.now() / 1000;
            if (decodedTokenStorage.exp < nowTime) {
              sessionStorage.removeItem("token");
              return;
            }
          }
        const fetchCampaigns = async () => {
            try {
                const response = await fetch(`${URL}/api/admin/campaigns`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `Bearer ${token}`
                    }});
                const data = await response.json();
                setCampaigns(data);
            } catch (error) {
                throw new Error(`Error al intentar crear la campaña: ${error.message}`);
            }
        };
        fetchCampaigns();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !contentCam) {
            setModalMessage('El título y el contenido son obligatorios.');
            setShowErrorModal(true);
            return;
        }

        if (contentCam.length > 5000) {
            setModalMessage('El contenido de la campaña no puede exceder los 5000 caracteres.');
            setShowErrorModal(true);
            return;
        }

        const newCampaign = {
            Id: 0,
            Title: title,
            ContentCam: contentCam,
            DateCam: new Date().toISOString(),
            IsDeleted: 0
        };

        try {
            var token = sessionStorage.getItem("token");
            if(!token){
                setModalMessage(`Error: Por favor vuelva al inicio de sesión.`);
                setShowErrorModal(true);
                return;
              }
              if (token) {
                const decodedTokenStorage = jwtDecode(token);
                const nowTime = Date.now() / 1000;
                if (decodedTokenStorage.exp < nowTime) {
                    setModalMessage(`Error: sesión expirada, por favor vuelva al inicio de sesión.`);
                    setShowErrorModal(true);
                  sessionStorage.removeItem("token");
                  return;
                }
              }
            const response = await fetch(`${URL}/api/admin/campaigns`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newCampaign)
            });

            if (response.ok) {
                const data = await response.json();
                setCampaigns([...campaigns, data]);
                setModalMessage('Campaña creada con éxito!');
                setShowSuccessModal(true);
                setTitle('');
                setContentCam('');
            } else {
                setModalMessage(`Error: no se ha podido eliminar la campaña. Por favor vuelva al inicio.`);
                setShowErrorModal(true);
            }
        } catch (error) {
            setModalMessage(`Error: ${error.message}`);
            setShowErrorModal(true);
            throw new Error(`Error al intentar crear la campaña: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            var token = sessionStorage.getItem("token");
            if(!token){
                setModalMessage(`Error: Por favor vuelva al inicio de sesión.`);
                setShowErrorModal(true);
                return;
              }
              if (token) {
                const decodedTokenStorage = jwtDecode(token);
                const nowTime = Date.now() / 1000;
                if (decodedTokenStorage.exp < nowTime) {
                    setModalMessage(`Error: sesión expirada, por favor vuelva al inicio de sesión.`);
                    setShowErrorModal(true);
                  sessionStorage.removeItem("token");
                  return;
                }
              }
            const response = await fetch(`${URL}/api/admin/campaigns/${id}`, {
                method: 'DELETE', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setModalMessage(`Campaña eliminada con éxito!`);
                setShowSuccessModal(true);
                setCampaigns(campaigns.filter(campaign => campaign.id !== id));
            } else {
                const errorData = await response.json();
                setModalMessage(`No se ha podido eliminar la campaña: ${errorData.message}`);
                setShowSuccessModal(true);
            }
        } catch (error) {
            setModalMessage(`Error: No se ha podido eliminar la campaña, ha ocurrido un problema`);
            setShowErrorModal(true);
            throw new Error(`Error al intentar eliminar la campaña`);
        }
    };

    return (
        <div className="container mt-5">
            <Menu/>
            <h2>Crear Nueva Campaña</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa el título de la campaña"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formContentCam" className="mt-3">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Ingresa el contenido de la campaña"
                        value={contentCam}
                        onChange={(e) => setContentCam(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Crear Campaña
                </Button>
            </Form>

            <div className="campaigns-list mt-5">
                <h3>Campañas Existentes:</h3>
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="campaign-item mt-3">
                        <h4>{campaign.title}</h4>
                        <div dangerouslySetInnerHTML={{ __html: campaign.contentCam }} />
                        <p><strong>Fecha de Creación:</strong> {new Date(campaign.dateCam).toLocaleString()}</p>
                        <Button variant="danger" onClick={() => handleDelete(campaign.id)}>
                            Eliminar Campaña
                        </Button>
                    </div>
                ))}
            </div>

            {/* Modal de Error */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Éxito */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewCampaign;