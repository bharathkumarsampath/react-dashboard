import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(1),
        whiteSpace: 'pre',
        height: '4vh'
    },
}));

export default function SimplePopover(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            {/* <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                View Reason
        </Button> */}
            <Typography
                aria-describedby={id}
                onClick={handleClick}
                style={{ color: '#4a90e2' }}
            >
                View Reason
         </Typography>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div >
                    <div className="displayFlex" style={{ letterSpacing: '0.4px', color: '#4a4a4a', justifyContent: 'space-between' }}>
                        <Typography className={classes.typography} style={{ color: '#4a4a4a' }}>{props.date}</Typography>
                        <CancelIcon style={{ marginLeft: '5vw', textAlign: 'right', cursor: 'pointer' }} onClick={handleClose} />
                    </div>
                    <div>

                        <Typography className={classes.typography}>{props.reason}</Typography>
                    </div>
                </div>
            </Popover>
        </div>
    );
}
