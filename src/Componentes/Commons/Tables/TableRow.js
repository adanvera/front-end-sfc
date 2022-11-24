import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import ClientesActions from "../../AdministracionDatosCliente/ClientesActions";
import PuntosActions from "../../puntos/PuntosActions";
import ReglaActions from "../../Reglas/ReglaActions";

export default function TableRow(props) {

    const { data } = props

    const { pathname } = useLocation();


    return (
        <tr key={data.id} className="rowtable">

            {Object.keys(data).filter(item => item !== 'id').map(col => {
                
                return (
                    <Fragment key={col}>
                        {
                            col === 'actions' ?
                                <td>
                                    {
                                        pathname === '/puntos' && <PuntosActions />
                                    }
                                    {
                                        pathname === '/clientes' && <ClientesActions id = {data.id}/>
                                    }
                                    {
                                        pathname === '/reglas' && <ReglaActions />
                                    }
                                    {
                                        pathname === '/' && <>a mimir</>
                                    }
                                </td>
                                :
                                <td>{(data[col])}</td>
                        }
                    </Fragment>
                )
            })}
        </tr>
    )
}