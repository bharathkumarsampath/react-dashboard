import React, { useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Search.css'
import PopOver from './PopOver'
import { LoanAppContext } from '../../containers/Dashboard/Dashboard'

const search = () => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [loanApps, setLoanApps] = React.useContext(LoanAppContext);
    const isFirstRun = useRef(true);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        console.log("loanApps " + JSON.stringify(loanApps));
        const results = loanApps.filter(person =>
            person.loanApplicationNumber.toLowerCase().includes(searchTerm)
        );
        setLoanApps(results);
    }, [searchTerm]);
    return (

        <div className="search">
            <input type="text" onClick={handleClick} onChange={e => setSearchTerm(e.target.value)} className="searchTerm" placeholder="Search by Loan ID, mobile number or email ID" />
            <button type="submit" className="searchButton">
                <SearchIcon style={{ color: 'white', paddingTop: '14%' }} />
            </button>
            <PopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleClick={handleClick} />
        </div>

    );
}

export default search;