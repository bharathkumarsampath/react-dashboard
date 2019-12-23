import React, { useContext, useEffect } from 'react';
import SimpleCard from '../Card/Card'
import { CardContext, CountContext, LatestCountContext } from '../../containers/Dashboard/Dashboard'
export default function Cards() {

    const [card, setCard] = useContext(CardContext);
    const [count, setCount] = useContext(CountContext);
    const [latestCount] = useContext(LatestCountContext);

    const [error, setError] = React.useState({});
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setError(false);
                var settings = {
                    "url": "http://localhost:8080/services/api/clix/portal/getStatusCount",
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
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
                });

            } catch (e) {
                console.log(e);
                setError(true);
            }


        };
        fetchUsers();
    }, [card, latestCount]);
    return (<div>
        {error && <div>Something went wrong ...</div>}
        {
            // (!isFetching) ? (
                <div style={{ display: 'flex', padding: '2.3rem', backgroundColor: 'rgb(245,247,251)' }}>
                    <SimpleCard count={count.nachEmailSent} text='PENDING' card={card} index={0} setCard={setCard} />
                    <SimpleCard count={count.disbursed} text='RE-WORK' card={card} index={1} setCard={setCard} />
                    <SimpleCard count={count.loanApproved} text='APPROVED' card={card} index={2} setCard={setCard} />
                    <SimpleCard count='12' text='REJECTED/CANCELLED' card={card} index={3} setCard={setCard} />
                    <SimpleCard count='167' text='ALL' card={card} index={4} setCard={setCard} />
                </div>
            // ) : (<Spinner />)
        }
    </div>);
}