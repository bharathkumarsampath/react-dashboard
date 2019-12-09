import React, { useContext } from 'react';
import SimpleCard from '../Card/Card'
import { CardContext, CountContext } from '../../containers/Dashboard/Dashboard'

export default function Cards() {


    const [card, setCard] = useContext(CardContext);
    const [count, setCount] = useContext(CountContext);
    return (
        <div style={{ display: 'flex', padding: '2.3rem', backgroundColor: 'rgb(245,247,251)' }}>
            <SimpleCard count={count.nachEmailSent} text='PENDING' card={card} index={0} setCard={setCard} />
            <SimpleCard count={count.disbursed} text='RE-WORK' card={card} index={1} setCard={setCard} />
            <SimpleCard count={count.loanApproved} text='APPROVED' card={card} index={2} setCard={setCard} />
            <SimpleCard count='12' text='REJECTED/CANCELLED' card={card} index={3} setCard={setCard} />
            <SimpleCard count='167' text='ALL' card={card} index={4} setCard={setCard} />
        </div>
    );
}