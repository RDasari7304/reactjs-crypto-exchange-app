import Balance from "../Components/PortfolioPage/BalanceComponent/Balance";
import ActionSection from "../Components/PortfolioPage/ActionsComponent/ActionSection";
import { subDays } from 'date-fns';
import Browser from "../Components/PortfolioPage/BrowserComponents/Browser";
import { useContext, useState, useEffect } from "react";
import { CryptoContext } from "../App";
import { fetchCryptoHistory, formatDate } from "../TestData/services";

export default function ProfilePage(){
    const [data, setData] = useState([]);
    const [cryptos, , , userData] = useContext(CryptoContext);
    const [loading, setLoading] = useState(true);
    const [accountVal, setAccountVal] = useState(0);

    const balanceHistory = async () => {
        const transactions = Object.entries(userData.assets)
                            .map(([key, value]) => {
                                return value.transactions.map((transaction) => {
                                    return {...transaction, ...{'crypto': key}}
                                })
                            })
                            .reduce((acc, value) => {
                                return [...acc, ...value]
                            }, []);
        
        const cryptoHistories = await Promise.all(Object.entries(userData.allocated_cryptos).map(async ([key, crypto]) => {
            return {[key]: (await fetchCryptoHistory(crypto, 28))};
        }));

        const formattedCryptoHistories = cryptoHistories.reduce((acc, value) => {
            const key = Object.keys(value)[0];
            const val = Object.values(value)[0].reduce((historyAcc, dataPoint) => {
                const time_stamp_split = dataPoint.time_stamp.split(":");
                const formattedTimeStamp = time_stamp_split[0] + ' ' + time_stamp_split[1].substring(3, 5)
                historyAcc[formattedTimeStamp] = dataPoint.price
                return historyAcc;
            }, {});

            acc[key] = val;
            return acc;
        }, {});

        let USDTBalance = 50000;
        let allocated_cryptos = {};
        let tracked_transactions = [];
        
        const startingDate = new Date(userData.registration_date);
        const newData = [];
        let lastVal = 0;
        
        for (startingDate; startingDate <= new Date(); startingDate.setHours(startingDate.getHours() + 1)){

            const [month, day, year, hour] = formatDate(startingDate);
            const splitHour = hour.split(':');
            const formattedHour = splitHour[0] + ' ' + splitHour[1].substring(3, 5);
            const dateKey = `${month} ${day}, ${year} ${formattedHour}`;
            const transactionsToDate = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.date).setMinutes(0);
                return transactionDate <= startingDate && !tracked_transactions.includes(transaction);
            });

            const cryptoDifferentials = transactionsToDate.reduce((acc, {type, amount, crypto, price}) => {
                const sign = type == 'Deposit' ? 1 : -1;
                USDTBalance -= sign * amount * price; 
                acc[crypto] = (acc[crypto] || 0) + amount * sign;
                return acc;
            }, {});
            
            Object.entries(cryptoDifferentials).map(([key, value]) => {
                allocated_cryptos[key] = (allocated_cryptos[key] || 0) + value;
            });
            
            const cryptoValue = Object.entries(allocated_cryptos).reduce((acc, [key, value]) => {
                const price = formattedCryptoHistories[key][dateKey];
                return acc + price * value;
            }, 0);

            const val = (cryptoValue + USDTBalance || lastVal);
            
            newData.push({
                date: startingDate.toString(),
                value: val
            });

            lastVal = val;
            tracked_transactions = [...tracked_transactions, ...transactionsToDate];

        }
        setData(newData);
        setAccountVal(lastVal);
        setLoading(false);
    }

    useEffect(() => {balanceHistory()}, []);

    return(
        <div className="p-10 w-full ml-auto mr-auto">
            {loading ?
                <p> Loading </p>
            :
                <>
                    <Balance accountVal={accountVal.toFixed(2)} data={data} userData={userData}/>
                    <ActionSection />
                    <Browser />
                </>
            }
        </div>
    );
}