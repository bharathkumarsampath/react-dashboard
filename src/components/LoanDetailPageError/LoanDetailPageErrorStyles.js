import { makeStyles } from '@material-ui/core/styles';

const LoanDetailPageErrorStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'rgb(245,247,251)',
        textAlign: 'center',
        padding: '10rem'
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
        paddingLeft: '27vw',
        fontSize: '22px',
        fontWeight: '600',
        paddingTop: '0.6rem'
    },
    errorPhraseTwo: {
        width: '452px',
        height: '19px',
        letterSpacing: '0.25px',
        textAlign: 'center',
        color: '#9096ba',
        fontSize: '14px',
        paddingLeft: '24vw',
        paddingTop: '0.6rem'
    },
    errorIconTwo: {
        width: '48px',
        height: '48px',
        paddingTop: '1rem',
        cursor: 'pointer'
    }
}));

export default LoanDetailPageErrorStyles;