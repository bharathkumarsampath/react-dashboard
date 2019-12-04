import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useToolbarStyles = makeStyles(theme => ({
    root: {
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                // color: theme.palette.secondary.main,
                color: 'rgb(113,183,62)',
                // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                backgroundColor: 'rgb(243,248,239)'
            }
            : {
                // color: theme.palette.text.primary,
                color: 'rgb(113,183,62)',
                // backgroundColor: theme.palette.secondary.dark,
                backgroundColor: 'rgb(243,248,239)'
            },
    title: {
        marginRight: '70%',
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