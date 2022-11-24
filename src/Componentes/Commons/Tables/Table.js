import TableHeader from "./TableHeader"
import TableRow from "./TableRow"



export default function Table(props) {
    
    const { data, headers } = props

    const listData = ((Object.keys(data).reverse().map(item => data[item])))

    return (
        <table className="table-list table">
            <TableHeader headers={headers} />
            <tbody>
                {
                    Object.keys(listData).map(item => {
                        return (
                            <TableRow key={listData[item]?.id} data={listData[item]} btnEdit = {props.btnEdit}/>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

