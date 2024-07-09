import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {parseISO, format} from 'date-fns';

export default function BalanceGraph({data}){
    
        if(!data) return null;
        return(
            <ResponsiveContainer width="100%" height={300} >
                <AreaChart data={data}  margin={{ top: 10, right:0, left: -40, bottom: 0 }}>
                    <defs>
                        <linearGradient id='priceGradient' x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F0B90B" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#F0B90B" stopOpacity={0.05} />

                        </linearGradient>
                    </defs>
                    <Area 
                    type= "monotone"
                    dataKey="value" 
                    stroke="#F0B90B"
                    strokeWidth={2} 
                    fill="url(#priceGradient)"/>

                    <XAxis 
                    
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tickCount={7} 
                    tickFormatter={(dateStr) => {
                        const date = new Date(dateStr);
                        return format(date, "MMM d");
                    }}
                    interval={Math.ceil(data.length / 7)}
                    />


                    <Tooltip content={<CustomToolTip />}/>
                    <CartesianGrid opacity={0.25} vertical={false}/>
                </AreaChart>
            </ResponsiveContainer>
        )


}

function CustomToolTip({active, payload, label}){
    if(active){
        const date = format(label, "MMM d yyyy h:mm a");
        const formattedBalance = Number(payload[0].value.toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });


        return(
            <div className='flex flex-col justify-center items-center bg-white px-7 py-1 rounded-md'>
                <h4 className='tooltip-date text-slate-700'>{date}</h4>
                <h3 className='tooltip-balance text-slate-700'>$ {formattedBalance}</h3>
                <h2 className='tooltip-change'>-$43.03 / -2.03% </h2>
            </div>
        )
    }

    return null;
}