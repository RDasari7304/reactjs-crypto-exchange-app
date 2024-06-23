import TableHeader from './TableComponents/TableHeader';
import CryptoData from './TableComponents/CryptoData';
import {Logos} from '../../LogoComponents';

export default function BrowserTable({data}){

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
                    <TableHeader headerName='Pair' />
                    <TableHeader headerName='Price' />
                    <TableHeader headerName='24 Hour Change' />
                    <TableHeader headerName='24 Hour Volume' />
                </tr>
            </thead>
            <tbody>
                {Object.values(data).map((crypto) => {
                    return(
                        <CryptoData key={crypto.abr} crypto={crypto.name} logoSrc={Logos[crypto.abr.toLowerCase()]} pair={crypto.pair} price= {crypto.price} change={crypto.change} volume={crypto.volume}/>
                    )
                })}
            </tbody>
        </table>

    );
}