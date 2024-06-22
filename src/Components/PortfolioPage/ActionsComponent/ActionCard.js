export default function ActionCard({cardTitle, imgSrc}){
    return (
        <div className="w-full h-28 bg-slate-100 m-3 p-4 flex items-center cursor-pointer" style= {{'borderRadius': '4px'}}>
            <span className='flex-1' style={
                {'fontSize': '20px', 
                'color': 'rgb(11, 14, 17)', 
                'fontWeight': '600', 
                'lineHeight': '25px', 
                'letterSpacing' : '0.16px'}}> 
                    {cardTitle} 
            </span>
            <img className= 'h-20' src={imgSrc} alt= "Pay Someone"/>

        </div>
    )
}