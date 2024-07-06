import TableHeader from "../../TableComponents/TableHeader";
import Transaction from "./Transaction";

export default function TransactionsTable({cryptos, assets}){
    const transactions = Object.entries(assets).flatMap(([key, value]) => value.transactions.map((transaction) => ({...transaction, abr: key})));

    return (
        <table className="border-collapse table-auto w-full text-sm mt-4">
            <colgroup>
                <col style={{'width' : '25%'}} />
                <col style={{'width' : '25%'}} />
                <col style={{'width' : '25%'}} />
                <col style={{'width' : '25%'}} />
            </colgroup>
            <thead className="bg-gray-50 ">
                <TableHeader headerName={'Asset'} padding={'py-1 px-2'} textColor="text-gray-400"/>
                <TableHeader headerName={'Asset Price'} padding={'py-1 px-2'} textColor="text-gray-400"/>
                <TableHeader headerName={'Amount'} padding={'py-1 px-2'} textColor="text-gray-400"/>
                <TableHeader headerName={'Date'} padding={'py-1 px-2'} textColor="text-gray-400"/>
            </thead>
            <tbody>
                    {transactions.sort((a, b) => a.transaction_id - b.transaction_id).map((transaction) => {
                        const asset = cryptos.filter((crypto) => crypto.abr.toUpperCase() == transaction.abr)[0];
                        return <Transaction
                                 asset={asset} 
                                 data= {transaction} />
                    })
                }
            </tbody>
        </table>
    );
}