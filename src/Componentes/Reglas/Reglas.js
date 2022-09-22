import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { formatDataRegla } from '../Commons/helpers'
import SearchTable from '../Commons/SearchTable'
import Table from '../Commons/Tables/Table'
import AddRegla from './AddRegla'

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

    const [modalShow, setModalShow] = useState(false);

    const dataRegla = [
        {
            "id": "1",
            "description": "Regla 1",
            "limiteinferior": "0 Gs.",
            "limitesuperior": "80.000 Gs.",
            "equivalencia": "18 pts.",
        },
        {
            "id": "2",
            "description": "Regla 2",
            "limiteinferior": "80.000 Gs.",
            "limitesuperior": "160.000 Gs.",
            "equivalencia": "68 pts.",
        },
        {
            "id": "3",
            "description": "Regla 3",
            "limiteinferior": "160.000 Gs.",
            "limitesuperior": "300.000 Gs.",
            "equivalencia": "98 pts.",
        },

    ]

    const formatedData = formatDataRegla(dataRegla)

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
        <Container fluid={true} md={12} >
            <div className="mt-4">
                <h5>Lista de reglas</h5>
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
            <AddRegla title={state?.title} show={modalShow} onHide={() => setModalShow(false)} />
            <Table headers={state.headers} data={formatedData} />
        </Container>
    )
}

export default Reglas