import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { REGLA_DEV } from '../Commons/Endpoint'
import { formatDataRegla } from '../Commons/helpers'
import SearchTable from '../Commons/SearchTable'
import Table from '../Commons/Tables/Table'
import AddRegla from './AddRegla'
import EditRegla from './EditRegla'
import { Toaster } from 'react-hot-toast';
function Reglas() {

    const initialState = {
        headers: {
            "id": "#",
            "description": "Descripcion regla",
            "limiteinferior": "Limite inferior",
            "limitesuperior": "Limite superior",
            "equivalencia": "Equivalencia",
            "actions": "Acciones"
        },
        title: 'Agregar regla'
    }

    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const [regla, setRegla] = useState('')
    const [editModal, setEditModal] = useState({status:false,id:''})
    const formatedData = formatDataRegla(regla)
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
      const getRegla = async () => {
        const req = await fetch(REGLA_DEV),
          res = await req.json()
  
        if (!req.ok) return
        setRegla(res?.reglas)
        setLoading(false)
      }
      getRegla()
    }, [])
  
  
    return (
      <Container fluid={true} className="main-content">
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <div className="mt-4">
          <h5>Lista de Reglas</h5>
        </div>
        <Row className="mb-3">
          <Col>
            <SearchTable
              placeholder='Buscar una regla...'
              handleChange={handleSearch}
            />
          </Col>
          <Col className="ordercol" >
            <div className="col-md-6" id='adduser' onClick={() => setModalShow(true)}>
              <button className=" button btn-add ml-2">Agregar regla</button>
            </div>
          </Col>
        </Row>
        <AddRegla title={state?.title} reglas={regla} show={modalShow} onHide={() => setModalShow(false)} />
        <EditRegla title={'Editar'} reglas={regla} show={editModal.status} uid = {editModal.id} onHide={() => setEditModal(false)} />
        {loading === true ? (null) : (<Table headers={state.headers} data={formatedData} btnEdit={setEditModal} />)}
  
      </Container>
    )
  }

export default Reglas