import React, { useContext, useEffect } from 'react';
import SimpleCard from '../Card/Card'
import { CardContext, CountContext, LatestCountContext } from '../../containers/Dashboard/Dashboard'
import { api, state } from '../../globals'
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
                    const udrsCount = {
                        PENDING: 0, RE_SUBMITTED: 0, RE_WORK: 0, APPROVED: 0, SYSTEM_APPROVED: 0, REJECTED: 0, CANCELLED: 0, ALL: 0
                    }
                    // console.log(JSON.parse(JSON.stringify(res)));
                    for (var key in state) {
                        if (JSON.parse(JSON.stringify(res))[key]) {
                            udrsCount[key] = JSON.parse(JSON.stringify(res))[key];
                        } else {
                            udrsCount[key] = 0;
                        }
                    }
                    udrsCount.PENDING = udrsCount.PENDING + udrsCount.RE_SUBMITTED;
                    udrsCount.APPROVED = udrsCount.APPROVED + udrsCount.SYSTEM_APPROVED;
                    udrsCount.REJECTED = udrsCount.REJECTED + udrsCount.CANCELLED;
                    udrsCount.ALL = udrsCount.PENDING + udrsCount.RE_WORK + udrsCount.APPROVED + udrsCount.REJECTED;
                    setCount(udrsCount);
                    // console.log("udrscount", JSON.parse(JSON.stringify(res)));
                    // console.log("count", udrsCount);
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
                <SimpleCard count={count.PENDING} text='PENDING' card={card} index={0} setCard={setCard} error={error} />
                <SimpleCard count={count.RE_WORK} text='RE-WORK' card={card} index={1} setCard={setCard} error={error} />
                <SimpleCard count={count.APPROVED} text='APPROVED' card={card} index={2} setCard={setCard} error={error} />
                <SimpleCard count={count.REJECTED} text='REJECTED/CANCELLED' card={card} index={3} setCard={setCard} error={error} />
                <SimpleCard count={count.ALL} text='ALL' card={card} index={4} setCard={setCard} error={error} />
            </div>
        }
    </div>);
}