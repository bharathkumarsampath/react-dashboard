import React, { useContext, useEffect } from 'react';
import SimpleCard from '../Card/Card'
import { CardContext, CountContext, LatestCountContext } from '../../containers/Dashboard/Dashboard'
import { api } from '../../globals'
export default function Cards() {

    const [card, setCard] = useContext(CardContext);
    const [count, setCount] = useContext(CountContext);
    const [latestCount] = useContext(LatestCountContext);

    const [error, setError] = React.useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // setError(false);
                var settings = {
                    "mode": "no-cors",
                    "url": api.HOST + "getStatusCount",
                }
                await fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }

                }).then(res => res.json()
                ).then(res => {
                    setCount(JSON.parse(res.udrsCount));
                    //console.log(JSON.parse(res.udrsCount));
                });

            } catch (e) {
                console.log(e);
                setError(true);
            }


        };
        fetchUsers();
    }, [card, latestCount]);
    return (<div>
        {
            <div style={{ display: 'flex', padding: '2.3rem', backgroundColor: 'rgb(245,247,251)' }}>
                <SimpleCard count={count.pending + count.reSubmitted} text='PENDING' card={card} index={0} setCard={setCard} error={error} />
                <SimpleCard count={count.rework} text='RE-WORK' card={card} index={1} setCard={setCard} error={error} />
                <SimpleCard count={count.approved + count.systemApproved} text='APPROVED' card={card} index={2} setCard={setCard} error={error} />
                <SimpleCard count={count.rejected + count.cancelled} text='REJECTED/CANCELLED' card={card} index={3} setCard={setCard} error={error} />
                <SimpleCard count={count.pending + count.rework + count.approved + count.rejected} text='ALL' card={card} index={4} setCard={setCard} error={error} />
            </div>
        }
    </div>);
}