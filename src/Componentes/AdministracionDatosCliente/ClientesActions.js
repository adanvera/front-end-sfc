import React from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { CLIENT_DEV } from '../Commons/Endpoint';

function ClientesActions(props) {
    
    const handleDelete = async (e) =>{
        const id = e.target.value;

        //llamamos a la API y le pasamos el documento , la API no es un adivino 
        try {
            let isDeleted = false
            let data = await Swal.fire({
                title: 'Estas seguro?',
                text: "Eliminaras un usuario!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si estoy!'
              }).then((result) => {
                if (result.isConfirmed) {
                    isDeleted = true
                }
              })
            
              console.log("is delte",isDeleted);
            if(isDeleted){

                const req = await fetch(CLIENT_DEV+id,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    
                }),
                res = await req.json()
                if(!req.ok)toast.error('Ocurrio un error')
                toast.success("Usuario eliminado correctamente")
                setTimeout(()=>{
                    window.location.reload()
                },1300)
                
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleEdit =  async (e) =>{
        props.btnEdit({status:true,id:e.target.value})
        console.log('Editando');
        console.log(e.target.value);
    }
    return (
        <div className="actions">
            <button className='btn btn-danger btn-sm' value={props.id} onClick={(e) => handleDelete(e)}  >Eliminar</button><button className='btn btn-primary btn-sm m-1' value={props.id} onClick={(e) => handleEdit(e)} >Editar</button>
        </div>
    )
}

export default ClientesActions