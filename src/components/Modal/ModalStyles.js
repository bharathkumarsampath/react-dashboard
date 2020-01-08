import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300'


    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: '0.6rem',
        width: '26rem',
        height: '14.3rem'
    },
    displayFlex: {
        display: 'flex',
        marginLeft: '12rem',
        fontSize: '10rem'
    }
}));

export default useStyles;