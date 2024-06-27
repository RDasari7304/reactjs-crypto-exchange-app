export default function TableHeader({headerName, icon}){

    return (
        <th className="border-b font-extralight p-4 text-left" style={{'fontSize': '12px', 'fontFamily': 'Calibri'}}>
            <div className="flex items-center">
                <p className="mr-4">{headerName}</p>
                {icon}
            </div>
        </th>
    )
}