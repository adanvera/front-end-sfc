import React, { useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddClient = props => {

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
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nombre"
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir nombre</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Apellido"
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir apellido</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-6">
                            <Form.Label>Tipo de documento</Form.Label>
                            <Form.Select as={Col} md="6" aria-label="Default select example">
                                <option>Seleccionar</option>
                                <option value="cedula">Cedula de identidad</option>
                                <option value="pasaporte">Pasaporte</option>
                            </Form.Select>
                        </div>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Número de documento</Form.Label>
                            <Form.Control type="number" placeholder="Número de cédula" required />
                            <Form.Control.Feedback type="invalid">Escribir número de documento</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-5" >
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" placeholder="Correo electrónico" required />
                            <Form.Control.Feedback type="invalid">Escribir correo electrónico válido</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Número de telefono</Form.Label>
                            <Form.Control type="email" placeholder="Numero de telefono" required />
                            <Form.Control.Feedback type="invalid">Escribir numero de telefono</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>

                    </Row>
                    <Row className='addusr' >
                        <Col id='create'>
                            <Button type="submit">Crear cliente</Button>
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

export default AddClient



