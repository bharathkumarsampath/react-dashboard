import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { api } from '../../globals'
const LoanAgreement = (props) => {

    const [url, setUrl] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                var settings = {
                    "url": api.HOST + "getDocUrl?docType=loanAgreement&loanAppNo=153845593067",
                    //+localStorage.getItem('loanAppNo'),
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
                        // console.log(res);
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
        <div style={{ backgroundColor: 'white', width: '67vw', height: '80vh', borderRadius: '0.4rem', margin: '1rem', boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)' }}>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" style={{ fontSize: '1.1rem', fontWeight: '500', textAlign: 'left' }}>
                    Loan Agreement
            </Typography>
                <Typography style={{ paddingTop: '0.7vh', textAlign: 'right' }}>Submitted On : {props.LoanApp.submissionDate}</Typography>
            </div>

            <Divider />
            <iframe src={url} title="Loan agreement"
                style={{ width: '67vw', height: '72vh' }} frameBorder="0"></iframe>
        </div >



    );


}



export default LoanAgreement;