export default function TableHeader({headerName, icon, padding='p-4', textColor=''}){

    return (
        <th className={`border-b font-extralight ${padding} text-left`} style={{'fontSize': '12px', 'fontFamily': 'Calibri'}}>
            <div className="flex items-center">
                <p className={`mr-4 ${textColor}`}>{headerName}</p>
                {icon}
            </div>
        </th>
    )
}