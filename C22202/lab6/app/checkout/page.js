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
        let copyOfMock = { ...mock };
        copyOfMock.cart.address = address;
        setMock(copyOfMock)
        localStorage.setItem('Mock', JSON.stringify(mock));

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

    return (
        <Container>
            <Form noValidate validated={validated}>
                <Form.Group controlId="validationCustom01">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Address"
                        className="mb-3"
                    >
                        <Form.Control required name="address" type="text" placeholder="Address" onChange={handleChange} />
                    </FloatingLabel>
                </Form.Group>
                <Button type="submit" disabled={empty} active={!empty} href='/.' onClick={handleSubmit}>Continuar Compra</Button>
            </Form>
        </Container>

    );
}