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
        <div style={{ backgroundColor: 'white', width: '25rem', height: '29rem', borderRadius: '0.4rem', margin: '1rem', boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)' }}>
            <div style={{ display: 'flex', padding: '1rem 6rem 1rem 1rem' }}>
                <img src={LoanUser} width="70" height='70' />
                <div style={{ paddingLeft: '1rem', textAlign: 'left' }}>
                    <Typography variant="subtitle2" gutterBottom>
                        {props.LoanApp.name}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        {props.LoanApp.occupation}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Location : {props.LoanApp.kycPermanentAddressCity}
                    </Typography>
                </div>
            </div>
            <Divider />
            <div style={{ textAlign: 'left' }}>
                <div style={{ padding: '1rem' }}>
                    <Typography variant="body1" gutterBottom>
                        Email Address
                </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {props.LoanApp.kycEmailId}
                    </Typography>
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ paddingLeft: '1rem' }}>
                        <Typography variant="body1" gutterBottom>
                            Mobile Number
            </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            {props.LoanApp.kycContactMobile}
                        </Typography>
                    </div>
                    <div style={{ paddingLeft: '2.3rem' }}>
                        <Typography variant="body1" gutterBottom>
                            Alternate Number
            </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            {props.LoanApp.alternatePhone}
                        </Typography>
                    </div>
                </div>
                <div style={{ padding: '1rem' }}>
                    <Typography variant="body1" gutterBottom>
                        Current Address
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {props.LoanApp.kycCurrentAddressStreet}
                    </Typography>
                </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', padding: '1rem' }}>
                <Typography variant="subtitle1" gutterBottom>
                    Geo Tagging:
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{ backgroundColor: 'rgb(209,249,170)', borderRadius: '0.4rem', padding: '0.1rem 0.8rem', marginLeft: '.5rem' }}>
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