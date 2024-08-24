import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../SnackBarContentWrapper/SnackBarContentWrapper'


export default function CustomizedSnackbars(props) {

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={props.snackBar}
                autoHideDuration={4000}
                onClose={props.hideSnackBar}
            >
                <MySnackbarContentWrapper
                    onClose={props.hideSnackBar}
                    variant={props.variant}
                    message={props.message}
                />
            </Snackbar>
        </div>
    );
}
