import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import useStyles from './LoaderStyles'

export default function Loader(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>


            <CircularProgress disableShrink className={classes.loader} />
            <Typography className={classes.loading}>Loading Data...</Typography>



        </div>
    );
}
