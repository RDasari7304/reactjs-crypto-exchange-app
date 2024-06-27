import AdvancedData from "../TableComponents/AdvancedData";
import TableHeader from "../TableComponents/TableHeader";
import { Logos } from "../LogoComponents";
import TablePagination from "../TableComponents/TablePagination";
import { useContext, useState } from "react";
import { CryptoContext } from "../../App";
import SortSymbol from '../TableComponents/SortSymbol';

export default function AdvancedTable({data, setData, comparisonPair}){
    const [, , , userData] = useContext(CryptoContext);
    const {favorites} = userData;
    const [sortKey, setSortKey] = useState('id');
    const [ascending, setAscending] = useState(true);

    function toggleSort(newKey){
        setAscending(newKey == sortKey ? !ascending : true);
        setSortKey(newKey);
    }


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
                <TableHeader headerName={'Pair Price'} icon= {<SortSymbol ascending={ascending} active={sortKey == 'price'} onClick={() => toggleSort('price')}/>}/>
                <TableHeader headerName={'Daily Change'}  icon= {<SortSymbol ascending={ascending} active={sortKey == 'change'} onClick={() => toggleSort('change')}/>}/>
                <TableHeader headerName={'Daily Volume'}  icon= {<SortSymbol ascending={ascending} active={sortKey == 'volume'} onClick={() => toggleSort('volume')}/>}/>
                <TableHeader headerName={'Circulating Supply'}  icon= {<SortSymbol ascending={ascending} active={sortKey == 'circulating_supply'} onClick={() => toggleSort('circulating_supply')}/>}/>
                <TableHeader headerName={'Total Supply'} icon= {<SortSymbol ascending={ascending} active={sortKey == 'total_supply'} onClick={() => toggleSort('total_supply')} />}/>
                <TableHeader headerName={'Market Cap'}  icon= {<SortSymbol ascending={ascending} active={sortKey == 'market_cap'}  onClick={() => toggleSort('market_cap')}/>}/>
                <TableHeader headerName={''}/>
            </thead>
            <tbody>
                {data ? data.sort((a, b) => ascending ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]).map((crypto) => {
                    return crypto.display && <AdvancedData
                     key={crypto.id}
                     name={crypto.name} 
                     abr={crypto.abr}
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