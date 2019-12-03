

import { makeStyles } from '@material-ui/core/styles';


const CardStyles = makeStyles({
    card: {
        maxWidth: 200,
        minWidth: 180,
        backgroundColor: 'white',
        marginLeft: '1.5rem',
        padding: '1rem',
        borderRadius: '10px 10px 10px 10px',
        cursor: 'pointer'
        // '&:hover': {
        //     backgroundColor: 'rgb(243,248,239)',
        //     //boxShadow: '-1px 9px 18px 0px rgba(0,0,0,0.75)',
        //     boxShadow: '0px 5px 10px -1px rgba(0,0,0,0.75)',
        //     border: '1px solid rgb(165,201,138)'
        // }
    },
    activeCard: {
        maxWidth: 200,
        minWidth: 180,
        backgroundColor: 'rgb(243,248,239)',
        boxShadow: '0px 5px 10px -1px rgba(0,0,0,0.75)',
        border: '1px solid rgb(165,201,138)',
        marginLeft: '1.5rem',
        padding: '1rem',
        borderRadius: '10px 10px 10px 10px',
        cursor: 'pointer'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    tickbg: {
        content: '\\00a0',
        border: 'solid 8px #00CD00',
        borderRadius: '9px',
        height: 0,
        width: 0,
        display: 'block',

        marginLeft: '9rem'
    },


    tick: {
        height: '6px',
        width: '3px',
        border: 'solid #FFFFFF',
        borderWidth: '0px 2px 2px 0px',
        transform: 'rotate(45deg)',
        display: 'block',
        marginTop: '-5px',
        marginLeft: '-2px',

    }


});

export default CardStyles;