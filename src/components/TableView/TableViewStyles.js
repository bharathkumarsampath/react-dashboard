import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgb(245,247,251)',
        },

    },
}))(TableRow);


const useStyles = makeStyles(theme => ({

    root: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    profileView: {
        width: '40px',
        height: '19px',
        fontSize: '14px',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: 'rgb(80,147,223)',
        textDecoration: 'none'
    },
    profileLocked: {
        width: '40px',
        height: '19px',
        fontSize: '14px',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#cec3d8',
        textDecoration: 'none'
    }
}));

export { useStyles, StyledTableRow };