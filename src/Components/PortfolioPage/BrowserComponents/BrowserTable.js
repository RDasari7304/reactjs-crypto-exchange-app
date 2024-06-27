import TableHeader from '../../TableComponents/TableHeader';
import SimpleData from '../../TableComponents/SimpleData';

export default function BrowserTable({data, isFavoritable, isBrowser, showHeaders}){

    return (
        <table className="border-collapse table-auto w-full text-sm">
            {/* Column group allows to style each individual column */}
            {isBrowser ? 
                <colgroup> 
                    <col style={{width: '25%'}} />
                    <col style={{width: '25%'}} />
                    <col style={{width: '25%'}} />
                    <col style={{width: '25%'}} />
                </colgroup> 
                : 
                <colgroup> 
                    <col style={{width: '30%'}} />
                    <col style={{width: '23%'}} />
                    <col style={{width: '23%'}} />
                    <col style={{width: '23%'}} />
                </colgroup>
            }
            <thead>
                {showHeaders &&
                <tr>
                    <TableHeader headerName='Pair' sortable= {false}/>
                    <TableHeader headerName='Price' sortable={true}/>
                    <TableHeader headerName='24 Hour Change' sortable={true}/>
                    <TableHeader headerName='24 Hour Volume' sortable={true}/>
                </tr>}
            </thead>
            <tbody>
                {Object.values(data).map((crypto) => {
                    if(!isBrowser && !crypto.display){
                        return null;
                    }

                    return (
                        <SimpleData 
                        key={crypto.abr} 
                        crypto={crypto.name} 
                        abr={crypto.abr}
                        logoSrc={crypto.imgSrc} 
                        pair={crypto.abr + ' / USDT'} 
                        price= {crypto.price} 
                        change={crypto.change} 
                        volume={crypto.volume} 
                        customs={{favoritable: isFavoritable, isBrowser: isBrowser}}
                        />
                    )
                })}
            </tbody>
        </table>

    );
}