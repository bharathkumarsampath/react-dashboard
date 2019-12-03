import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CardContext } from '../Search/Search'




export default function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    const [card, setCard] = useContext(CardContext);

    function getIndex(card) {
        var i;
        for (i = 0; i < card.length; i++) {
            if (card[i]) {
                return i;
            }
        }
    }

    const headCells = [[
        { id: 'SubmittedDate', numeric: false, disablePadding: false, label: 'Submitted Date' },
        { id: 'LoanID', numeric: true, disablePadding: false, label: 'Loan ID' },
        { id: 'Name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'MobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'LoanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        // { id: 'Case Status', numeric: true, disablePadding: false, label: 'Case Status' },
        // { id: 'Agent Name', numeric: true, disablePadding: false, label: 'Agent Name' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'SubmittedDate', numeric: true, disablePadding: false, label: 'Re-Work Date' },
        { id: 'LoanID', numeric: true, disablePadding: false, label: 'Loan ID' },
        { id: 'Name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'MobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'LoanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        // { id: 'Case Status', numeric: true, disablePadding: false, label: 'Case Status' },
        // { id: 'Agent Name', numeric: true, disablePadding: false, label: 'Agent Name' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'SubmittedDate', numeric: true, disablePadding: false, label: 'Approved Date' },
        { id: 'LoanID', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'Name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'MobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'LoanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        // { id: 'Case Status', numeric: true, disablePadding: false, label: 'Case Status' },
        // { id: 'Agent Name', numeric: true, disablePadding: false, label: 'Agent Name' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'SubmittedDate', numeric: true, disablePadding: false, label: 'Rejected Date' },
        { id: 'LoanID', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'Name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'MobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'LoanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'Reason', numeric: true, disablePadding: false, label: 'Reason' },
        // { id: 'Agent Name', numeric: true, disablePadding: false, label: 'Agent Name' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'SubmittedDate', numeric: true, disablePadding: false, label: 'Re-Work Date' },
        { id: 'LoanID', numeric: true, disablePadding: false, label: 'Loan ID' },
        { id: 'Name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'MobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'LoanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        // { id: 'Case Status', numeric: true, disablePadding: false, label: 'Case Status' },
        // { id: 'Agent Name', numeric: true, disablePadding: false, label: 'Agent Name' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }]
    ];

    return (
        <TableHead>
            <TableRow style={{ backgroundColor: 'rgb(215,222,229' }}>

                {
                    (card[0] || card[4]) ? (
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{ 'aria-label': 'select all desserts' }}
                            />
                        </TableCell>
                    ) : null
                }


                {headCells[getIndex(card)].map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};