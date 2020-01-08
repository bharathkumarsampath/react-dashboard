import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        position: 'absolute',
        width: 465,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: '8px',
        textAlign: 'center',
        marginLeft: '32vw',
        marginTop: '5vh'
    },
    textArea: {
        '& .MuiTextField-root': {
            width: 400,
            marginTop: '4%'
        },
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
        //padding: '0.5rem 2.3rem 0.5rem 2.3rem',
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

const ModalButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: 'white',
        color: 'rgb(113,184,62)',
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
            color: 'white',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'rgb(113,184,62)',
            color: 'white',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

export { useStyles, BootstrapButton, ModalButton };