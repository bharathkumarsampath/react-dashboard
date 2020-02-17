import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '1%',
        marginBottom: '2%'
    },
    RowsPerPage: {
        marginTop: '0.8%',
        letterSpacing: '0.34px',
        color: 'rgba(0, 0, 0, 0.54)',

    },
    select: {
        marginLeft: '3%',
        letterSpacing: '0.34px',
        color: 'rgba(0, 0, 0, 0.54)',
        marginBottom: '1%'
    },
    clickable: {
        cursor: 'pointer',
        marginTop: '0.3%',
        color: 'rgba(0, 0, 0, 0.54)',
        marginLeft: '2%',

    },
    pagination: {
        marginLeft: '3%',
        marginTop: '0.8%',
        letterSpacing: '0.34px',
        color: 'rgba(0, 0, 0, 0.54)',
    },

}));

export default function Pagination(props) {
    const classes = useStyles();

    const handleChange = event => {
        props.setRowsPerPage(event.target.value);
        props.setPage2(0);
    };
    const navigateNextPage = event => {
        if ((props.page2 + 1) * props.rowsPerPage + 1 <= props.count) {
            props.setPage2(props.page2 + 1);

        }

    };
    const navigatePreviousPage = event => {
        if (props.page2 - 1 >= 0) {
            props.setPage2(props.page2 - 1);
        }
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.RowsPerPage}>
                Rows per page :
                            </Typography>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={props.rowsPerPage}
                onChange={handleChange}
                className={classes.select}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
            </Select>
            <Typography className={classes.pagination}>
                {props.page2 * props.rowsPerPage + 1}-{(props.page2 + 1) * props.rowsPerPage <= props.count ? (props.page2 + 1) * props.rowsPerPage : props.count} of {props.count}
            </Typography>
            <ChevronLeftIcon color="disabled" className={classes.clickable} onClick={navigatePreviousPage} />
            <ChevronRightIcon color="disabled" className={classes.clickable} onClick={navigateNextPage} />

        </div>
    );
}
