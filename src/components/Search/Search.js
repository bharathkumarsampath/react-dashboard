import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Search.css'

const search = () => {
    return (

        <div className="search">
            <input type="text" className="searchTerm" placeholder="Search by Loan ID, mobile number or email ID" />
            <button type="submit" className="searchButton">
                <SearchIcon style={{ color: 'white', paddingTop: '14%' }} />
            </button>
        </div>

    );
}

export default search;