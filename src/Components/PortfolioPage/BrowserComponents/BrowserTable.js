import TableHeader from '../../TableComponents/TableHeader';
import SimpleData from '../../TableComponents/SimpleData';
import {Logos} from '../../LogoComponents';

export default function BrowserTable({data, customizable}){

    return (
        <table className="border-collapse table-auto w-full text-sm">
            {/* Column group allows to style each individual column */}
            <colgroup> 
                <col style={{width: '25%'}} />
                <col style={{width: '25%'}} />
                <col style={{width: '25%'}} />
                <col style={{width: '25%'}} />
            </colgroup>
            <thead>
                <tr>
                    <TableHeader headerName='Pair' sortable= {false}/>
                    <TableHeader headerName='Price' sortable={true}/>
                    <TableHeader headerName='24 Hour Change' sortable={true}/>
                    <TableHeader headerName='24 Hour Volume' sortable={true}/>
                </tr>
            </thead>
            <tbody>
                {Object.values(data).map((crypto) => {
                    return(
                        <SimpleData 
                        key={crypto.abr} 
                        crypto={crypto.name} 
                        logoSrc={Logos[crypto.abr.toLowerCase()]} 
                        pair={crypto.abr + ' / USDT'} 
                        price= {crypto.price} 
                        change={crypto.change} 
                        volume={crypto.volume} 
                        customizable= {customizable}
                        />
                    )
                })}
            </tbody>
        </table>

    );
}