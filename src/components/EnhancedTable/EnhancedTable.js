import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import TransitionsModal from '../Modal/Modal'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { CardContext } from '../Search/Search'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        color: 'white',
        backgroundColor: 'rgb(113,183,62)',
        borderColor: 'rgb(113,183,62)',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);


// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ];

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [[
    { id: 'SubmittedDate', numeric: true, disablePadding: false, label: 'Submitted Date' },
    { id: 'LoanID', numeric: true, disablePadding: false, label: 'Loan ID' },
    { id: 'Name', numeric: true, disablePadding: false, label: 'Name' },
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
    { id: 'SubmittedDate', numeric: true, disablePadding: false, label: 'Re-Work Date' },
    { id: 'LoanID', numeric: true, disablePadding: false, label: 'Loan ID' },
    { id: 'Name', numeric: true, disablePadding: false, label: 'Name' },
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
    { id: 'SubmittedDate', numeric: true, disablePadding: false, label: 'Re-Work Date' },
    { id: 'LoanID', numeric: true, disablePadding: false, label: 'Loan ID' },
    { id: 'Name', numeric: true, disablePadding: false, label: 'Name' },
    { id: 'MobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
    { id: 'LoanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
    // { id: 'Case Status', numeric: true, disablePadding: false, label: 'Case Status' },
    // { id: 'Agent Name', numeric: true, disablePadding: false, label: 'Agent Name' },
    { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }]
];

function EnhancedTableHead(props) {
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

    return (
        <TableHead>
            <TableRow style={{ backgroundColor: 'rgb(215,222,229' }}>
                <TableCell padding="checkbox">
                    {
                        (card[0] || card[4]) ? (
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{ 'aria-label': 'select all desserts' }}
                            />
                        ) : null
                    }

                </TableCell>
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
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgb(245,247,251)',
        },

    },
}))(TableRow);
const useToolbarStyles = makeStyles(theme => ({
    root: {
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                // color: theme.palette.secondary.main,
                color: 'rgb(113,183,62)',
                // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                backgroundColor: 'rgb(243,248,239)'
            }
            : {
                // color: theme.palette.text.primary,
                color: 'rgb(113,183,62)',
                // backgroundColor: theme.palette.secondary.dark,
                backgroundColor: 'rgb(243,248,239)'
            },
    title: {
        flex: '1 1 10%',
    },
}));



const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const childRef = useRef();
    const [card, setCard] = useContext(CardContext);
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
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >

            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" >
                    {numSelected} Selected
        </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        {cardParse(card)}
                    </Typography>
                )}

            <div style={{ marginLeft: '98rem' }}>
                {numSelected > 0 ? (
                    // <Tooltip title="Delete">
                    //     <IconButton aria-label="delete">
                    //         <DeleteIcon />
                    //     </IconButton>
                    // </Tooltip>
                    <div>
                        <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={() => childRef.current.handleOpen()}>
                            Approve
                </BootstrapButton>
                        <TransitionsModal ref={childRef}></TransitionsModal>
                    </div>
                ) : (
                        // <Tooltip title="Filter list">
                        //     <IconButton aria-label="filter list">
                        //         <FilterListIcon />
                        //     </IconButton>
                        // </Tooltip >
                        <ViewWeekIcon style={{ cursor: 'pointer' }}></ViewWeekIcon>
                    )}
            </div>
        </Toolbar >
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({

    root: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = React.useState([]);
    const [fetching, setisfetching] = React.useState(false);

    const [card, setCard] = useContext(CardContext);



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // if (localStorage.getItem('token') == null) {
                //     window.location.href = '/';
                // } else {
                setRows(rows);
                setisfetching(true);
                // const response = await axios.get(USER_SERVICE_URL);
                var settings = {
                    "url": "http://lstaging2.whizdm.com/loans/services/api/clix/portal/getAllLoanApplication?status=disbursed",
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
                }


                $.ajax(settings).done(function (response) {
                    console.log('first');
                    console.log(response);
                    setRows(JSON.parse(response));
                    setisfetching(false);
                });
                console.log("token in local storage " + localStorage.getItem('token'));
                //}

            } catch (e) {
                console.log(e);
                setRows(rows);
                setisfetching(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>

            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow
                                            hover
                                            onClick={event => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            {
                                                (card[0] || card[4]) ? (
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </TableCell>) : (<div style={{ blockSize: '2rem' }}></div>)

                                            }

                                            <TableCell component="th" id={labelId} scope="row" align="left">
                                                {row.submissionDate}
                                            </TableCell>
                                            <TableCell align="left">{row.loanApplicationNumber}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.kycContactMobile}</TableCell>
                                            <TableCell align="left">{row.loanAmount}</TableCell>
                                            {/* <TableCell align="left">{row.applicationStatus}</TableCell>
                                            <TableCell align="left">{row.appVersion}</TableCell> */}
                                            <TableCell align="left">VIEW</TableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <StyledTableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
