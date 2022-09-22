import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Punto from '../../Models/Punto';
import { formatDataPuntos } from '../Commons/helpers';
import SearchTable from '../Commons/SearchTable';
import Table from '../Commons/Tables/Table';
import AddPuntos from './AddPuntos';

//Datos solo para pruebas
const punto1 = new Punto('01', 'Vale de Consumision', '50')
const punto2 = new Punto('02', 'Vale de Descuento', '100')

const dataPuntos = [
  {
    "id": "1",
    "description": "Vale de Consumision",
    "puntosrequeridos": "50",
  },
  {
    "id": "2",
    "description": "Vale de Descuento",
    "puntosrequeridos": "100",
  },
]

const formatedData = formatDataPuntos(dataPuntos)

function Puntos() {

  const initialState = {

    headers: {
      id: '#',
      description: "Descripcion",
      puntosrequeridos: "Puntos requeridos",
      actions: "Acciones"
    },
    title: "Agregar premio"
  }

  const [state, setState] = useState(initialState)

  const [isPuntoEmpty, setisPuntoEmpty] = useState(true);
  const [puntos, setPuntos] = useState([punto1, punto2]);

  const [modalShow, setModalShow] = useState(false);

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
        <Col className="ordercol" >
          <div className="col-md-6" id='adduser' onClick={() => setModalShow(true)}>
            <button className=" button btn-add ml-2">Definir nuevo punto</button>
          </div>
        </Col>
      </Row>
      <AddPuntos title={state?.title} show={modalShow} onHide={() => setModalShow(false)} />
      <Table headers={state.headers} data={formatedData} />
    </Container>


  )
}

export default Puntos;