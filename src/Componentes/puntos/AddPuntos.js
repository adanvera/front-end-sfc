import React, { useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddPuntos = props => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{props?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Descripcion"
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir Descripcion</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Puntos requeridos</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Puntos"
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir puntos requeridos</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='addusr' >
                        <Col id='create'>
                            <Button type="submit">Crear premio</Button>
                        </Col>
                        <Col id='close'>
                            <Button onClick={props.onHide}>Cerrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddPuntos



