import React from 'react'
import { REGLA_DEV } from '../Commons/Endpoint';
const ReglaActions = (props) => {
    const handleDelete = async (e) => {
        const id = e.target.value;


        try {
            const req = await fetch(REGLA_DEV + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

            }),
                res = await req.json()
            console.log('Eliminamos la regla');
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }
    const handleEdit = async (e) => {
        props.btnEdit(true)
        console.log('Editando');
        console.log(e.target.value);
    }
    return (
        <div className="actions">
            <button className='btn btn-danger btn-sm' value={props.id} onClick={(e) => handleDelete(e)}  >Eliminar</button><button className='btn btn-primary btn-sm m-1' value={props.id} onClick={(e) => handleEdit(e)} >Editar</button>
        </div>
    )
}

export default ReglaActions