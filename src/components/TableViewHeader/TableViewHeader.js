import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TransitionsModal from '../Modal/Modal'
import { CardContext } from '../../containers/Dashboard/Dashboard'
import { BootstrapButton, useToolbarStyles } from './TableViewHeaderStyle'


export default function TableViewToolbar(props) {
    const classes = useToolbarStyles();
    const { numSelected, bulkApprove } = props;
    const childRef = useRef();
    const [card] = useContext(CardContext);
    function cardParse(card) {
        if (card[0]) {
            return "Pending Applications";
        }
        else if (card[1]) {
            return "Re-work Applications";
        }

        else if (card[2]) {

            return "Approved Applications";
        }
        else if (card[3]) {
            return "Rejected/Cancelled Applications";
        }

        else if (card[4]) {
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
                <BootstrapButton disabled={(numSelected) ? (false) : (true)} variant="contained" color="primary" disableRipple onClick={() => childRef.current.handleOpen()}>
                    APPROVE
                </BootstrapButton>
                <TransitionsModal ref={childRef} bulkApprove={bulkApprove}></TransitionsModal>
            </div>


        </Toolbar >
    );
};

TableViewToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};