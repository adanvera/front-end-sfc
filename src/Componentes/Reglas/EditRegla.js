import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { REGLA_DEV } from '../Commons/Endpoint'


const EditRegla = props => {

    const { uid } = props;
    const { reglas } = props
    const [validated, setValidated] = useState(false);

    const [regla, setRegla] = useState(
        {
            description: "",
            limitInferior: "",
            limitSuperior: "",
            equivalencia: "",
        }
    )

    useEffect(() => {
        if (reglas) {
            reglas.forEach(el => {
                if (el.uid === uid) {
                    setRegla(el)
                    console.log("Regla ahora");
                    console.log(regla);
                }
            });
        }
    }, [uid])

    const handleChange = (e) => {
        e.preventDefault();

        setRegla(prevState => {
            const updatedValues = {
                ...prevState,
                [e.target.name]: e.target.value,
            }
            return { ...updatedValues };
        })

    }


    //Editamos la regla
    const handleSubmit = async (event) => {

        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        try {
            const req = await fetch(REGLA_DEV + regla.uid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regla)
            }),
                res = await req.json()
            if (!req.ok) return toast.error("Ocurrio un error inesperado")
            toast.success("Regla modificada exitosamente")
            setTimeout(() => {
                window.location.reload()
            }, 800)
            console.log(res);
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
                                value={regla?.description}
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
                                value={regla?.limitInferior}
                                onChange={(e) => handleChange(e)}
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir limite inferior</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Limite superior</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Limite superior"
                                name='limitSuperior'
                                value={regla?.limitSuperior}
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
                                value={regla?.equivalencia}
                                onChange={(e) => handleChange(e)}
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir puntos requeridos</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='addusr mt-5' >
                        <Col id='create'>
                            <Button type="submit">Editar</Button>
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

export default EditRegla



