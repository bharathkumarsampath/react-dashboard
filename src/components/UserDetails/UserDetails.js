import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
const LoanDetails = (props) => {


    return (
        <div>
            <div style={{ display: 'flex', padding: '1rem 0rem 1rem 1rem' }}>
                <img src={props.selfieUrl} width="70" height='70' alt="profile" />
                <div style={{ paddingLeft: '1rem', textAlign: 'left' }}>
                    <Typography variant="subtitle2" gutterBottom style={{ height: '24px', color: '#000000', fontSize: '16px', fontWeight: '600', lineHeight: '22px' }}>
                        {props.LoanApp.firstName + " " + props.LoanApp.middleName + " " + props.LoanApp.lastName}
                    </Typography>
                    <Typography variant="button" gutterBottom style={{ height: ' 17px', color: ' rgba(42,41,42,0.87)', fontSize: '12px', fontWeight: ' 600', letterSpacing: ' 1px', lineHeight: ' 17px' }}>
                        {props.LoanApp.occupation}
                    </Typography>
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
                    <div style={{ paddingLeft: '2.3rem' }}>
                        <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 179px', color: ' #000000', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px' }}>
                            Alternate Number
            </Typography>
                        <Typography variant="subtitle1" gutterBottom style={{ height: ' 19px', width: ' 121px', fontSize: ' 14px', fontWeight: '600', lineHeight: ' 19px' }}>
                            {props.LoanApp.alternateMobile}
                        </Typography>
                    </div>
                </div>
                <div style={{ padding: '1rem' }}>
                    <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 103.97px', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px' }}>
                        Current Address
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{ width: ' 328px', fontSize: ' 14px', fontWeight: '600', lineHeight: ' 19px' }}>
                        {(props.LoanApp.currentAddressStreet1) ?
                            (props.LoanApp.currentAddressStreet1 + ',') : (null)}
                        {(props.LoanApp.currentAddressStreet2) ?
                            (props.LoanApp.currentAddressStreet2 + ',') : (null)}
                        {(props.LoanApp.currentAddressCity) ?
                            (props.LoanApp.currentAddressCity + ',') : (null)}
                        {(props.LoanApp.currentAddressCity) ?
                            (props.LoanApp.currentAddressCity + ',') : (null)}
                        {(props.LoanApp.currentAddressState) ?
                            (props.LoanApp.currentAddressState + ',') : (null)}
                        {(props.LoanApp.currentAddressPinCode) ?
                            (props.LoanApp.currentAddressPinCode) : (null)}
                    </Typography>
                </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', padding: '1rem' }}>
                <Typography variant="subtitle1" gutterBottom style={{ height: ' 19px', fontSize: ' 14px', letterSpacing: ' 0.25px', lineHeight: ' 19px' }}>
                    Geo Tagging:
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{ height: ' 17px', width: ' 22px', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px', backgroundColor: 'rgb(209,249,170)', borderRadius: '4px', padding: '0.1rem 0.8rem', marginLeft: '.5rem' }}>
                    {props.LoanApp.geoTagging}
                </Typography>

            </div>
            <div style={{ fontWeight: '700', display: 'flex', color: '#4a90e2', marginLeft: '1rem' }}>
                <Typography variant="subtitle1" gutterBottom style={{ color: '#4a90e2' }}>
                    Penny Drop Check
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '3rem', color: '#4a90e2' }}>
                    NSDL Check
                </Typography>
            </div>
        </div>



    );


}



export default LoanDetails;