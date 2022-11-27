import React from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { PREMIOS } from '../Commons/Endpoint';

function PremiosActions(props) {

    const handleDelete = async (e) => {
        const id = e.target.value;

        //llamamos a la API y le pasamos el documento , la API no es un adivino 
        try {
            let isDeleted = false
            let data = await Swal.fire({
                title: 'ATENCIÓN',
                text: "¿Estas seguro de eliminar este premio?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    isDeleted = true
                }
            })

            if (isDeleted) {

                const req = await fetch(PREMIOS + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },

                }),
                    res = await req.json()
                if (!req.ok) toast.error('Ocurrio un error')
                toast.success("Premio eliminado exitosamente")
                setTimeout(() => {
                    window.location.reload()
                }, 1300)
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleEdit = async (e) => {
        props.btnEdit({ status: true, id: e.target.value })
        console.log(e.target.value);
    }

    return (
        <div className="actions">
            <button className='btn btn-danger btn-sm' value={props.id} onClick={(e) => handleDelete(e)}  >Eliminar</button>
            <button className='btn btn-primary btn-sm m-1' value={props.id} onClick={(e) => handleEdit(e)} >Editar</button>
        </div>
    )
}

export default PremiosActions