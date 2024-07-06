import Balance from "../Components/PortfolioPage/BalanceComponent/Balance";
import ActionSection from "../Components/PortfolioPage/ActionsComponent/ActionSection";
import { subDays } from 'date-fns';
import Browser from "../Components/PortfolioPage/BrowserComponents/Browser";

export default function ProfilePage(){
    const data = []
  
    for(let i = 30; i >= 0; i--){
        data.push({
        date: subDays(new Date(), i).toISOString().substr(0, 10),
        value: (13000 + Math.random() * 5000)
        });
    }

    return(
        <div className="p-10 w-full ml-auto mr-auto">
            <Balance data={data}/>
            <ActionSection />
            <Browser />
        </div>
    );
}