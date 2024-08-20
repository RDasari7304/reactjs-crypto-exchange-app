import Balance from "../Components/PortfolioPage/BalanceComponent/Balance";
import ActionSection from "../Components/PortfolioPage/ActionsComponent/ActionSection";
import { subDays } from 'date-fns';
import Browser from "../Components/PortfolioPage/BrowserComponents/Browser";
import { useContext, useState, useEffect } from "react";
import { CryptoContext } from "../App";
import { fetchCryptoHistory, formatDate } from "../TestData/services";

export default function ProfilePage(){
    const [data, setData] = useState([]);
    const [, , , userData] = useContext(CryptoContext);
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
        
        const cryptoHistories = await fetchCryptoHistories(userData.allocated_cryptos);

        const formattedCryptoHistories = formatCryptoHistories(cryptoHistories);

        let USDTBalance = 50000;
        let allocated_cryptos = {};
        let tracked_transactions = [];
        
        const startingDate = new Date(userData.registration_date);
        const endingDate = new Date();
        const newData = [];
        let lastVal = 0;
        
        
        for (let date = startingDate; date < endingDate; date.setHours(date.getHours() + 1)){
            const dateKey = formatDateKey(date);

            const transactionsToDate = filterTransactionsToDate(transactions, date, tracked_transactions);
            const cryptoDifferentials = calculateCryptoDifferentials(transactionsToDate);

            USDTBalance = updateUSDTBalance(USDTBalance, transactionsToDate);

            Object.entries(cryptoDifferentials).map(([key, value]) => {
                allocated_cryptos[key] = (allocated_cryptos[key] || 0) + value;
            });
            
            const cryptoValue = calculateCryptoValue(allocated_cryptos, formattedCryptoHistories, dateKey);

            const val = cryptoValue + USDTBalance || lastVal;
            
            newData.push({
                date: date.toString(),
                value: val
            });

            lastVal = val;
            tracked_transactions = [...tracked_transactions, ...transactionsToDate];

        }

        const finalCryptoValue = calculateFinalCryptoValue(allocated_cryptos);
        const finalAccountVal = finalCryptoValue + USDTBalance;

        console.log(finalCryptoValue);
        newData.push({
            date: endingDate,
            value: finalAccountVal
        });

        setData(newData);
        setAccountVal(finalAccountVal);
        setLoading(false);
    }

    const fetchCryptoHistories = async (allocated_cryptos) => {
        return Promise.all(Object.entries(allocated_cryptos).map(async ([key, crypto]) => {
            const days = Math.ceil((new Date() - new Date(userData.registration_date)) / (1000 * 60 * 60 * 24));
            return {[key]: (await fetchCryptoHistory(crypto, days))};
        }));
    }

    const formatCryptoHistories = (cryptoHistories) => {
        return cryptoHistories.reduce((acc, value) => {
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
    }

    const formatDateKey = (date) => {
        const [month, day, year, hour] = formatDate(date);
        const [hourPart, minutePart] = hour.split(':');
    
        return `${month} ${day}, ${year} ${hourPart} ${minutePart.substring(3, 5)}`;
    };

    const filterTransactionsToDate = (transactions, date, trackedTransactions) => {
        return transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date).setMinutes(0);
            return transactionDate <= date && !trackedTransactions.includes(transaction);
        });
    }

    const calculateCryptoDifferentials = (transactionsToDate) => {
        return transactionsToDate.reduce((acc, {type, amount, crypto}) => {
            const sign = type == 'Deposit' ? 1 : -1;
            acc[crypto] = (acc[crypto] || 0) + amount * sign;
            return acc;
        }, {});
    }

    const updateUSDTBalance = (balance, transactions) => {
        return transactions.reduce((acc, { type, amount, price }) => {
            const sign = type === 'Deposit' ? 1 : -1;
            return acc - sign * amount * price;
        }, balance);
    }

    const calculateCryptoValue = (allocated_cryptos, formattedCryptoHistories, dateKey) => {
        console.log(`date: ${dateKey}`);
        return Object.entries(allocated_cryptos).reduce((acc, [key, value]) => {
            console.log(key);
            console.log(formattedCryptoHistories);
            const price = formattedCryptoHistories[key][dateKey];
            return acc + price * value;
        }, 0);
    }
    
    const calculateFinalCryptoValue = (allocatedCryptos) => {
        return Object.entries(allocatedCryptos).reduce((acc, [key, value]) => {
            const fiatValue = userData.allocated_cryptos[key].price * value;
            return acc + fiatValue;
        }, 0);
    };

    useEffect(() => {balanceHistory()}, []);

    return(
        <div className="flex-col justify-center items-center p-10 w-full h-full ">
            {loading ?
                <div className="border-gray-300 h-20 w-20 m-auto animate-spin rounded-full border-8 border-t-blue-600"/> 
            :
                <>
                    <Balance accountVal={accountVal.toFixed(2)} data={data} userData={userData}/>
                    <Browser />
                </>
            }
        </div>
    );
}