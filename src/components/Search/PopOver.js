import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: 500,
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function PositionedPopper() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();

    const handleClick = newPlacement => event => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    return (
        <div className={classes.root}>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography className={classes.typography}>The content of the Popper. The content of the Popper.</Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <Grid container justify="center">
                <Grid item>
                    <Button onClick={handleClick('bottom-start')}>bottom-start</Button>
                    <Button onClick={handleClick('bottom')}>bottom</Button>
                    <Button onClick={handleClick('bottom-end')}>bottom-end</Button>
                </Grid>
            </Grid>
        </div>
    );
}
