import rndr from '../../../Images/PortfolioPage/CryptoLogos/rndr.png';
import btc from '../../../Images/PortfolioPage/CryptoLogos/btc.png';
import ape from '../../../Images/PortfolioPage/CryptoLogos/ape.png';
import fil from '../../../Images/PortfolioPage/CryptoLogos/fil.png';
import TableHeader from './TableComponents/TableHeader';
import CryptoData from './TableComponents/CryptoData';

export default function BrowserTable({data}){
    const abrToLogo = {
        "rndr": rndr,
        "btc": btc,
        "fil": fil,
        "ape": ape
    }

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
                        <CryptoData key={crypto.abr} crypto={crypto.name} logoSrc={abrToLogo[crypto.abr]} pair={crypto.pair} price= {crypto.price} change={crypto.change} volume={crypto.volume}/>
                    )
                })}
            </tbody>
        </table>

    );
}