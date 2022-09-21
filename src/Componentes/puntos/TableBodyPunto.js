
function TableBodyPunto({punto},) {
    

  return (

                <tr>
                  <td>{1}</td>
                  <td>{punto.codigo}</td>
                  <td>{punto.descripcion}</td>
                  <td>{punto.puntos}</td>
                  <td className='mx-auto '><button className='btn btn-danger btn-sm' >Eliminar</button><button className='btn btn-primary btn-sm m-1'>Editar</button></td>
                </tr>

  );
}

export default TableBodyPunto;