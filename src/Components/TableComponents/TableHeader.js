export default function TableHeader({headerName, icon, padding='p-4', textColor='', fontWeight='font-extralight', fontSize='12px'}){

    return (
        <th className={`border-b ${fontWeight} ${padding} text-left`} style={{'fontSize': fontSize, 'fontFamily': 'Calibri'}}>
            <div className="flex items-center">
                <p className={`mr-4 ${textColor}`}>{headerName}</p>
                {icon}
            </div>
        </th>
    )
}