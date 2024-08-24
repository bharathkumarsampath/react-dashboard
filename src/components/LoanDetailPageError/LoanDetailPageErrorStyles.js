import { makeStyles } from '@material-ui/core/styles';

const LoanDetailPageErrorStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'rgb(245,247,251)',
        textAlign: 'center',
        padding: '10%'
    },
    errorIconOne: {
        width: '56px',
        height: '56px'
    },
    errorPhraseOne: {
        width: '385px',
        height: '30px',
        letterSpacing: '0.25px',
        textAlign: 'center',
        color: '#9096ba',
        paddingLeft: '27%',
        fontSize: '22px',
        fontWeight: '600',
        paddingTop: '0.6%'
    },
    errorPhraseTwo: {
        width: '452px',
        height: '19px',
        letterSpacing: '0.25px',
        textAlign: 'center',
        color: '#9096ba',
        fontSize: '14px',
        paddingLeft: '24%',
        paddingTop: '0.6%'
    },
    errorIconTwo: {
        width: '48px',
        height: '48px',
        paddingTop: '1%',
        cursor: 'pointer'
    }
}));

export default LoanDetailPageErrorStyles;