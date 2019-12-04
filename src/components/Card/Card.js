import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardStyles from './Card-Styles'


export default function SimpleCard(props) {
    const classes = CardStyles();

    const [style, setStyle] = React.useState(classes.card);

    useEffect(() => {
        if (props.card[props.index] == 0) {
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
    }

    return (
        <div>
            <Card className={style} onClick={makeActive}>
                <CardContent>
                    {(props.card[props.index]) ? (<div class={classes.tickbg}>
                        <div className={classes.tick}>
                        </div>
                    </div>) : (<div style={{ paddingTop: '1rem' }}>   </div>)}
                    <Typography variant="h6" gutterBottom>
                        {props.count}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        {props.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
