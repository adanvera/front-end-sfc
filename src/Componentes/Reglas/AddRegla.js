import React, { useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { REGLA_DEV } from '../Commons/Endpoint';
const AddRegla = props => {

    const [validated, setValidated] = useState(false);
    const regla = {
        "description": "",
        "limitInferior": "",
        "limitSuperior": "",
        "equivalencia": "",

    }

    const handleChange = (e) => {
        regla[e.target.name] = e.target.value
    }

    //Agregamos la regla
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        try {
            const req = await fetch(REGLA_DEV, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regla)
            }),
                res = await req.json()
            console.log('Insertamos la regla');
            if (res.msg === 'Regla agregada exitosamente') {
                toast.success('Regla creada exitosamente');
                setTimeout(() => {
                    window.location.reload()
                }, 800)
            } else if (res.msg !== 'Regla agregada exitosamente') {
                toast.error('Error al crear la regla');
            }
        } catch (error) {
            console.log(error);
        }

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
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Descripcion de regla</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Descripcion"
                                name='description'
                                onChange={(e) => handleChange(e)}
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir Descripcion</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Limite inferior</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Limite inferior"
                                name='limitInferior'
                                onChange={(e) => handleChange(e)}
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir limite inferior</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Limite superir</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Limite superior"
                                name='limitSuperior'
                                onChange={(e) => handleChange(e)}
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir limite superior</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Puntos requeridos</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Puntos requeridos"
                                name='equivalencia'
                                onChange={(e) => handleChange(e)}
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir puntos requeridos</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='addusr mt-5' >
                        <Col id='create'>
                            <Button type="submit">Crear regla</Button>
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

export default AddRegla



