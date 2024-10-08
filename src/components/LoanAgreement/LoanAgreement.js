import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { globals } from '../../globals';
import { ReloadAppContext } from '../../containers/LoanDetail/LoanDetail'
import LoanAgreementStyles from './LoanAgreementStyles'
import PdfViewer from './PdfViewer'
import Loader from './../Loader/Loader'
const LoanAgreement = (props) => {

    const [url, setUrl] = useState('');
    const [reload] = React.useContext(ReloadAppContext);
    const [isFetching, setIsFetching] = React.useState(false);
    const classes = LoanAgreementStyles();
    useEffect(() => {
        const fetchUsers = async () => {
            setIsFetching(true);
            try {
                var settings = {
                    "url": globals.api.HOST + "getDocUrl?docType=loanAgreement&loanAppNo=" + props.LoanAppNo,

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
                }).then(res => res.json())
                    .then(res => {
                        setUrl(res);
                        props.setSelfieUrl(res.okycSelfie);
                    });


            } catch (e) {
                console.log(e);
                setUrl(url);
            }
        };
        fetchUsers();
        setIsFetching(false);
    }, [reload]);

    return (
        <div className={classes.loanAgreementComponent}>

            <div className={classes.loanAgreementHeader}>
                <Typography variant="subtitle2" className={classes.loanAgreementText}>
                    Loan Agreement
            </Typography>
                {/* <Typography className={classes.submittedOnText}>
                    Submitted On : {props.LoanApp.submissionDate}</Typography> */}
            </div>

            <Divider />
            {(isFetching) ? (<Loader />) : (<PdfViewer src={url.loanAgreement} page={props.pageNumber} />)}
            {/* <iframe id="iframe" src={url.loanAgreement} title="Loan agreement" className={classes.loanAgreementPdf}></iframe> */}
        </div >



    );


}



export default LoanAgreement;