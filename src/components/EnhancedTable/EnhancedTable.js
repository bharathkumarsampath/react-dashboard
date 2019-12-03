import React, { useEffect, useRef, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { CardContext, CountContext } from '../Search/Search'
import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead'
import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar'
import Spinner from '../Spinner/Spinner'
import { StyledTableRow, useStyles } from './EnhancedTableStyles'



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
    //console.log('stable sort ' + JSON.parse(array));

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    console.log(stabilizedThis.map(el => el[0]));
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('LoanID');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = React.useState([]);
    //const [count, setCount] = React.useState({ loanApproved: 3, nachEmailSent: 27, disbursed: 5, rejected: 12, all: 167 });
    const [fetching, setisfetching] = React.useState(false);
    const [spinner, setSpinner] = React.useState(true);

    const [card, setCard] = useContext(CardContext);
    const [count, setCount] = useContext(CountContext);

    function unSelect() {
        setSelected([]);
    }

    function bulkApprove() {
        console.log("json to be sent " + JSON.stringify({ bulkApprove: selected }));
        console.log("json to be sent " + selected);
        var settings = {
            "url": "http://localhost:8080/services/api/clix/portal/bulkApprove",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
                "status": cardParse(card)
            }
        }

        console.log('Beofre fetch call');
        fetch(settings.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({ bulkApprove: selected })
        }).then(res => res.json()
        ).then(res => {
            console.log('bulkapprove', res);
            setRows(JSON.parse(res.data));
            setCount(JSON.parse(res.udrsCount));
            setisfetching(false);
            setSpinner(false);
        });
        unSelect();
    }
    // const cardArray = ["nach_email_sent","disbursed","loan_approved","data_entry","disbursed"]

    function cardParse(card) {
        if (card[0]) {
            return "nach_email_sent";
        }
        else if (card[1]) {
            return "disbursed";
        }

        else if (card[2]) {

            return "loan_approved";
        }
        else if (card[3]) {
            return "data_entry";
        }

        else if (card[4]) {
            return "disbursed";
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setSpinner(true);
                // if (localStorage.getItem('token') == null) {
                //     window.location.href = '/';
                // } else {
                setRows(rows);
                setisfetching(true);
                // const response = await axios.get(USER_SERVICE_URL);
                var settings = {
                    "url": "http://localhost:8080/services/api/clix/portal/getAllLoanApplication?status=" + cardParse(card),
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
                }

                console.log('Beofre fetch call');
                fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }

                }).then(res => res.json()
                ).then(res => {
                    console.log('res === through fetch', res);
                    setRows(JSON.parse(res.data));
                    // var udrsCount = JSON.parse(JSON.stringify(res.udrsCount));


                    // console.log('udrsCount ', JSON.parse(res.udrsCount.replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":')));
                    // console.log('udrsCount.loanApproved ', udrsCount.loanApproved);
                    setCount(JSON.parse(res.udrsCount));
                    setisfetching(false);
                    setSpinner(false);
                });

                // $.ajax(settings).done(function (response) {
                //     console.log('first');
                //     console.log(response);
                //     setRows(JSON.parse(response));
                //     setisfetching(false);
                // });
                console.log("token in local storage " + localStorage.getItem('token'));
                //}

            } catch (e) {
                console.log(e);
                setRows(rows);
                setisfetching(false);
            }
        };
        fetchUsers();
    }, [card]);

    const handleRequestSort = (event, property) => {
        console.log("sort function called ");
        console.log("property " + property);
        console.log("orderby " + orderBy);
        console.log("order " + order);
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.loanApplicationNumber);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };



    const handleClick = (event, loanApplicationNumber) => {


        const selectedIndex = selected.indexOf(loanApplicationNumber);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, loanApplicationNumber);
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
        console.log("selected " + selected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = loanApplicationNumber => selected.indexOf(loanApplicationNumber) !== -1;

    return (
        <div className={classes.root}>
            {(spinner) ? (<Spinner />) :
                (<Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} bulkApprove={bulkApprove} />
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
                                        const isItemSelected = isSelected(row.loanApplicationNumber);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <StyledTableRow
                                                hover
                                                onClick={event => handleClick(event, row.loanApplicationNumber)}
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
                                                        </TableCell>) : null
                                                    // (<div style={{ blockSize: '2rem' }}></div>)

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
                                                {
                                                    (card[3]) ? (
                                                        <TableCell align="left">{row.documentsRejectReason}</TableCell>) : (
                                                            // <div style={{ blockSize: '2rem' }}></div>
                                                            null
                                                        )

                                                }
                                                <TableCell align="left">VIEW</TableCell>
                                            </StyledTableRow>
                                        );
                                    })}
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
                </Paper>)}
        </div>
    );
}
