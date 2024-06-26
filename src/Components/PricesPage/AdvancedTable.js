import AdvancedData from "../TableComponents/AdvancedData";
import TableHeader from "../TableComponents/TableHeader";
import { Logos } from "../LogoComponents";
import TablePagination from "../TableComponents/TablePagination";
import { useContext } from "react";
import { CryptoContext } from "../../App";

export default function AdvancedTable({data, setData, comparisonPair}){
    const [, , , userData] = useContext(CryptoContext);
    const {favorites} = userData;

    return (
        <table className="border-collapse table-auto w-full text-sm mt-4">
            <colgroup>
                <col style={{width: '5%'}} />
                <col style={{width: '12%'}} />
                <col style={{width: '12%'}} />
                <col style={{width: '12%'}} />
                <col style={{width: '12%'}} />
                <col style={{width: '12%'}} />
                <col style={{width: '12%'}} />
                <col style={{width: '10%'}} />
                <col style={{width: '14%'}} />
            </colgroup>

            <thead>
                <TableHeader headerName={''}/>
                <TableHeader headerName={'Pair Name'}/>
                <TableHeader headerName={'Pair Price'}/>
                <TableHeader headerName={'Daily Change'}/>
                <TableHeader headerName={'Daily Volume'}/>
                <TableHeader headerName={'Circulating Supply'}/>
                <TableHeader headerName={'Total Supply'}/>
                <TableHeader headerName={'Market Cap'}/>
                <TableHeader headerName={''}/>
            </thead>
            <tbody>
                {data ? data.map((crypto) => {
                    return crypto.display && <AdvancedData
                     name={crypto.name} 
                     pair={crypto.abr + ` / ${comparisonPair}`}
                     logoSrc={Logos[crypto.abr.toLowerCase()]}
                     price={crypto.price} 
                     change={crypto.change} 
                     volume={crypto.volume} 
                     market_cap={crypto.market_cap}
                     circulating_supply={crypto.circulating_supply}
                     total_supply={crypto.total_supply}
                     isFavorited={favorites.includes(crypto.abr)}
                     />
                }) : <p></p>}
                <tr>
                    <td colSpan="9">
                        <TablePagination data={data} setData= {setData} numPageEntities={20 }/>
                    </td>
                </tr>
                
            </tbody>
        </table>
    );
}