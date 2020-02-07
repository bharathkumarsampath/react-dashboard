

import { makeStyles } from '@material-ui/core/styles';


const ListStyles = makeStyles(theme => ({
    impFields: {
        backgroundColor: '#f5f7fb',
        display: 'flex',
        padding: '0.8rem 1rem 0rem 1rem',
        justifyContent: 'space-between'
    },
    cell: {
        display: 'flex',
        padding: '0.8rem 1rem 0rem 1rem',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: '14px',
        fontWeight: '400',
        heigth: '19px',
        letterSpacing: '0.25px',
        lineHeight: '19px'
    },
    value: {
        fontWeight: '600',
        textAlign: 'right',
        fontSize: '14px',
        heigth: '20px',
        letterSpacing: '0.25px',
        lineHeight: '19px'
    }


}));

export default ListStyles;