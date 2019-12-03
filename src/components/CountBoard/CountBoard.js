import React, { useContext } from 'react';
import SimpleCard from '../Card/Card'
import { CardContext, CountContext } from '../Search/Search'

export default function Cards() {


    const [style, setStyle] = useContext(CardContext);
    const [count, setCount] = useContext(CountContext);
    function makeActive(temp) {
        console.log("temp " + JSON.parse(JSON.stringify(temp)));
        var array = [0, 0, 0, 0, 0];
        array[temp - 1] = 1;
        setStyle(array);
    }

    return (
        <div style={{ display: 'flex', padding: '3rem', backgroundColor: 'rgb(245,247,251)' }}>
            <SimpleCard count={count.nachEmailSent} text='PENDING' style={style} index={0} setStyle={setStyle} />
            <SimpleCard count={count.disbursed} text='RE-WORK' style={style} index={1} setStyle={setStyle} />
            <SimpleCard count={count.loanApproved} text='APPROVED' style={style} index={2} setStyle={setStyle} />
            <SimpleCard count='12' text='REJECTED/CANCELLED' style={style} index={3} setStyle={setStyle} />
            <SimpleCard count='167' text='ALL' style={style} index={4} setStyle={setStyle} />
        </div>
    );
}