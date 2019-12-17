import React, { useEffect } from 'react';
import PersonIcon from '@material-ui/icons/Person';
// import { widthStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery';
import LoanUser from '../../assets/images/LoanUser.png'
import { Divider } from '@material-ui/core';
const LoanDetails = (props) => {


    return (
        <div style={{ backgroundColor: 'white', width: '25rem', height: '28rem', borderRadius: '0.4rem', margin: '1rem', boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)' }}>
            <div style={{ display: 'flex', padding: '1rem 0rem 1rem 1rem' }}>
                <img src={LoanUser} width="70" height='70' />
                <div style={{ paddingLeft: '1rem', textAlign: 'left' }}>
                    <Typography variant="subtitle2" gutterBottom style={{ height: '22px', color: '#000000', fontSize: '16px', fontWeight: '600', lineHeight: '22px' }}>
                        {props.LoanApp.name}
                    </Typography>
                    <Typography variant="button" gutterBottom style={{ height: ' 17px', color: ' rgba(42,41,42,0.87)', fontSize: '12px', fontWeight: ' 600', letterSpacing: ' 1px', lineHeight: ' 17px' }}>
                        {props.LoanApp.occupation}
                    </Typography>
                    <Typography variant="body1" style={{ height: ' 17px', color: ' #000000', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px', marginTop: '6px' }}>
                        Location : {props.LoanApp.kycPermanentAddressCity}
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
                        {props.LoanApp.kycEmailId}
                    </Typography>
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ paddingLeft: '1rem' }}>
                        <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 103.97px', color: ' #000000', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px' }}>
                            Mobile Number
            </Typography>
                        <Typography variant="subtitle1" gutterBottom style={{ height: ' 19px', width: ' 121px', fontSize: ' 14px', fontWeight: '600', lineHeight: ' 19px' }}>
                            {props.LoanApp.kycContactMobile}
                        </Typography>
                    </div>
                    <div style={{ paddingLeft: '2.3rem' }}>
                        <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 179px', color: ' #000000', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px' }}>
                            Alternate Number
            </Typography>
                        <Typography variant="subtitle1" gutterBottom style={{ height: ' 19px', width: ' 121px', fontSize: ' 14px', fontWeight: '600', lineHeight: ' 19px' }}>
                            {props.LoanApp.alternatePhone}
                        </Typography>
                    </div>
                </div>
                <div style={{ padding: '1rem' }}>
                    <Typography variant="body1" gutterBottom style={{ height: ' 17px', width: ' 103.97px', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px' }}>
                        Current Address
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{ height: ' 57px', width: ' 328px', fontSize: ' 14px', fontWeight: '600', lineHeight: ' 19px' }}>
                        {props.LoanApp.kycCurrentAddressStreet}
                    </Typography>
                </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', padding: '1rem' }}>
                <Typography variant="subtitle1" gutterBottom style={{ height: ' 19px', width: ' 92px', fontSize: ' 14px', letterSpacing: ' 0.25px', lineHeight: ' 19px' }}>
                    Geo Tagging:
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{ height: ' 17px', width: ' 22px', fontSize: ' 12px', letterSpacing: ' 0.4px', lineHeight: ' 17px', backgroundColor: 'rgb(209,249,170)', borderRadius: '4px', padding: '0.1rem 0.8rem', marginLeft: '.5rem' }}>
                    Yes
                </Typography>

            </div>
            <div style={{ fontWeight: '700', display: 'flex', color: 'rgb(91,154,225)', marginLeft: '1rem' }}>
                <Typography variant="subtitle1" gutterBottom >
                    Penny Drop Check
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '3rem' }}>
                    NSDL Check
                </Typography>
            </div>
        </div>



    );


}



export default LoanDetails;