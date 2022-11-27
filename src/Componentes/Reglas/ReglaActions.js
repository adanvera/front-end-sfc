import React from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { REGLA_DEV } from '../Commons/Endpoint';


function ReglaActions(props) {

    const handleDelete = async (e) => {
        const id = e.target.value;
        try {
            let isDeleted = false
            let data = await Swal.fire({
                title: 'ATENCIÓN',
                text: "¿Estas seguro de eliminar este rol?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                width: '400px',
            }).then((result) => {
                if (result.isConfirmed) {
                    isDeleted = true
                }
            })

            console.log("is delte", isDeleted);
            if (isDeleted) {

                const req = await fetch(REGLA_DEV + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },

                }),
                    res = await req.json()
                if (!req.ok) toast.error('Ocurrio un error al eliminar la regla');
                toast.success("Regla eliminado existosamente");
                setTimeout(() => {
                    window.location.reload()
                }, 1300)

            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleEdit = async (e) => {
        console.log(e.target.value);
        props.btnEdit({ status: true, id: e.target.value })
    }

    return (
        <div className="actions">
            <button className='btn btn-danger btn-sm' value={props.id} onClick={(e) => handleDelete(e)}  >Eliminar</button>
            <button className='btn btn-primary btn-sm m-1' value={props.id} onClick={(e) => handleEdit(e)} >Editar</button>
        </div>
    )
}

export default ReglaActions