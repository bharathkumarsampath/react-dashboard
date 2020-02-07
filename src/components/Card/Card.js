import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardStyles from './Card-Styles'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SimpleCard(props) {
    const classes = CardStyles();

    const [style, setStyle] = React.useState(classes.card);

    useEffect(() => {
        if (props.card[props.index] === 0) {
            setStyle(classes.card);
        } else {
            setStyle(classes.activeCard);
        }
    });

    function makeActive() {
        var array = [0, 0, 0, 0, 0];
        array[props.index] = 1;
        array[5] = props.index;
        props.setCard(array);
        localStorage.setItem('cards', JSON.stringify(array));
    }

    return (
        <div>
            <Card className={style} onClick={makeActive}>
                <CardContent>
                    {(props.card[props.index] && props.count) ? (
                        <div className={classes.tickbg}>
                            <div className={classes.tick}>
                            </div>
                        </div>

                    ) : (<div style={{ paddingTop: '1rem' }}>   </div>)}
                    {(props.error) ? (<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                        <path fill="#EC7474" fillRule="nonzero" d="M30.063 5.908c-.808-1.526-3.318-1.526-4.126 0l-21 39.667A2.331 2.331 0 0 0 7 49h42a2.329 2.329 0 0 0 2.06-3.423L30.063 5.908zM30.333 42h-4.666v-4.667h4.666V42zm-4.666-9.333V21h4.666l.003 11.667h-4.67z" />
                    </svg>
                    ) : (
                            (props.count === undefined) ? (
                                <CircularProgress disableShrink style={{ color: 'rgb(113,183,61)' }} />
                            ) : (


                                    <React.Fragment><Typography variant="h6" gutterBottom>
                                        {props.count}
                                    </Typography>
                                    </React.Fragment>

                                ))
                    }
                    <Typography variant="button" display="block" gutterBottom>
                        {props.text}
                    </Typography>

                </CardContent>
            </Card>
        </div >
    );
}
