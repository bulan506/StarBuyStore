'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, FloatingLabel, Form, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Page() {
    const [mock, setMock] = useState(JSON.parse(localStorage.getItem('Mock')));

    const [validated, setValidated] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [address, setAddress] = useState('');


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            let copyOfMock = { ...mock };
            copyOfMock.cart.address = address;
            setMock(copyOfMock)
            localStorage.setItem('Mock', JSON.stringify(mock));
            navigate('/.')
        }

        setValidated(true);
    };

    const handleChange = (event) => {
        setValidated(true);
        setAddress(event.target.value);
        console.log(address)
        setEmpty(false)
    }

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Address"
                        className="mb-3"
                    >
                        <Form.Control required name="address" type="text" placeholder="Address" onChange={handleChange} />
                    </FloatingLabel>
                </Form.Group>
                <Button type="submit" disabled={empty} active={!empty} href='/.'>Continuar Compra</Button>
            </Form>
        </Container>

    );
}