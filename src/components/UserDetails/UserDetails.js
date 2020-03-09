import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import PennyDropCheckModal from './PennyDropCheckModal'
import NsdlCheckModal from './NsdlCheckModal'

const LoanDetails = (props) => {


    // const [PennyDropCheckInfo, setPennyDropCheckInfo] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [nsdlModalopen, setNsdlModalOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const OpenNsdlModal = () => {
        setNsdlModalOpen(true);
    };
    // const [isfetching, setIsfetching] = React.useState(true);
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);

    // };

    // async function PennyDropCheck() {
    //     setIsfetching(true);
    //     handleOpen();
    //     try {
    //         var settings = {
    //             "mode": "no-cors",
    //             "url": api.HOST + "getPennyDrop?loanAppNo=" + localStorage.getItem('loanAppNo'),
    //         }
    //         await fetch(settings.url, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //                 "token": localStorage.getItem('token')
    //             }

    //         }).then(res => res.json()
    //         ).then(res => {
    //             if (res === "No Info available") {
    //                 console.log("No Info available");

    //             } else if (res === "Loan application number is not valid") {
    //                 console.log("Loan application number is not valid");
    //             } else if (res === "Either token is invalid or token expired") {
    //                 console.log("Either token is invalid or token expired");
    //             } else {
    //                 console.log("PennyDropCheckInfo", JSON.parse(res.response));
    //                 setPennyDropCheckInfo(JSON.parse(res.response));
    //             }
    //         });



    //     } catch (e) {
    //         console.log(e);
    //     }
    //     setIsfetching(false);
    // }

    return (
        <div>
            <div style={{ display: 'flex', padding: '1rem 0rem 1rem 1rem' }}>
                <img src={props.selfieUrl} width="70" height='70' alt="profile" />
                <div style={{ paddingLeft: '1rem', textAlign: 'left' }}>
                    <Typography variant="subtitle2" gutterBottom style={{ height: '46px', color: '#000000', fontSize: '16px', fontWeight: '600', lineHeight: '22px' }}>
                        {(props.LoanApp.firstName) ? (props.LoanApp.firstName + " ") : (null) +
                            (props.LoanApp.middleName) ? (props.LoanApp.middleName) : (null) +
                                (props.LoanApp.lastName) ? (props.LoanApp.lastName) : (null)}

                    </Typography>
                    {/* <Typography variant="button" gutterBottom style={{ height: ' 17px', color: ' rgba(42,41,42,0.87)', fontSize: '12px', fontWeight: ' 600', letterSpacing: ' 1px', lineHeight: ' 17px' }}>
                        {props.LoanApp.occupation}
                    </Typography> */}
                    <Typography variant="body1" style={{ height: ' 17px', color: ' #000000', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px', marginTop: '6px' }}>
                        Location  : {props.LoanApp.workAddressCity}
                    </Typography>
                </div>
            </div>
            <Divider />
            <div style={{ textAlign: 'left' }}>
                <div style={{ padding: '1rem' }}>
                    <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 103.97px', color: ' #000000', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px', }}>
                        Email Address
                </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{ fontSize: '14px', fontWeight: '600', lineHeight: '19px' }}>
                        {props.LoanApp.emailId}
                    </Typography>
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ paddingLeft: '1rem' }}>
                        <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 103.97px', color: ' #000000', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px' }}>
                            Mobile Number
            </Typography>
                        <Typography variant="subtitle1" gutterBottom style={{ height: ' 19px', width: ' 121px', fontSize: ' 14px', fontWeight: '600', lineHeight: ' 19px' }}>
                            {props.LoanApp.mobileNumber}
                        </Typography>
                    </div>
                    {/* <div style={{ paddingLeft: '2.3rem' }}>
                        <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 179px', color: ' #000000', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px' }}>
                            Alternate Number
            </Typography>
                        <Typography variant="subtitle1" gutterBottom style={{ height: ' 19px', width: ' 121px', fontSize: ' 14px', fontWeight: '600', lineHeight: ' 19px' }}>
                            {props.LoanApp.alternateMobile}
                        </Typography>
                    </div> */}
                </div>
                <div style={{ padding: '1rem' }}>
                    <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 103.97px', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px' }}>
                        Current Address
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{ width: ' 328px', fontSize: ' 14px', fontWeight: '600', lineHeight: ' 19px', overflowWrap: 'break-word' }}>

                        {(props.LoanApp.currentAddressStreet1) ?
                            (props.LoanApp.currentAddressStreet1 + ',') : (null)}
                        {(props.LoanApp.currentAddressStreet2) ?
                            (props.LoanApp.currentAddressStreet2 + ',') : (null)}
                        {(props.LoanApp.currentAddressCity) ?
                            (props.LoanApp.currentAddressCity + ',') : (null)}
                        {(props.LoanApp.currentAddressState) ?
                            (props.LoanApp.currentAddressState + ',') : (null)}
                        {(props.LoanApp.currentAddressPincode) ?
                            (props.LoanApp.currentAddressPincode) : (null)}
                    </Typography>
                </div>
            </div>
            <Divider />
            {/* <div style={{ display: 'flex', padding: '1rem' }}>
                <Typography variant="subtitle1" gutterBottom style={{ height: ' 19px', fontSize: ' 14px', letterSpacing: ' 0.25px', lineHeight: ' 19px' }}>
                    Geo Tagging:
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{ height: ' 17px', width: ' 22px', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px', backgroundColor: 'rgb(209,249,170)', borderRadius: '4px', padding: '0.1rem 0.8rem', marginLeft: '.5rem' }}>
                    {props.LoanApp.geoTagging}
                </Typography>

            </div> */}
            <div style={{ fontWeight: '700', display: 'flex', marginLeft: '1rem', marginTop: '0.5rem' }}>
                <Typography variant="subtitle1" gutterBottom style={{ color: '#4a90e2', cursor: 'pointer' }} onClick={handleClickOpen}>
                    Penny Drop Check
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '3rem', color: '#4a90e2', cursor: 'pointer' }} onClick={OpenNsdlModal}>
                    NSDL Check
                </Typography>
            </div>



            <PennyDropCheckModal open={open} setOpen={setOpen} loanApp={props.LoanApp} />
            <NsdlCheckModal open={nsdlModalopen} setOpen={setNsdlModalOpen} loanApp={props.LoanApp} />

        </div>



    );


}



export default LoanDetails;