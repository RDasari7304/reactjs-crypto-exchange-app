import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { fetchApi } from "../TestData/dbfunctions";

export default function CryptoGraph({setChartLoaded, crypto, type, simple}){
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    async function fetch(days){
        const result = await fetchApi('http://localhost:3001/fetchAPI', {
            params: {vs_currency: 'USD', days: days, precision: 6},
            endpoint: `https://api.coingecko.com/api/v3/coins/${crypto.coin_id.toLowerCase()}/market_chart`,
            headers: {'x-cg-demo-api-key': 'CG-o1pXq1qe5ANQmCa4dd5yQZza', 'Accept': 'application/json'}
        });

        const {data} = result;
        const prepared_data = Object.entries(data.prices).map((data_point) => {
            const data_piece = data_point[1];
            const date = new Date(data_piece[0]);
            const time_stamp_sections = date.toString().split(" ");
            
            const month = time_stamp_sections[1];
            const day = time_stamp_sections[2];
            const year = time_stamp_sections[3];
            const hour = date.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
            
            const time_stamp = `${month} ${day}, ${year} ${hour}`
            return {time_stamp: time_stamp, price: data_piece[1]};
        });
        
        return prepared_data;
    }

    useEffect(() => {
        console.log(crypto);
        
        async function prepare_data(){
            await setData({
                'hourly': await fetch(1/24),
                'daily': await fetch(1),
                'weekly': await fetch(7),
                'monthly': await fetch(28),
                'yearly': await fetch(365)
            });

            setLoading(false);
            setChartLoaded ? setChartLoaded(true) : <></>;
        }
        
        prepare_data();

    }, []);
    
    function CreateGraph(data){
        console.log(data[type]);
        if(!data[type]) return null;
        return(
            <ResponsiveContainer width="100%" height={400} >
                <AreaChart data={data[type]}  margin={{ top: 10, right:0, left: -40, bottom: 0 }}>
                    <defs>
                        <linearGradient id='priceGradient' x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F0B90B" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#F0B90B" stopOpacity={0.05} />

                        </linearGradient>
                    </defs>
                    <Area 
                    type= "monotone"
                    dataKey="price" 
                    stroke="#F0B90B"
                    strokeWidth={2} 
                    fill="url(#priceGradient)"/>

                    <XAxis 
                    tick= {simple ? false : {dy:5 , dx: 20}}
                    dataKey="time_stamp" 
                    axisLine={false} 
                    tickLine={false} 
                    tickCount={simple ? 0 : 7} 
                    tickFormatter={(dateStr) => {
                        const time = dateStr.split(" ").slice(3, 5).join(' ');
                        const date = dateStr.split(" ").slice(0, 2).join(' ').replace(",", "");
                        
                        return type == 'hourly' || type == 'daily' ? time : date;
                    }}
                    interval={Math.ceil(data[type].length / 7)}
                    />
                    <YAxis domain={[crypto.low_24 - (crypto.high_24 - crypto.low_24) * 0.05, crypto.high_24- (crypto.high_24 - crypto.low_24) * 0.05]} tickLine={false} axisLine={false} tickCount={0}/>
                    
                    {!simple && <Tooltip content={<CustomToolTip />}/>}
                </AreaChart>
            </ResponsiveContainer>
        )
    }

    function CustomToolTip({active, payload, label}){
        console.log(payload);
        if(active && payload && payload.length){
            const date = label;
            const price = payload[0].value;
            const formattedPrice = price > 0.1 ? Number(price.toFixed(4)).toLocaleString('en', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
            }) : price;


            return(
                <div className='flex flex-col justify-center items-center bg-white px-5 py-2 rounded-md'>
                    <h4 className='tooltip-date text-slate-500'>{date}</h4>
                    <h3 className='tooltip-balance text-slate-600 font-semibold text-sm m-1 ml-auto' style={{'fontSize': '16px'}}>$ {formattedPrice} USDT</h3>
                </div>
            )
        }
    
        return null;
    }

    return (
            loading ?
                <div className="border-gray-300 m-auto h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" /> 
                :
                (CreateGraph(data))
        
    );
}