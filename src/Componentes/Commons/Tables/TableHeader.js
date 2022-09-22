function TableHeader(props) {

    const header = props?.headers
    return (
        <thead>
            <tr className="table-header">
                {Object.keys(header).map(item => {
                    return (
                        <th className="al" key={item}>
                            <div className='is-inline-flex'>
                                <a href='/' className="btnSort" id={item}>
                                    <span className="is-uppercase">{header[item]}</span>
                                </a>
                            </div>
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}

export default TableHeader;