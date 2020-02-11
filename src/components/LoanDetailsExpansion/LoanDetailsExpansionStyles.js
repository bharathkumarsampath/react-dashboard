import { makeStyles } from '@material-ui/core/styles';

const LoanDetailsExpansionStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        width: '28vw',
        height: '80vh',
        flex: "auto",
        flexDirection: 'column',
        overflow: 'auto',
        borderRadius: '0.4rem',
        margin: '1rem',
        boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default LoanDetailsExpansionStyles;