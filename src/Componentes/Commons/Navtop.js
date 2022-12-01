import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import DatosCliente from '../AdministracionDatosCliente/DatosCliente';

function Navtop() {
    const token = localStorage.getItem('mostrar')
    return (
        <>
            {
                token !== null ?
                    <Navbar bg="light" expand="lg">
                        <Container fluid={true} >
                            <Navbar.Brand><Link to="/dashboard">Sistema de fidelización</Link></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Link to="/clientes">Clientes</Link>
                                    <Link to="/bolsapuntos">Bolsa puntos</Link>
                                    <Link to="/reglas">Reglas</Link>
                                    <Link to="/canjes">Canjes</Link>
                                    <Link to="/compras">Compras</Link>
                                    <Link to="/premios">Premios</Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar> : ''
            }

        </>

    );
}

export default Navtop;