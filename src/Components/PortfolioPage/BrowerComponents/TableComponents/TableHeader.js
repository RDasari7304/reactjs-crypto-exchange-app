export default function TableHeader({headerName}){
    return (
        <th className="border-b font-extralight p-4 text-left" style={{'fontSize': '12px'}}>{headerName}</th>
    )
}