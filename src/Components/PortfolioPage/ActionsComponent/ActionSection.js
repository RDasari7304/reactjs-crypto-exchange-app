import ActionCard from './ActionCard'; 
import PaySomeone from '../../../Images/PortfolioPage/ActionImages/pay-someone.png'
import TopUp from '../../../Images/PortfolioPage/ActionImages/top-up.png';
import SharePortfolio from '../../../Images/PortfolioPage/ActionImages/share-portfolio.png';

export default function ActionSection(){
    return (
        <div className="bg-white w-full max-w-6xl p-3 ml-auto mr-auto mt-12 flex portfolio-cards">
            <ActionCard cardTitle= 'Pay Someone' imgSrc= {PaySomeone} className='flex-1'/>
            <ActionCard cardTitle= 'Top Up' imgSrc={TopUp} className='flex-1' />
            <ActionCard cardTitle= 'Share Portfolio' imgSrc= {SharePortfolio} className='flex-1' />
        </div>
    );
}