'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, FloatingLabel, Form, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const orderId = getRandomInt(10000, 99999);
export default function Page() {
    const [mock, setMock] = useState(JSON.parse(localStorage.getItem('Mock')));

    const [validated, setValidated] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [address, setAddress] = useState('');
    const [hideComponents, setHideComponents] = useState({ hideSinpe: true, hideConfirmation: true })


    const handleSubmit = (event) => {
        let hideComponentsCopy = { ...hideComponents };
        hideComponentsCopy.hideConfirmation = false;
        setHideComponents(hideComponentsCopy);
        setValidated(true);
    };

    const handleChange = (event) => {
        const addressFormData = event.currentTarget;
        if (addressFormData.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        setAddress(event.target.value);
        console.log(address)
        setEmpty(false)
    }

    const handleChangeSelect = (event) => {
        const slctPaymentMethodValue = event.target.value;
        let hideComponentsCopy = { ...hideComponents };
        // console.log(slctPaymentMethodValue);
        if (slctPaymentMethodValue === '0') {
            hideComponentsCopy.hideConfirmation = false;
            hideComponentsCopy.hideSinpe = true;
        } else if (slctPaymentMethodValue === '1') {
            hideComponentsCopy.hideConfirmation = true;
            hideComponentsCopy.hideSinpe = false;
        } else {
            hideComponentsCopy.hideConfirmation = true;
            hideComponentsCopy.hideSinpe = true;
        }

        setHideComponents(hideComponentsCopy);
    }

    return (
        <Container>
            <Form.Select aria-label="Tipo de pago" onChange={handleChangeSelect}>
                <option>Tipo de pago</option>
                {mock.paymentMethods.map((paymentMethod, index) => (
                    <option key={index} value={index}>{paymentMethod}</option>
                ))}
            </Form.Select>
            <div>
                <h3>Numero de Orden: {orderId}</h3>
            </div>
            <div hidden={hideComponents.hideSinpe}>
                <h4>Por favor, hacer el pago al numero: 7084-0594</h4>
                <Form noValidate validated={validated}>
                    <Form.Group controlId="validationCustom01">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Numero de comprobante"
                            className="mb-3"
                        >
                            <Form.Control required name="address" type="text" placeholder="Numero de comprobante" onChange={handleChange} />
                        </FloatingLabel>
                    </Form.Group>
                    <Button disabled={empty} active={!empty} onClick={handleSubmit}>Continuar Compra</Button>
                </Form>
            </div>
            <div hidden={hideComponents.hideConfirmation}>
                <h4>Por favor, esperar la confirmacion del administrador con respecto al pago</h4>
                <Link href={'/.'}>
                    <h5 className="text-center">Volver a la pantalla principal</h5>
                </Link>
            </div>
        </Container>

    );
}