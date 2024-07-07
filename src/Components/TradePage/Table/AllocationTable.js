import TableHeader from "../../TableComponents/TableHeader";
import Allocation from "./Allocation";
import SortSymbol from '../../TableComponents/SortSymbol';
import { useState } from "react";

export default function AllocationTable({allocations, cryptos}){
    const [ascending, setAscending] = useState(false);
    const allocatedCryptos = cryptos.filter((crypto) => Object.keys(allocations).includes(crypto.abr.toUpperCase())).reduce((acc, crypto) => {
        acc[crypto.abr.toUpperCase()] = crypto;
        return acc;
    }, {});

    const totalAssets = Object.entries(allocations).reduce((acc, [key,value]) => {
        return acc + value.amount; 
    }, 0);


    return (
        <table className="border-collapse table-auto w-full text-sm mt-4">
            <colgroup>
                <col style={{'width' : '40%'}} />
                <col style={{'width' : '23%'}} />
                <col style={{'width' : '23%'}} />
                <col style={{'width' : '5%'}} />
            </colgroup>
            <thead>
                <TableHeader headerName={'Asset'} fontWeight="font-semibold" padding={'py-1 px-2'} fontSize="14px"/>
                <TableHeader headerName={'Allocation'} fontWeight="font-semibold" padding={'py-1 px-2'} fontSize="14px"/>
                <TableHeader 
                headerName={'Balance'} 
                fontWeight="font-semibold" 
                padding={'py-1 px-2'} 
                fontSize="14px"  
                    icon= {<SortSymbol ascending={ascending} active={true} onClick={() => setAscending(!ascending)}/>}/>
                <TableHeader />
            </thead>
            <tbody>
                {
                    Object.entries(allocations).sort(([, value], [, value2]) => ascending ?
                                                                                     value.amount - value2.amount  
                                                                                     : value2.amount - value.amount).map(([key, value]) => 
                    {
                        const allocatedCrypto = allocatedCryptos[key];
                        return <Allocation 
                            symbol={key}
                            name= {allocatedCrypto.name}
                            index= {allocatedCrypto.index}
                            imgSrc={allocatedCrypto.imgSrc}
                            allocation={parseFloat(((value.amount / totalAssets) * 100).toFixed(2))}
                            balance={value.amount.toFixed(2)}
                            fiat={allocatedCrypto.price}
                        />
                    })
                }
            </tbody>
        </table>
    );
}