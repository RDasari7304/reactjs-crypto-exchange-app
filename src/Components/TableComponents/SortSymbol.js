export default function SortSymbol({onClick, ascending, active}){
    
    return (
        <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => onClick()}>
            <p 
            className={` ${ascending && active ? 'text-yellow-500' : 'text-gray-300'}`} 
            style={{ fontSize: active ? '10px' : '9px', margin: 0, lineHeight: 1 }}>▲</p>
            <p 
            className={` ${!ascending && active ? 'text-yellow-500' : 'text-gray-300'}`} 
            style={{ fontSize: active ? '10px' : '9px', margin: 0, lineHeight: 1 }}>▼</p>
        </div>
    );
}