export const formatDataPuntos = (data) => {

    let obData = {}

    if (data) {
        data.forEach(item => {
            obData = {
                ...obData,
                [item.uid]: {
                    documentoCliente: item.documentoCliente,
                    montoOperacion: item.montoOperacion + " Gs.",
                    puntajeAsignado: item.puntajeAsignado + " Pts.",
                    fechaAsignacionPuntaje: formatoDate(item.fechaAsignacionPuntaje),
                    ultimoPuntajeUtilizado: item.ultimoPuntajeUtilizado + " Pts.",
                    fechaCaducidadPuntaje: formatoDate(item.fechaCaducidadPuntaje),
                    saldoPuntos: verifySaldoPuntos(item.saldoPuntos),
                    status: verifyStatus(item.status, item.fechaCaducidadPuntaje),
                }
            }
        })
    }
    return obData
}

export const verifySaldoPuntos = (saldoPuntos) => {
    if (saldoPuntos === 0) {
        return <span className="sinsaldo">sin saldo</span>
    } else {
        return <span className="withsaldo">{saldoPuntos} pts.</span>
    }
}

export const verifyStatus = (status, dateVen) => {

    const vencimiento = new Date(dateVen) // fecha vencimiento
    const today = new Date() // fecha actual

    if (status === true) {
        return <span className="status">Disponible</span>
    }
    if (vencimiento < today) {
        return <span className="status">Expirado</span>
    }
    if (status === false) {
        return <span className="status">No disponible</span>
    }
}

export const formatoDate = (fecha) => {

    if (fecha != null) {
        const date = new Date(fecha)
        const dateFormat = date.getDate().toString().padStart(2, '0') + '/' +
            (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
            date.getFullYear()
            + ' ' + date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0') + 'hs'

        return dateFormat.toString()
    }
    return null
}


export const formatedDataCliente = (data) => {
    let obData = {}
    if (data) {
        data.forEach(item => {
            obData = {
                ...obData,
                [item.uid]: {
                    id: item.uid,
                    nombre: item.nombre,
                    apellido: item.apellido,
                    tipoDocumento: item.tipoDocumento,
                    documento: item.documento,
                    nacionalidad: item.nacionalidad,
                    correo: item.correo,
                    telefono: item.telefono,
                    actions: 'x x',
                }
            }
        })
    }
    return obData
}

export const formatDataRegla = (data) => {
    let obData = {}
    if (data) {
        data.forEach(item => {
            obData = {
                ...obData,
                [item.id]: {
                    id: item.id,
                    description: item.description,
                    limiteinferior: item.limiteinferior,
                    limitesuperior: item.limitesuperior,
                    equivalencia: item.equivalencia,
                    actions: 'x x',
                }
            }
        })
    }
    return obData
}