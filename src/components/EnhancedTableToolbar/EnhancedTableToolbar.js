import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import TransitionsModal from '../Modal/Modal'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { CardContext } from '../Search/Search'
import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead'


const useToolbarStyles = makeStyles(theme => ({
    root: {
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                // color: theme.palette.secondary.main,
                color: 'rgb(113,183,62)',
                // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                backgroundColor: 'rgb(243,248,239)'
            }
            : {
                // color: theme.palette.text.primary,
                color: 'rgb(113,183,62)',
                // backgroundColor: theme.palette.secondary.dark,
                backgroundColor: 'rgb(243,248,239)'
            },
    title: {
        marginRight: '70%',
        display: 'flex'
    },
}));

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        color: 'white',
        backgroundColor: 'rgb(113,183,62)',
        borderColor: 'rgb(113,183,62)',
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
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);


export default function EnhancedTableToolbar(props) {
    const classes = useToolbarStyles();
    const { numSelected ,bulkApprove } = props;
    const childRef = useRef();
    const [card, setCard] = useContext(CardContext);
    function cardParse(card) {
        if (card[0]) {
            return "Pending Applications";
        }
        else if (card[1]) {
            return "Re-work Applications";
        }

        else if (card[2]) {

            return "Approved Applications";
        }
        else if (card[3]) {
            return "Rejected/Cancelled Applications";
        }

        else if (card[4]) {
            return "All Applications";
        }
    }



    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >

            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" style={{ fontSize: '1rem' }} >
                    {numSelected} Applications Selected
        </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" >
                        {cardParse(card)}
                    </Typography>
                )}

            <div>
                {numSelected > 0 ? (
                    // <Tooltip title="Delete">
                    //     <IconButton aria-label="delete">
                    //         <DeleteIcon />
                    //     </IconButton>
                    // </Tooltip>
                    <div>
                        <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={() => childRef.current.handleOpen()}>
                            Approve
                </BootstrapButton>
                        <TransitionsModal ref={childRef} bulkApprove={bulkApprove}></TransitionsModal>
                    </div>
                ) : (
                        // <Tooltip title="Filter list">
                        //     <IconButton aria-label="filter list">
                        //         <FilterListIcon />
                        //     </IconButton>
                        // </Tooltip >
                        // <ViewWeekIcon style={{ cursor: 'pointer' }}></ViewWeekIcon>
                        null
                    )}
            </div>
        </Toolbar >
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};