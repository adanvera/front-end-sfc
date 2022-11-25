import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import { BOLSA, CANJE, CLIENT_DEV, PREMIOS } from '../Commons/Endpoint'

const Canjes = (props) => {

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
    monto: '',
    uid: ''
  }

  const [state, setState] = useState(initialState)
  const [premios, setPremios] = useState([])
  const [uid, setUid] = useState('')
  const [verify, setVerify] = useState(false)
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

  const [bolsaPuntos, setBolsaPuntos] = useState('')


  useEffect(() => {
    const getPremios = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }

      try {
        const response = await fetch(PREMIOS, options)
        const data = await response.json()
        console.log(data)
        setPremios(data?.premios)

      } catch (error) {
        console.log(error)
      }
    }

    getPremios()

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

    const getBolsaPuntos = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }

      try {
        const response = await fetch(BOLSA, options)
        const data = await response.json()
        setBolsaPuntos(data.bolsas)
      } catch (error) {
        console.log(error)
      }
    }
    getBolsaPuntos()


  }, [client, state])


  const submitCanje = async (e) => {
    e.preventDefault()

    const toCanje = {
      documentoCliente: state.documento,
    }
    const uiiid = uid

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documentoCliente: state?.documento })
    }
    try {
      const response = await fetch(CANJE + uiiid, options)
      const data = await response.json()
      console.log(data);
      if (data.msg === 'Canje agregada exitosamente') {
        toast.success(data.msg)
      }
      if (data.msg === 'Ocurrio un error inesperado al crear el canje') {
        toast.error("Error!" + " Actualmente no dispone de puntos suficientes para realizar el canje")
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al realizar el canje')
    }

  }

  const clientToShow = client.client

  return (
    <Container fluid={true} md={12} id="compras" >
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Row>
        <Col md={8}>
          <div className="mt-4">
            <h5>Hacer un canje</h5>
          </div>
        </Col>
        {/* <Col md={4}>
          <div className="mt-4">
            <h5>Puntos disponibles</h5>
          </div>
        </Col> */}
      </Row>
      <Col md={12}>
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
        </Row>
        <form md={12} onSubmit={submitCanje} >
          <Row md={4} className='mt-3'>

            {
              Object.keys(premios).map((item) => {
                return (
                  <Col md={3}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src="http://drive.google.com/uc?export=view&id=1_aMut7WNW1qgG8HgEdHW1LcI2QEJ2cXr" />
                      <Card.Body>
                        <Card.Title>{premios[item].descripcion}</Card.Title>
                        <Card.Text>
                          Se requiere {premios[item].equivalencia} puntos, para canjear el premio
                        </Card.Text>
                        {
                          state.documento !== '' ?
                            <Button type="submit" onClick={() => setUid(premios[item].uid)} >Canjear premio</Button>
                            :
                            <Button type="submit" disabled onClick={() => setUid(premios[item].uid)} >Canjear premio</Button>

                        }
                      </Card.Body>
                    </Card>
                  </Col>)
              })
            }


          </Row>
        </form>

      </Col>
    </Container>
  )
}

export default Canjes