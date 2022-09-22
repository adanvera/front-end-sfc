import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Cliente from '../../Models/Usuario';
import { formatedDataCliente } from '../Commons/helpers';
import SearchTable from '../Commons/SearchTable';
import Table from '../Commons/Tables/Table';
import AddClient from './AddCliente';

//Datos solo para pruebas
const cliente1 = new Cliente('Juan', 'Barrios', '543545', 'CI', 'P', 'marcelo@asf.com', '098776', '24/06/1999')
const cliente2 = new Cliente('Marcelo', 'Rivas', '32412341', 'CI', 'P', 'marcelo@afasdadfs.com', '098776', '24/06/1999')

function DatosCliente() {

  const initialState = {
    headers: {
      "id": "#",
      "nombre": "Nombre",
      "apellido": "Apellido",
      "documento": "Nro. Documento",
      "tipodoc": "Tipo de documento",
      "nacionalidad": "Nacionalidad",
      "correo": "Correo",
      "telefono": "Teléfono",
      "fechanacimiento": "Fecha de nacimiento",
      "actions": "Acciones"
    },
    title: 'Agregar cliente'
  }

  const [state, setState] = useState(initialState)

  const [isClientEmpty, setIsClientEmpty] = useState(true);
  const [clientes, setClientes] = useState([cliente1, cliente2]);


  const dataClient = [
    {
      "id": "1",
      "nombre": "Juan",
      "apellido": "Barrios",
      "documento": "4556443",
      "tipodoc": "cedula",
      "nacionalidad": "PARAGUAYA",
      "correo": "marcelo@asf.com",
      "telefono": "0987778895",
      "fechanacimiento": "24/06/1999",
    },
    {
      "id": "2",
      "nombre": "Miguel",
      "apellido": "Villamayor",
      "documento": "4558996",
      "tipodoc": "cedula",
      "nacionalidad": "PARAGUAYA",
      "correo": "miguel@asf.com",
      "telefono": "0987778895",
      "fechanacimiento": "24/06/1997",
    },
    {
      "id": "3",
      "nombre": "Adán",
      "apellido": "Vera",
      "documento": "4231937",
      "tipodoc": "cedula",
      "nacionalidad": "PARAGUAYA",
      "correo": "adan@asf.com",
      "telefono": "098877887",
      "fechanacimiento": "06/01/1997",
    },
  ]

  const formatedData = formatedDataCliente(dataClient)


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

  const [modalShow, setModalShow] = useState(false);


  return (
    <Container fluid={true} className="main-content">
      <div className="mt-4">
        <h5>Lista de clientes</h5>
      </div>
      <Row className="mb-3">
        <Col>
          <SearchTable
            placeholder='Buscar un cliente...'
            handleChange={handleSearch}
          />
        </Col>
        <Col className="ordercol" >
          <div className="col-md-6" id='adduser' onClick={() => setModalShow(true)}>
            <button className=" button btn-add ml-2">Agregar cliente</button>
          </div>
        </Col>
      </Row>
      <AddClient title={state?.title} clientes ={dataClient} show={modalShow} onHide={() => setModalShow(false)} />
      <Table headers={state.headers} data={formatedData} />
    </Container>
  )
}

export default DatosCliente;