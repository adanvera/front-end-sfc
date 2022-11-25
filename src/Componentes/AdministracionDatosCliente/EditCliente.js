import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { CLIENT_DEV } from '../Commons/Endpoint';

const EditCliente = props => {
    const {uid} =  props;
    const {clientes} = props
    const [validated, setValidated] = useState(false);
    const[client,setClient] = useState(
        {
            nombre: "",
            apellido: "",
            documento: "",
            tipoDocumento: "",
            nacionalidad: "",
            fechaNacimiento:"",
            correo: "",
            telefono: "",
            
            }
    )
    
    
    useEffect(()=>{
        if(clientes){
            clientes.forEach( el => {
                if( el.uid === uid ){
                    
                    setClient(el)
                    console.log("CLiente ahora");
                    console.log(client);
                }
            });
        }    
    },[uid])
    
   
    
    const handleChange = (e) =>{
        e.preventDefault();
        setClient(prevState => {
            const updatedValues = {
                    ...prevState,
                    [e.target.name]: e.target.value,
            }
        return { ...updatedValues };
        })
    }
    
    //Editamos el  cliente
    const handleSubmit = async (event) => {
        console.log("CLiente a EDITAR");
        console.log(client);
        event.preventDefault();
        console.log(event);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        try {
            const req = await fetch(CLIENT_DEV+client.documento,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:JSON.stringify(client)
            }),
            res = await req.json()
            if(!req.ok)return toast.error("Ocurrio un error inesperado")
            toast.success("Usuario modificado correctamente")
            setTimeout(()=>{
                window.location.reload()
            },1300)    
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
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nombre"
                                name='nombre'
                                value = {client.nombre}
                                onChange={(e) => handleChange(e)}
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
                                name='apellido'
                                value = {client.apellido}
                                onChange={(e) => handleChange(e)}
                            />
                            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Escribir apellido</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-6">
                            <Form.Label>Tipo de documento</Form.Label>
                                
                            <Form.Select  value = {client.tipoDocumento} as={Col} md="6" aria-label="Default select example" name = 'tipoDocumento' onChange={(e) => handleChange(e)} >
                                <option>Seleccionar</option>
                                <option value="cedula">Cedula de identidad</option>
                                <option value="pasaporte">Pasaporte</option>
                            </Form.Select>
                        </div>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Número de documento</Form.Label>
                            <Form.Control type="number" placeholder="Número de cédula" name='documento' onChange={(e) => handleChange(e)} value={client.documento} required />
                            <Form.Control.Feedback type="invalid">Escribir número de documento</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-5" >
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" placeholder="Correo electrónico" name='correo' onChange={(e) => handleChange(e)} value={client.correo} required />
                            <Form.Control.Feedback type="invalid">Escribir correo electrónico válido</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Número de telefono</Form.Label>
                            <Form.Control type="number" placeholder="Numero de telefono" name='telefono' onChange={(e) => handleChange(e)} value={client.telefono}required />
                            <Form.Control.Feedback type="invalid">Escribir numero de telefono</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-5" >
                    <div className="col-md-6">
                            <Form.Label>Nacionalidad</Form.Label>
                            <Form.Select as={Col} md="6" aria-label="Default select example " name = 'nacionalidad' onChange={(e) => handleChange(e)} value={client.nacionalidad}>
                                <option>Nacionalidad</option>
                                <option value="Paraguaya">Paraguaya</option>
                                <option value="Extranjero">Extranjero</option>
                            </Form.Select>
                        </div>
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Fecha Nacimiento</Form.Label>
                            <Form.Control type="date" placeholder="fecha de nacimiento" name='fechaNacimiento' onChange={(e) => handleChange(e)}  value={client.fechaNacimiento} required />
                        </Form.Group>
                    </Row>
                    <Row>

                    </Row>
                    <Row className='addusr' >
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

export default EditCliente



