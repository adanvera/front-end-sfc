
function TableBody({cliente},) {
    

  return (

                <tr>
                  <td>{1}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.numero_documento}</td>
                  <td>{cliente.tipo_documento}</td>
                  <td>{cliente.nacionalidad}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.fecha_nacimiento}</td>
                  <td className='mx-auto '><button className='btn btn-danger btn-sm' >Eliminar</button><button className='btn btn-primary btn-sm m-1'>Editar</button></td>
                </tr>

  );
}

export default TableBody;