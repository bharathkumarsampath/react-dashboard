import React, { useContext } from 'react';
import SimpleCard from '../Card/Card'
import { CardContext } from '../Search/Search'

export default function Cards() {


    const [style, setStyle] = useContext(CardContext);
    function makeActive(temp) {
        console.log("temp " + JSON.parse(JSON.stringify(temp)));
        var array = [0, 0, 0, 0, 0];
        array[temp - 1] = 1;
        setStyle(array);
    }

    return (
        <div style={{ display: 'flex', padding: '3rem', backgroundColor: 'rgb(245,247,251)' }}>
            <SimpleCard count='100' text='PENDING' style={style} index={0} setStyle={setStyle} />
            <SimpleCard count='05' text='RE-WORK' style={style} index={1} setStyle={setStyle} />
            <SimpleCard count='50' text='APPROVED' style={style} index={2} setStyle={setStyle} />
            <SimpleCard count='12' text='REJECTED/CANCELLED' style={style} index={3} setStyle={setStyle} />
            <SimpleCard count='167' text='ALL' style={style} index={4} setStyle={setStyle} />
        </div>
    );
}