import { makeStyles } from '@material-ui/core/styles';

const LoanAgreementStyles = makeStyles(theme => ({
    loanAgreementComponent: {
        backgroundColor: 'white',
        width: '67vw',
        height: '80vh',
        borderRadius: '0.4rem',
        margin: '1rem',
        boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)'
    },
    loanAgreementHeader: {
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    loanAgreementText: {
        fontSize: '1.1rem',
        fontWeight: '500',
        textAlign: 'left'
    },
    submittedOnText: {
        paddingTop: '0.7vh',
        textAlign: 'right'
    },
    loanAgreementPdf: {
        width: '67vw',
        height: '72vh'
    }
}));

export default LoanAgreementStyles;