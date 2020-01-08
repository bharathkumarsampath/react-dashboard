import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        padding: '15vw',
        paddingLeft: '44vw'

    },
    loading: {
        paddingTop: '1vh'
    },
    loader: {
        color: 'rgb(113,183,61)'
    }
}));

export default useStyles;