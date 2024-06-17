"use client";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Importar CSS de Bootstrap
import "@/app/ui/styles.css"; // Importar tus propios estilos
import { useRouter } from 'next/navigation';
import Menu from "@/app/Admin/init/page";
import { jwtDecode } from 'jwt-decode';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const URLConection = process.env.NEXT_PUBLIC_API;
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            setSessionExpired(true);
            sessionStorage.removeItem("token");
            return;
        }
        const fetchCategories = async () => {
            try {
                const decodedToken = jwtDecode(token);
                const nowTime = Date.now() / 1000;
                if (decodedToken.exp < nowTime) {
                    setSessionExpired(true);
                    sessionStorage.removeItem("token");
                    return;
                }
                const response = await fetch(URLConection + '/api/admin/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories);
                } else {
                    throw new Error('Error al obtener datos de categorías.');
                }
            } catch (error) {
                throw new Error('Error al obtener datos de categorías.');
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        if (event == undefined) throw new Error('El evento no puede ser indefinido.');
        event.preventDefault();
        if (category === 0) {
            setModalContent('Error en la solicitud. Por favor ingrese una categoría.');
            setShowModal(true);
            return;
        }
        const token = sessionStorage.getItem('token');
        if (!token) {
            setSessionExpired(true);
            sessionStorage.removeItem("token");
            return;
        }
        const decodedToken = jwtDecode(token);
        const nowTime = Date.now() / 1000;
        if (decodedToken.exp < nowTime) {
            setSessionExpired(true);
            sessionStorage.removeItem("token");
            return;
        }
        const productData = { name, description, price: parseFloat(price), imageURL, category };
        try {
            if (!token) {
                setSessionExpired(true);
                sessionStorage.removeItem("token");
                return;
            }
            const response = await fetch(URLConection + '/api/admin/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            if (response.ok) {
                setName('');
                setDescription('');
                setPrice('');
                setImageURL('');
                setCategory(0);
                router.push('/Admin/products');
            } else {
                throw new Error('Error al insertar el producto.');
            }
        } catch (error) {
            throw new Error('Error en el proceso de inserción del producto.');
        }
    };

    const handleCategoryChange = (categoryID) => {
        if (categoryID == undefined) { throw new Error('Error: categoryID es nulo o indefinido'); }
        setCategory(categoryID);
    };

    return (
        <div className="container mt-5">
            <Menu />
            <h1>Agregar Producto</h1>
            {sessionExpired && (
                <Modal
                    title="Sesión Expirada"
                    content="Tu sesión ha expirado. Por favor, vuelve a iniciar sesión."
                    onClose={() => {
                        setSessionExpired(false);
                        router.push('/Admin'); // Redirigir al inicio
                    }}
                />
            )}
            {showModal && (
                <Modal
                    title="Error"
                    content={modalContent}
                    onClose={() => setShowModal(false)}
                />
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre del Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageURL">URL de la Imagen</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Categoría</label>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={category ? categories.find(cat => cat.categoryID === category)?.nameCategory : 'Selecciona una categoría'}
                    >
                        {categories.map(cat => (
                            <Dropdown.Item
                                key={cat.categoryID}
                                onClick={() => handleCategoryChange(cat.categoryID)}
                            >
                                {cat.nameCategory}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Agregar Producto</button>
            </form>
        </div>
    );
};

const Modal = ({ title, content, onClose, closeButtonText = 'Cerrar', showCloseButton = true }) => {
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

export default AddProduct;
