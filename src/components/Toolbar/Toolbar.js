import React from 'react';
import Search from '../../components/Search/Search'
import '../../components/Search/Search.css'
import clixLogo from '../../assets/images/clixLogo.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logout from '../LogOut/LogOut'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { Grid } from '@material-ui/core';




const toolbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    function Account(props) {
        return (
            <AccountCircleIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </AccountCircleIcon>
        );
    }
    return (
        <Grid>
            <div className="toolbar" style={{ display: "flex", backgroundColor: 'white' }}>
                <div style={{ textAlign: 'left', paddingTop: '.5%', paddingLeft: '.5%' }}>
                    <img src={clixLogo} width={220} height={50} alt="clix logo" />
                </div>
                <Search />
                <div onClick={handleClick} style={{ fontSize: '35', paddingTop: '1%', paddingLeft: '2%' }}>
                    <Account color="disabled" fontSize="large" />
                </div>
            </div>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Logout />
            </Popover>
        </Grid>
    );
}

export default toolbar;