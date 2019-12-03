import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '../Button/Button'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: '0.6rem',
        width: '26rem'
    },
    displayFlex: {
        display: 'flex',
        marginLeft: '12rem',
        fontSize: '10rem'
    }
}));

const TransitionsModal = forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useImperativeHandle(ref, () => ({

        handleOpen() {
            setOpen(true);
        }

    }));

    const handleClose = () => {
        setOpen(false);
        props.bulkApprove();
    };

    return (
        <div>
            {/* <button type="button" onClick={handleOpen}>
                react-transition-group
      </button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {/* <h5 id="transition-modal-description">Are you sure you want to approve the selected applications</h5> */}
                        <Typography variant="h5" gutterBottom>
                            Are you sure you want to approve the selected applications
                        </Typography>
                        <div className={classes.displayFlex}>
                            <Button text="CANCEL" close={handleClose}></Button>
                            <Button text="APPROVE" close={handleClose}></Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
});

export default TransitionsModal;