import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import agre from '../../assets/images/100000026909_loan_agreement.pdf'
import { api } from '../../globals'

const LoanAgreement = () => {

    const [url, setUrl] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                var settings = {
                    "url": api.HOST + "getDocUrl?docType=loanAgreement&loanAppNo=100000026909",
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
                }
                fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
                }).then(res => res.text())
                    .then(res => {
                        console.log('url from backend');
                        console.log(res);
                        setUrl(res);
                    });


            } catch (e) {
                console.log(e);
                setUrl(url);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div style={{ backgroundColor: 'white', width: '67vw', height: '98vh', borderRadius: '0.4rem', margin: '1rem', boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)' }}>
            <div style={{ padding: '1rem' }}>
                <Typography variant="subtitle2" style={{ fontSize: '1.1rem', fontWeight: '500', textAlign: 'left' }}>
                    Loan Agreement
            </Typography>
            </div>

            <Divider />
            <embed src={agre} width="950" height="600"></embed>
        </div>



    );


}



export default LoanAgreement;