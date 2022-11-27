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
        return <div className="available"><span >Disponible </span><ion-icon name="checkmark-circle-outline"></ion-icon></div>
    }
    if (vencimiento < today) {
        return <div className="expired"><span >Expirado </span><ion-icon name="alarm-outline"></ion-icon></div>
    }
    if (status === false) {
        return <div className="notavailable"><span >No disponible</span> <ion-icon name="alert-circle-outline"></ion-icon></div>
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
                    fechaNacimiento: item.fechaNacimiento,
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
                [item.uid]: {
                    id: item.uid,
                    description: item.description,
                    limitInferior: item.limitInferior + " Gs.",
                    limitSuperior: item.limitSuperior + " Gs.",
                    equivalencia: item.equivalencia + " Pts.",
                    actions: 'x x',
                }
            }
        })
    }
    return obData
}