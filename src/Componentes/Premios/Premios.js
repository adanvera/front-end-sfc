import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import { PREMIOS } from '../Commons/Endpoint';
import { formatDataPremio } from '../Commons/helpers';
import SearchTable from '../Commons/SearchTable';
import Table from '../Commons/Tables/Table';
import AddPremio from './AddPremio';
import EditarPremio from './EditarPremio';



function Premios() {

    const initialState = {
        headers: {
            "descripcion": "Descripción",
            "equivalencia": "Equivalencia",
            "actions": "Acciones"
        },
        title: 'Agregar premio'
    }

    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const [premio, setPremios] = useState('')
    const [editModal, setEditModal] = useState({ status: false, id: '' })
    const formatedData = formatDataPremio(premio)
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

        const getPremios = async () => {
            const req = await fetch(PREMIOS),
                res = await req.json()
            setLoading(false)
            if (!req.ok) return
            setPremios(res?.premios)

        }
        getPremios()
    }, [])


    return (
        <Container fluid={true} className="main-content">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="mt-4">
                <h5>Lista de premios</h5>
            </div>
            <Row className="mb-3">
                <Col>
                    <SearchTable
                        placeholder='Buscar un premio...'
                        handleChange={handleSearch}
                    />
                </Col>
                <Col className="ordercol" >
                    <div className="col-md-6" id='adduser' onClick={() => setModalShow(true)}>
                        <button className=" button btn-add ml-2">Agregar premio</button>
                    </div>
                </Col>
            </Row>
            <AddPremio title={state?.title} premios={premio} show={modalShow} onHide={() => setModalShow(false)} />
            <EditarPremio title={'Editar'} premios={premio} show={editModal.status} uid={editModal.id} onHide={() => setEditModal(false)} />
            {loading === true ? (null) : (<Table headers={state.headers} data={formatedData} btnEdit={setEditModal} />)}

        </Container>
    )
}

export default Premios;