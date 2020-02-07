import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TransitionsModal from '../Modal/Modal'
import { CardContext } from '../../containers/Dashboard/Dashboard'
import { BootstrapButton, useToolbarStyles } from './TableViewHeaderStyle'
import { globals } from '../../globals'


export default function TableViewToolbar(props) {
    const classes = useToolbarStyles();
    const { numSelected, bulkLock } = props;
    const childRef = useRef();
    const [card] = useContext(CardContext);
    function cardParse(card) {
        if (card[globals.cards.PENDING]) {
            return "Pending Applications";
        }
        else if (card[globals.cards.RE_WORK]) {
            return "Re-work Applications";
        }

        else if (card[globals.cards.APPROVED]) {

            return "Approved Applications";
        }
        else if (card[globals.cards.REJECTED_OR_CANCELLED]) {
            return "Rejected/Cancelled Applications";
        }

        else if (card[globals.cards.ALL]) {
            return "All Applications";
        }
    }



    return (
        <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0, })}>


            <div>
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" style={{ fontSize: '1rem' }} >
                        {numSelected} Applications Selected
                </Typography>) : (
                        <Typography className={classes.title} variant="h6" id="tableTitle" >
                            {cardParse(card)}
                        </Typography>
                    )}
            </div>
            <div style={{ textAlign: 'right' }}>
                <BootstrapButton disabled={(numSelected) ? (false) : (true)} variant="contained" color="primary" disableRipple
                    onClick={() => childRef.current.handleOpen()}
                >
                    LOCK
                </BootstrapButton>
                <TransitionsModal ref={childRef} bulkLock={bulkLock}></TransitionsModal>
            </div>


        </Toolbar >
    );
};

TableViewToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};