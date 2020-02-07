import React, { useContext, useEffect } from 'react';
import SimpleCard from '../Card/Card'
import { CardContext, CountContext, LatestCountContext } from '../../containers/Dashboard/Dashboard'
import { globals } from '../../globals'
import fetch from 'fetch-timeout'
import CountBoardStyles from './CountBoardStyles'
export default function Cards() {

    const [card, setCard] = useContext(CardContext);
    const [count, setCount] = useContext(CountContext);
    const [latestCount] = useContext(LatestCountContext);
    const [error, setError] = React.useState(false);
    const classes = CountBoardStyles();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                var settings = {
                    "mode": "no-cors",
                    "url": globals.api.HOST + "getStatusCount",
                }
                await fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }

                }, globals.request.timeout, 'request timeout').then(res => res.json()
                ).then(res => {
                    const udrsCount = {
                        PENDING: 0, RE_SUBMITTED: 0, RE_WORK: 0, APPROVED: 0, SYSTEM_APPROVED: 0, REJECTED: 0, CANCELLED: 0, ALL: 0
                    }
                    for (var key in globals.state) {
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
            <div className={classes.cards}>
                <SimpleCard count={count.PENDING} text='PENDING' card={card} index={0} setCard={setCard} error={error} />
                <SimpleCard count={count.RE_WORK} text='RE-WORK' card={card} index={1} setCard={setCard} error={error} />
                <SimpleCard count={count.APPROVED} text='APPROVED' card={card} index={2} setCard={setCard} error={error} />
                <SimpleCard count={count.REJECTED} text='REJECTED/CANCELLED' card={card} index={3} setCard={setCard} error={error} />
                <SimpleCard count={count.ALL} text='ALL' card={card} index={4} setCard={setCard} error={error} />
            </div>
        }
    </div>);
}