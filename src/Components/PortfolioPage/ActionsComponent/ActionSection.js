import ActionCard from './ActionCard'; 
import PaySomeone from '../../../Images/ActionImages/pay-someone.png'
import TopUp from '../../../Images/ActionImages/top-up.png';
import SharePortfolio from '../../../Images/ActionImages/share-portfolio.png';

export default function ActionSection(){
    return (
        <div className="bg-white max-w-7xl w-full px-3 py-1 ml-auto mr-auto mt-12 flex portfolio-cards">
            <ActionCard cardTitle= 'Pay Someone' imgSrc= {PaySomeone} className='flex-1'/>
            <ActionCard cardTitle= 'Top Up' imgSrc={TopUp} className='flex-1' />
            <ActionCard cardTitle= 'Share Portfolio' imgSrc= {SharePortfolio} className='flex-1' />
        </div>
    );
}