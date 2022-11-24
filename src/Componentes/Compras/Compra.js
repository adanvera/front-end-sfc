import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CLIENT_DEV, COMPRA } from '../Commons/Endpoint'

function Compra() {

    const initialState = {
        filtros: {
            documento: '',
        },
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        documento: "",
        correo: '',
        telefono: '',
        nacionalidad: '',
        fechaNacimiento: '',
        saldo: '',
        monto: ''
    }

    const [state, setState] = useState(initialState)
    const [client, setClient] = useState({})

    const handleChange = (e) => {
        setState(prevState => {
            const updatedValues = {
                ...prevState,

                ...prevState.state,
                [e.target.name]: e.target.value,

            }
            return { ...updatedValues };
        });
    }

    const verifyCedula = Number(state.documento).toString().length
    const parametro = verifyCedula

    // const searchClient = async (parametro) => {
    //     const idclient = state.documento
    //     if (parametro >= 6) {
    //         try {
    //             const response = await fetch(CLIENT_DEV + idclient)
    //             const data = await response.json()
    //             setClient(data?.client)
    //             setState(prev => ({
    //                 ...prev,
    //                 nombre: data?.client?.nombre,
    //                 apellido: data?.client?.apellido,
    //                 tipoDocumento: data?.client?.tipoDocumento,
    //                 documento: data?.client?.documento,
    //                 correo: data?.client?.correo,
    //                 telefono: data?.client?.telefono,
    //                 nacionalidad: data?.client?.nacionalidad,
    //                 fechaNacimiento: data?.client?.fechaNacimiento,
    //                 saldo: data?.client?.saldo
    //             }))
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    // }

    // searchClient(parametro)

    window.localStorage.setItem("idclient", "0")
    const [verify, setVerify] = useState(false)

    useEffect(() => {
        /**consulta para obtener datos del usuario logueado */
        const idclient = state.documento
        if (parametro >= 7 && verify === false) {
            const getClient = async () => {
                try {
                    const res = await fetch(CLIENT_DEV + idclient, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                        },
                    }),
                        json = await res.json()
                    setClient(json)
                    setVerify(true)

                } catch (error) {
                    console.log(error);
                }
            }
            getClient()
        }

    }, [client, state])

    const clientToShow = client.client

    console.log(clientToShow);
    let timeToWait


    const navigate = useNavigate()

    function redirectPage() {
        timeToWait = setTimeout(pageAndAction, 500);
    }

    /**funcion correspondiente para redirigir la pagina
     * a otro path 
     */
    function pageAndAction() {
        navigate('/compras')
        window.location.reload();
    }

    const submitCompra = (e) => {
        e.preventDefault();

        const compra = async () => {
            const compraToDo = {
                documentoCliente: state.documento,
                monto: state.monto,
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(compraToDo)
            }
            try {
                const response = await fetch(COMPRA, options)
                const data = await response.json()
                console.log(data)
                console.log('Compra realizada con exito');
                toast.success(data.msg)
                setState(initialState)
                redirectPage()
            } catch (error) {
                console.log(error)
                toast.error("Ocurrio un error al hacer la compra")
            }

        }
        compra()
    }

    return (
        <Container fluid={true} md={12} id="compras" >
            <div className="mt-4">
                <h5>Hacer una compra</h5>
            </div>
            <Col md={12}>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <Row className="text-al-ini titlemodule">
                    <section fluid={true} className="row" id="infoclientes">
                        <Row>
                            <Col md={4} className='mt-3'>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Nro documento"
                                    className="mb-3 w-100"
                                >
                                    <Form.Control type="text" placeholder="" className='inputshow' name="documento" value={state.documento} onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        {
                            clientToShow !== null &&
                            <Row>
                                <Col md={4} className='mt-3'>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Nombre y Apellido"
                                        className="mb-3 w-100"
                                    >
                                        <Form.Control type="text" placeholder="" value={clientToShow?.nombre + " " + clientToShow?.apellido} disabled />
                                    </FloatingLabel>
                                </Col>
                                <Col md={4} className='mt-3'>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Telefono"
                                        className="mb-3 w-100"
                                    >
                                        <Form.Control type="text" placeholder="" value={clientToShow?.telefono} disabled />
                                    </FloatingLabel>
                                </Col>
                                <Col md={4} className='mt-3'>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Correo"
                                        className="mb-3 w-100"
                                    >
                                        <Form.Control type="text" placeholder="" value={clientToShow?.correo} disabled />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        }
                        {
                            client === null &&
                            <>sere un registro cliente</>
                        }
                    </section>
                    <form md={12} onSubmit={submitCompra} >
                        <h5 className="title-details ml-5 pt-3 ">Detalle de la operacion</h5>
                        <Col md={4} className='mt-3'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Monto transaccion"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="number" value={state.monto} name="monto" onChange={handleChange} />
                            </FloatingLabel>
                        </Col>
                        <Row className='mt-3' >
                            {
                                state.monto === '' ?
                                    <Col>
                                        <Button type="submit" disabled >Realizar compra</Button>
                                    </Col> :
                                    <Col>
                                        <Button type="submit" >Realizar compra</Button>
                                    </Col>
                            }

                        </Row>
                    </form>
                </Row>
            </Col>
        </Container>
    )
}

export default Compra