import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Cliente from '../../Models/Usuario';
import { CLIENT_DEV } from '../Commons/Endpoint';
import { formatedDataCliente } from '../Commons/helpers';
import SearchTable from '../Commons/SearchTable';
import Table from '../Commons/Tables/Table';
import AddClient from './AddCliente';
import EditCliente from './EditCliente';


function DatosCliente() {

  const initialState = {
    headers: {
      
      "nombre": "Nombre",
      "apellido": "Apellido",
      "tipoDocumento": "Tipo de documento",
      "documento": "Nro. Documento",
      "nacionalidad": "Nacionalidad",
      "correo": "Correo",
      "telefono": "Teléfono",
      
      "actions": "Acciones"
    },
    title: 'Agregar cliente'
  }

  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState('')
  const [editModal,setEditModal] = useState(false) 
  const formatedData = formatedDataCliente(client)
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


  useEffect(() => {
    const getClient = async () => {
      const req = await fetch(CLIENT_DEV),
        res = await req.json()

      if (!req.ok) return
      setClient(res?.clients)
      setLoading(false)
    }
    getClient()
  }, [])


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
      <AddClient title={state?.title} clientes={client} show={modalShow} onHide={() => setModalShow(false)} />
      <EditCliente title={'Editar'} clientes={client} show={editModal} onHide={() => setEditModal(false)} />
      {loading === true ? (null) : (<Table headers={state.headers} data={formatedData} btnEdit = {setEditModal} />)}

    </Container>
  )
}

export default DatosCliente;