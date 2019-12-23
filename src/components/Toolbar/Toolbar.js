import React from 'react';
import Search from '../../components/Search/Search'
import '../../components/Search/Search.css'
import clixLogo from '../../assets/images/clixLogo.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const toolbar = () => {
    function Account(props) {
        return (
            <AccountCircleIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </AccountCircleIcon>
        );
    }
    return (
        <div className="toolbar" style={{ display: "flex", backgroundColor: 'white' }}>
            <div style={{ textAlign: 'left', paddingTop: '.5%', paddingLeft: '.5%' }}>
                <img src={clixLogo} width={220} height={50} alt="clix logo" />
            </div>
            <Search />
            <Account style={{ fontSize: '35', paddingTop: '1%', paddingLeft: '2%' }} color="disabled" fontSize="large" />
        </div>
    );
}

export default toolbar;