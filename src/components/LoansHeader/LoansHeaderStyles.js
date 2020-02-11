import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    paperone: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: '8px',
        textAlign: 'center',
        marginTop: '5vh'
    },
    reworkModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // papertwo: {
    //     position: 'absolute',
    //     backgroundColor: theme.palette.background.paper,
    //     padding: theme.spacing(2, 4, 3),
    //     borderRadius: '8px',
    //     textAlign: 'center',
    //     marginTop: '5vh'
    // },
    // paperthree: {
    //     position: 'absolute',
    //     backgroundColor: theme.palette.background.paper,
    //     padding: theme.spacing(2, 4, 3),
    //     borderRadius: '8px',
    //     textAlign: 'center',
    //     marginTop: '5vh'
    // },
    textArea: {
        '& .MuiTextField-root': {
            width: 400,
            marginTop: '2%'
        },
    },
    onerow: {
        marginLeft: '7vw'
    },
    tworow: {
        marginLeft: '20vw'
    },
    threerow: {
        marginLeft: '30vw'
    },
    root: {
        display: 'flex',
        marginTop: '0.2rem',
        backgroundColor: 'white',
        justifyContent: "space-between",
        paddingLeft: '2%'
    }
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