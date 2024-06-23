import React, { useEffect, useState, useCallback } from 'react';
import { Toast, Offcanvas, Badge } from 'react-bootstrap';
import * as signalR from "@microsoft/signalr";

const URL = process.env.NEXT_PUBLIC_API;

const MessageHandler = ({ show, handleClose }) => {
    if (show === undefined || handleClose === undefined) {
        throw new Error('Los argumentos para la vista de mensajes no pueden ser indefinidos.');
    }

    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const startConnection = useCallback(async () => {
        try {
            await connection.start();
            setIsConnected(true);
        } catch (err) {
            setTimeout(startConnection, 5000);
        }
    }, [connection]);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${URL}/campaignsHub`, { withCredentials: true, skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();
        setConnection(newConnection);

        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    useEffect(() => {
        const fetchInitialMessages = async () => {
            try {
                const response = await fetch(`${URL}/api/admin/campaigns/top`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMessages(data.map(msg => ({
                    title: msg.title,
                    contentCampaing: msg.contentCam,
                    read: false,
                    id: msg.id
                })));
            } catch (error) {
                throw new Error('Error al traer las campannas.');
            }
        };

        fetchInitialMessages(); // Llamar a la función para cargar los mensajes iniciales

        // Establecer conexión y configurar eventos de SignalR
        if (connection) {
            connection.on("UpdateCampaigns", (contentCampaing, title, id) => {
                setMessages(prev => [...prev, { contentCampaing, title, read: false, id }]);
            });
            connection.on("DeleteCampaigns", (id) => {
                setMessages(prev => prev.filter((msg) => msg.id !== id));
            });

            connection.onclose((error) => {
                setIsConnected(false);
                startConnection();
            });

            startConnection();

            return () => {
                connection.off("UpdateCampaigns");
                connection.off("DeleteCampaigns");
            };
        }
    }, [connection, startConnection]);

    const handleRead = useCallback((index) => {
        if (index == undefined || index < 0) {
            throw new Error('Los argumentos para marcar como leído no pueden ser indefinidos.');
        }
        setMessages(prev => prev.map((msg, i) => i === index ? { ...msg, read: true } : msg));
    }, []);

    const handleDelete = useCallback((index) => {
        if (index == undefined || index < 0) {
            throw new Error('Los argumentos para borrar no pueden ser indefinidos.');
        }
        setMessages(prev => prev.filter((_, i) => i !== index));
    }, []);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Mensajes {isConnected ? '(Conectado)' : '(Desconectado)'}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {messages.map((message, index) => (
                        <Toast
                            key={index}
                            onClose={() => handleDelete(index)}
                            onClick={() => handleRead(index)}
                            show={true}>
                            <Toast.Header>
                                <strong className="me-auto">{message.title}</strong>
                                {!message.read && <Badge bg="primary" className="ms-2">Nuevo</Badge>}
                            </Toast.Header>
                            <Toast.Body dangerouslySetInnerHTML={{ __html: message.contentCampaing }} />
                        </Toast>
                    ))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MessageHandler;
