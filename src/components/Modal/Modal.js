import React, { forwardRef, useImperativeHandle } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '../Button/Button'
import Typography from '@material-ui/core/Typography';
import useStyles from './ModalStyles'

const TransitionsModal = forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useImperativeHandle(ref, () => ({

        handleOpen() {
            setOpen(true);
        }

    }));

    const handleCloseAndApprove = () => {
        setOpen(false);
        props.bulkApprove();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
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
                            <Button text="CANCEL" onClick={handleClose}></Button>
                            <Button text="APPROVE" onClick={handleCloseAndApprove}></Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
});

export default TransitionsModal;