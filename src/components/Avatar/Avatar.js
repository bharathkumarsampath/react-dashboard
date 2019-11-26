import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './Avatar-styles'

export default function LetterAvatars() {
    const classes = useStyles();

    return (
        <Avatar className={classes.purpleAvatar}>HS</Avatar>
    );
}