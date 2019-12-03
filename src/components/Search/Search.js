import React, { useState } from 'react';
import clixLogo from '../../assets/images/clixLogo.png';
import loginImage from '../../assets/images/loginImage.png'
import InputBase from '@material-ui/core/InputBase';
import { createMuiTheme, fade, makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LoginIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import TableView from '../TableView/TableView'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Search.css'
import Cards from '../CountBoard/CountBoard'
import EnhancedTable from '../EnhancedTable/EnhancedTable';

export const CardContext = React.createContext([1, 0, 0, 0, 0]);
export const CountContext = React.createContext({});

const search = () => {
    const [card, setCard] = useState([1, 0, 0, 0, 0]);
    const [count, setCount] = useState({});
    function Account(props) {
        return (
            <AccountCircleIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </AccountCircleIcon>
        );
    }
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: 'rgb(237, 237, 237)',
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
            display: 'flex'
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'blue'
        },
        inputRoot: {
            color: 'inherit',
            alignContent: 'left'
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
        button: {
            margin: theme.spacing(1),
        },
    }));
    const BootstrapButton = withStyles({
        root: {
            boxShadow: 'none',
            textTransform: 'none',
            float: 'left',
            fontSize: 16,
            marginTop: '2%',
            marginLeft: '1%',
            padding: '6px 18px',
            border: '1px solid',
            lineHeight: 1.5,
            backgroundColor: 'white',
            borderColor: 'rgb(22,139,207)',
            color: 'rgb(22,139,207)',
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                backgroundColor: 'rgb(22,139,207)',
                borderColor: 'rgb(22,139,207)',
                color: 'white',
                boxShadow: 'none',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: 'rgb(237,237,237)',
                borderColor: '#005cbf',
            },
            '&:focus': {
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
            },
        },
    })(Button);

    const classes = useStyles();
    return (
        <div>

            <div className="toolbar">
                <div style={{ textAlign: 'left', paddingTop: '.5%', paddingLeft: '.5%' }}>
                    <img src={clixLogo} />
                </div>
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search by Loan ID, mobile number or email ID" />
                    <button type="submit" className="searchButton">
                        <SearchIcon style={{ color: 'white', paddingTop: '14%' }} />
                    </button>
                </div>
                {/* <img src={loginImage} style={{ height: '60%', paddingTop: '.8%', paddingLeft: '3%' }} />
                <LoginIcon style={{ paddingTop: '2%', color: 'rgb(137,137,137)' }} /> */}
                <Account style={{ fontSize: '50', paddingTop: '.8%', paddingLeft: '3%' }} color="disabled" fontSize="large" />

            </div>

            {/* <hr
                style={{
                    color: 'gray'
                }}
            /> */}
            <Divider />
            {/* <BootstrapButton style={{ backgroundColor: 'rgb(22,139,207)', color: 'white' }} variant="contained" color="primary" disableRipple className={classes.margin}>
                Total Applications(100)
            </BootstrapButton>
            <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
                Re-work(5)
            </BootstrapButton>
            <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
                Approved(38)
            </BootstrapButton> */}
            <CardContext.Provider value={[card, setCard]}>
                <CountContext.Provider value={[count, setCount]}>
                    <Cards />

                    <EnhancedTable />
                </CountContext.Provider>
            </CardContext.Provider>

            {/* <TableView /> */}
            {/* <Toolbar>
                <div style={{ textAlign: 'left', paddingTop: '.5%' }}>
                    <img src={clixLogo} />
                </div>
                <div className={classes.search}>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                </div>
            </Toolbar>
            <hr
                style={{
                    color: 'gray'
                }}
            /> */}
        </div>
    );
}

export default search;