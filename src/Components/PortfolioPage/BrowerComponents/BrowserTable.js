import rndr from '../../../Images/PortfolioPage/CryptoLogos/rndr.png';
import btc from '../../../Images/PortfolioPage/CryptoLogos/bitcoin.png';
import TableHeader from './TableComponents/TableHeader';
import CryptoData from './TableComponents/CryptoData';

export default function FavoritesTable({data}){
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
                <CryptoData crypto='Render Token' logoSrc={rndr} pair= 'RNDR / USDT' price= '7.745' change ='-1.87' volume= '500,242.63'/>
                
                <CryptoData crypto='Bitcoin' logoSrc={btc} pair= 'BTC / USDT' price= '65,433.74' change ='-1.87' volume= '5,000,242.63'/>
            </tbody>
        </table>

    );
}