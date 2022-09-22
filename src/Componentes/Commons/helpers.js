export const formatDataPuntos = (data) => {

    let obData = {}

    if (data) {
        data.forEach(item => {
            obData = {
                ...obData,
                [item.id]: {
                    id: item.id,
                    description: item.description,
                    puntosrequeridos: item.puntosrequeridos,
                    actions: 'x x',
                }
            }
        })
    }
    return obData
}

export const formatedDataCliente = (data) => {
    let obData = {}
    if (data) {
        data.forEach(item => {
            obData = {
                ...obData,
                [item.id]: {
                    id: item.id,
                    nombre: item.nombre,
                    apellido: item.apellido,
                    documento: item.documento,
                    tipodoc: item.tipodoc,
                    nacionalidad: item.nacionalidad,
                    correo: item.correo,
                    telefono: item.telefono,
                    fechanacimiento: item.fechanacimiento,
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