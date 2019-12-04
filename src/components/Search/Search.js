import React, { useState } from 'react';
import clixLogo from '../../assets/images/clixLogo.png';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Search.css'
import Cards from '../CountBoard/CountBoard'
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import useStyles from './SearchStyles'

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
    const classes = useStyles();
    return (
        <div>
            <div className="toolbar">
                <div style={{ textAlign: 'left', paddingTop: '.5%', paddingLeft: '.5%' }}>
                    <img src={clixLogo} width={220} height={50} />
                </div>
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search by Loan ID, mobile number or email ID" />
                    <button type="submit" className="searchButton">
                        <SearchIcon style={{ color: 'white', paddingTop: '14%' }} />
                    </button>
                </div>
                <Account style={{ fontSize: '35', paddingTop: '1%', paddingLeft: '2%' }} color="disabled" fontSize="large" />

            </div>
            <Divider />
            <CardContext.Provider value={[card, setCard]}>
                <CountContext.Provider value={[count, setCount]}>
                    <Cards />

                    <EnhancedTable />
                </CountContext.Provider>
            </CardContext.Provider>
        </div>
    );
}

export default search;