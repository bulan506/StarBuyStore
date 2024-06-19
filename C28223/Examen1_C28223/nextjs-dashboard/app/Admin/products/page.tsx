"use client";
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/ui/styles.css";
import { jwtDecode } from 'jwt-decode';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import Menu from "@/app/Admin/init/page";
import { Modal, Button } from 'react-bootstrap';

const ManagementProducts = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [sessionExpired, setSessionExpired] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const URLConection = process.env.NEXT_PUBLIC_API;
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const nowTime = Date.now() / 1000;
                if (decodedToken.exp > nowTime) {
                    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    if (userRole !== "Admin") {
                        setModalContent('No tienes permisos de administrador.');
                        setShowModal(true);
                        return;
                    }
                } else {
                    setModalContent('Sesión expirada. Por favor inicia sesión de nuevo.');
                    sessionStorage.removeItem("token");
                    setSessionExpired(true);
                    setShowModal(true);
                    return;
                }
            } catch (error) {
                throw new Error('Ha ocurrido un error en el proceso de registro.');
            }
        } else {
            setModalContent('Sesión expirada. Por favor inicia sesión de nuevo.');
            setSessionExpired(true);
            setShowModal(true);
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch(URLConection + '/api/admin/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const filteredProducts = data.products.filter(product => product.deleted !== 1);
                    setProducts(filteredProducts);
                } else {
                    setModalContent('Error al obtener los productos');
                    setShowModal(true);
                }
            } catch (error) {
                throw new Error('Ha ocurrido un error en el proceso de registro.');
            }
        };
        fetchProducts();
    }, []);

    const handleDeleteProduct = async () => {
        if (productIdToDelete == undefined) {
            setModalContent('Error: productId es nulo o indefinido');
            setShowModal(true);
            return;
        }
        if (productIdToDelete <= 0) {
            setModalContent('Error, el ID del producto no puede ser 0.');
            setShowModal(true);
            return;
        }
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setModalContent('Sesión expirada. Por favor, vuelve a iniciar sesión.');
                setSessionExpired(true);
                setShowModal(true);
                return;
            }
            const response = await fetch(`${URLConection}/api/admin/product/${productIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setProducts(products.filter(product => product.id !== productIdToDelete));
                setModalContent('Producto eliminado exitosamente.');
                setShowModal(true);
            } else {
                setModalContent(`Error al eliminar el producto, error: ${data.message}`);
                setShowModal(true);
            }
        } catch (error) {
            setModalContent('Error ocurrido al eliminar el producto');
            setShowModal(true);
        } finally {
            setConfirmDeleteModal(false);
        }
    };

    const handleAddProduct = () => {
        router.push('/Admin/product');
    };

    const confirmDeleteProduct = (productId) => {
        if (productId == undefined) { throw new Error('Error: productId es nulo o indefinido'); }
        if (productId<=0)
        {
            setModalContent('Error: El ID del producto a eliminar no puede ser negativo o 0.');
            setShowModal(true);
            return;
        }
        setProductIdToDelete(productId);
        setConfirmDeleteModal(true);
    };

    const cancelDeleteProduct = () => {
        setProductIdToDelete(null);
        setConfirmDeleteModal(false);
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Imagen',
            cell: row => <img src={row.imageURL} alt={row.name} width="90" height="90" />,
            width: '150px'
        },
        {
            name: 'Descripción',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <Button variant="danger" onClick={() => confirmDeleteProduct(row.id)}>Eliminar</Button>
            ),
        },
    ];

    return (
        <div className="container mt-5">
            <Menu />
            <h1>Gestión de Productos</h1>
            <Button className="btn btn-success mb-3" onClick={handleAddProduct}>Agregar Producto</Button>
            <DataTable
                columns={columns}
                data={products}
                pagination
            />
            <Modal show={confirmDeleteModal} onHide={cancelDeleteProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que deseas eliminar este producto?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDeleteProduct}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>
                        Sí
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensaje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalContent}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManagementProducts;
