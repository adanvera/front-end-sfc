import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Punto from '../../Models/Punto';
import TableBodyPunto from './TableBodyPunto';

//Datos solo para pruebas
const punto1 = new Punto('01', 'Vale de Consumision', '50')
const punto2 = new Punto('02', 'Vale de Descuento', '100')

function Puntos() {
  const [isPuntoEmpty, setisPuntoEmpty] = useState(true);
  const [puntos, setPuntos] = useState([punto1,punto2]);
  
 
  

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Codigo</th>
          <th>Descripcion</th>
          <th>Puntos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {isPuntoEmpty ? (
          puntos.map((punto,i) => {
            
            return  (<TableBodyPunto punto = {punto} />)

          
          })


        ) : (
          <>
            NO hay puntos
          </>
        )

        }

      </tbody>
    </Table>
  );
}

export default Puntos;