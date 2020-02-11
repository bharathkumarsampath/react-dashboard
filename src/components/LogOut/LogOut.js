import React from 'react';
import './LogOut.css'
import LogoutProfile from '../../assets/images/ic-profile.png'
import LogoutNav from '../../assets/images/ic-logout.png'
import { unLockApp, clearLocalStorage } from '../../utils'
import { useHistory } from "react-router-dom";

const LogOut = (props) => {
    let history = useHistory();
    function navLogOut() {
        unLockApp(props.LoanApp.mvStatus);
        clearLocalStorage();
        history.push('/');
    }
    return (
        <div style={{ borderRadius: '20px' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgb(215,222,229)', padding: '0px 25px 0px 25px' }}>
                <img src={LogoutProfile} alt="LogoutProfile" height="25px" style={{ paddingTop: '12px' }} />
                <p style={{ paddingLeft: '10px' }}>{localStorage.getItem('agentName')}</p>
            </div>
            <div style={{ display: 'flex', cursor: 'pointer', padding: '0px 25px 0px 25px' }} onClick={navLogOut}>
                <img src={LogoutNav} alt="LogoutNav" height="25px" style={{ paddingTop: '12px', cursor: 'pointer' }} />
                <p style={{ paddingLeft: '10px' }}>Logout</p>
            </div>
        </div>

    );
}

export default LogOut;