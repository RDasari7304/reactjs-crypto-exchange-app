import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {parseISO, format} from 'date-fns';

export default function Graph({data}){
    let iterator = 0;
    const filteredData = data.filter(() => {
        const result = iterator % 5 == 0;
        iterator += 1;
        return result;
    });


    return (
        <ResponsiveContainer width="100%" height= {300}>
            <AreaChart data={filteredData}>
                <defs>
                    <linearGradient id='gridGradient' x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F0B90B" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#F0B90B" stopOpacity={0.05} />

                    </linearGradient>
                </defs>

                <Area dataKey="value" stroke="#F0B90B" fill="url(#gridGradient)"/>
                <XAxis dataKey="date" axisLine= {false} tickLine= {false} padding={{left: 30, right: 30}} tickMargin={10} tickFormatter= {(dateStr) => {
                    const date = parseISO(dateStr);
                    return format(date, "MMM d");
                }}/>

                <Tooltip content={<CustomToolTip />}/>

                <CartesianGrid opacity={0.25} vertical={false}/>
            </AreaChart>
        </ResponsiveContainer>
    );
}

function CustomToolTip({active, payload, label}){
    if(active){
        const date = format(label, "MMM d yyyy");
        const formattedBalance = Number(payload[0].value.toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });


        return(
            <div className='flex flex-col justify-center items-center bg-slate  tooltip px-7 py-3'>
                <h4 className='tooltip-date text-slate-700'>{date}, 12:00 am</h4>
                <h3 className='tooltip-balance text-slate-700'>$ {formattedBalance}</h3>
                <h2 className='tooltip-change'>-$43.03 / -2.03% </h2>
            </div>
        )
    }

    return null;
}