import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Punto from '../../Models/Punto';
import { BOLSA } from '../Commons/Endpoint';
import { formatDataPuntos } from '../Commons/helpers';
import SearchTable from '../Commons/SearchTable';
import Table from '../Commons/Tables/Table';
import AddPuntos from './AddPuntos';


function Puntos() {

  const initialState = {

    headers: {
      documentoCliente: "Documento",
      montoOperacion: "Monto",
      puntajeAsignado: "Puntaje Asignado",
      fechaAsignacionPuntaje: "Fecha Asignacion",
      ultimoPuntajeUtilizado: "Ultimo Puntaje Utilizado",
      fechaCaducidadPuntaje: "Fecha Caducidad",
      saldoPuntos: "Saldo Puntos",
      status: "Estado",
    },
    title: "Agregar premio"
  }

  const [state, setState] = useState(initialState)

  const [isPuntoEmpty, setisPuntoEmpty] = useState(true);
  const [bolsaPuntos, setBolsaPuntos] = useState('')
  const formatedData = formatDataPuntos(bolsaPuntos)

  //onchange correspondiente para hacer la busqueda 
  const handleSearch = data => {
    setState(prev => ({
      ...prev,
      filtros: {
        ...prev.filtros,
        nombre: data,
      },
    }))
  }

  useEffect(() => {

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
  }, [])

  return (

    <Container fluid={true} className="main-content">
      <div className="mt-4">
        <h5>Lista de puntos</h5>
      </div>
      <Row className="mb-3">
        <Col>
          <SearchTable
            placeholder='Buscar definicion puntos...'
            handleChange={handleSearch}
          />
        </Col>
      </Row>
      <Table headers={state.headers} data={formatedData} />
    </Container>


  )
}

export default Puntos;