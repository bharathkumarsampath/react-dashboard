import React, { useContext } from 'react';
import Search from '../../components/Search/Search'
import '../../components/Search/Search.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
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
        backgroundColor: 'white',
        borderColor: 'rgb(113,184,62)',
        color: 'rgb(113,184,62)',
        padding: '0.5rem 2.3rem 0.5rem 2.3rem',
        fontWeight: 'bolder',
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
            backgroundColor: 'rgb(113,184,62)',
            borderColor: 'rgb(113,184,62)',
            boxShadow: 'none',
            color: 'white'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'rgb(113,184,62)',
            borderColor: 'rgb(113,184,62)',
            color: 'white'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const LoansHeader = (props) => {
    const classes = useStyles();
    return (
        <div className="toolbar" style={{ display: "flex", marginTop: '0.2rem', backgroundColor: 'white' }}>
            <div style={{ textAlign: 'left', paddingLeft: '2%', paddingTop: '1%', color: 'grey' }}>
                <ArrowBackIcon />
            </div>
            <div style={{ paddingLeft: '1%', paddingTop: '0.8%' }}>
                <Typography variant="h5" gutterBottom>
                    LAN - MV{props.LoanApp.loanApplicationNumber}
                </Typography>
            </div>
            <div style={{ paddingLeft: '45rem' }}>
                <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
                    RE-WORK
                </BootstrapButton>
                <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
                    APPROVE
                </BootstrapButton>
            </div>

        </div>
    );
}

export default LoansHeader;