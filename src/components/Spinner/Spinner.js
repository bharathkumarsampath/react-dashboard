import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        padding: '15rem',
        paddingLeft: '40rem'
    },
}));



export default function CircularUnderLoad() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress disableShrink />
        </div>
    );
}
