import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Cliente from '../../Models/Usuario';
import TableBody from './TableBody';

//Datos solo para pruebas
const cliente1 = new Cliente('Juan', 'Barrios', '543545', 'CI', 'P', 'marcelo@asf.com', '098776', '24/06/1999')
const cliente2 = new Cliente('Marcelo', 'Rivas', '32412341', 'CI', 'P', 'marcelo@afasdadfs.com', '098776', '24/06/1999')

function DatosCliente() {
  const [isClientEmpty, setIsClientEmpty] = useState(true);
  const [clientes, setClientes] = useState([cliente1,cliente2]);
  
 
  

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Numero documento</th>
          <th>Tipo documento</th>
          <th>Nacionalidad</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Fecha nacimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {isClientEmpty ? (
          clientes.map((cliente,i) => {
            
            return  (<TableBody cliente = {cliente} />)

          
          })


        ) : (
          <>
            NO hay clientes
          </>
        )

        }

      </tbody>
    </Table>
  );
}

export default DatosCliente;