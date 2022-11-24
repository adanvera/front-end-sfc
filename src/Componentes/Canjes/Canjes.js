import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { CANJE, PREMIOS } from '../Commons/Endpoint'

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
  }, [])

  const submitCanje = async (e) => {
    e.preventDefault()


    const toCanje = {
      documentoCliente: state.documento,
    }
    const uiiid = state.uid

    console.log(uiiid);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documentoCliente: state.documento })
    }
    try {
      const response = await fetch(CANJE + uiiid, options)
      const data = await response.json()
      console.log(data)
      toast.success('Canje realizado con exito')
    } catch (error) {
      console.log(error)
      toast.error('Error al realizar el canje')
    }

  }

  console.log(state.uid);

  return (
    <Container fluid={true} md={12} id="compras" >
      <div className="mt-4">
        <h5>Hacer un canje</h5>
      </div>
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
        </Row>
        <form md={12} onSubmit={submitCanje} >
          <Row>
            <FloatingLabel controlId="floatingSelect" label="Seleccionar premio">
              <Form.Select aria-label="Floating label select example" name='uid' value={state.uid} onChange={handleChange}>
                <option disabled>Seleccionar premio</option>
                {
                  Object.keys(premios).map((item) => {
                    return (
                      <option value={premios[item].uid}>{premios[item].descripcion}</option>
                    )
                  })
                }
              </Form.Select>
            </FloatingLabel>
          </Row>
          <Col className='mt-3'>
            <Button type="submit" >Realizar canej</Button>
          </Col>
        </form>

      </Col>
    </Container>
  )
}

export default Canjes