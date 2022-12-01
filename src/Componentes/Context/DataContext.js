import { createContext, useContext, useEffect, useState } from 'react'
import { USER } from '../Commons/Endpoint'


export const DataContext = createContext()

/**valores iniciales y seteos correspondientes
 * en el caso de que ya se haya accedido mediante el localstorage 
 * se iran seteando para que tengan su valor correspondiente y esten disponible los datos
 * obtenidos en los componentes en donde sean llamados
 */
const initialState = {
    user: {
        id: localStorage.getItem("id") ? localStorage.getItem("id") : '',
        nombre: '',
        apellido: '',
        email: '',
        status: '',
        document: '',
    },
}

export const DataProvider = ({ children }) => {

    /**seteamos los valores correspondientes al usuario */
    const [user, setUser] = useState(initialState)
    const [idAuthed, setIdAuthed] = useState()
    const [modalstatus, setModalStatus] = useState(false)
    const [modalType, setModalType] = useState('')


    useEffect(() => {

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const idUser = localStorage.getItem("id") ? localStorage.getItem("id") : ''
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        setIdAuthed(idUser)

        /**consulta para obtener datos del usuario logueado */
        const getUser = async () => {
            try {
                const res = await fetch(USER + idUser, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'token': token
                    },
                }),
                    json = await res.json()
                setUser(json)
            } catch (error) {
                console.log(error);
            }
        }
        getUser()


    }, []);

    return (
        <DataContext.Provider
            value={{
                user, setUser,
                idAuthed, setIdAuthed, modalstatus, setModalStatus,
                modalType, setModalType
            }}>
            {children}
        </DataContext.Provider>
    )
}