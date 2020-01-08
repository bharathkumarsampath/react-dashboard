import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useToolbarStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: 'rgb(113,183,62)',
                backgroundColor: 'rgb(243,248,239)'
            }
            : {
                color: 'rgb(113,183,62)',
                backgroundColor: 'rgb(243,248,239)'
            },
    title: {
        marginRight: '80%',
        display: 'flex'
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
        color: 'white',
        backgroundColor: 'rgb(113,183,62)',
        borderColor: 'rgb(113,183,62)',
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
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

export { BootstrapButton, useToolbarStyles };