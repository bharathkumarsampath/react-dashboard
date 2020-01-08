import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    margin: {
        margin: theme.spacing(1),
    },
    userDim: {
        border: '1px solid #ccc',
        padding: '13px 10px',
        boxSizing: 'border-box',
        borderRadius: '5px',
        width: '75%',
        height: '15%',
        fontSize: '100%',
        backgroundColor: 'rgb(244,244,244)',
        marginBottom: '3%'

    },
    forgetPassStyle: {
        color: 'rgb(131,195,230)',
        textDecoration: 'underline',
        marginLeft: '1%',
        fontWeight: '500'
    },
    buttonStyle: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: 'rgb(22,139,207)',
        marginLeft: '37%',
        color: 'white',
        padding: '3% 4%',
        fontSize: '100%',
        cursor: 'pointer'

    },
    boxDim: {
        display: 'block-inline',
        border: '1px solid rgb(231,231,231)',
        marginLeft: '37%',
        marginRight: '37%',
        marginTop: '5%',
        borderRadius: '5px',
        paddingTop: '2%',
        paddingBottom: '4%'

    },
    bgcolor: {
        backgroundColor: '#EBF4F9',
        height: '100%',
        width: '100%',
        marginTop: '80px',
        flexGrow: 1
    },
    toolbar: {
        // display: flex
    },
    appbarDim: {
        textAlign: 'left',
        paddingTop: '1%',
        paddingLeft: '1%',
        paddingBottom: '1%'
    },
    LogoDimension: {
        height: '50px',
        width: '300px'

    },
    appbarColor: {
        backgroundColor: '#fff'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        border: '3px solid #f2f2f2',
        padding: "30px",
        backgroundColor: '#fff'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loginBox: {
        height: "50px",
        width: "400px",
        marginLeft: "150px",
        marginTop: "50px"
    },
    topmrgn: {
        marginTop: "10px"
    },
    vb: {
        height: "10px"
    },
    mrgnImage: {
        marginTop: "40%",
        cursor: 'pointer',
        maxwidth: '10%'
    }

}));

export default useStyles;
