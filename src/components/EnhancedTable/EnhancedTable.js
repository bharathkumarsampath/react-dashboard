import React, { useEffect, useRef, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { CardContext, CountContext, LatestCountContext } from '../../containers/Dashboard/Dashboard'
import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead'
import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar'
import Spinner from '../Spinner/Spinner'
import { StyledTableRow, useStyles } from './EnhancedTableStyles'
import { useHistory, Link } from "react-router-dom";
import { LoanAppContext } from '../../containers/Dashboard/Dashboard'



function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


export default function EnhancedTable() {
    let history = useHistory();
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('loanAmount');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = React.useContext(LoanAppContext);
    //const [count, setCount] = React.useState({ loanApproved: 3, nachEmailSent: 27, disbursed: 5, rejected: 12, all: 167 });
    const [isFetching, setIsFetching] = React.useState(false);
    const [spinner, setSpinner] = React.useState(true);
    const [error, setError] = React.useState({});

    const [card, setCard] = useContext(CardContext);
    const [count, setCount] = useContext(CountContext);
    const [latestCount, setLatestCount] = useContext(LatestCountContext);

    function unSelect() {
        setSelected([]);
    }
    function stableSort(array, cmp) {

        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        console.log("stabilized array1" + JSON.stringify(stabilizedThis.map(el => el[0])));
        //setRows(stabilizedThis);
        return stabilizedThis.map(el => el[0]);
    }

    async function bulkApprove() {
        console.log("bulk approve is getting called " + JSON.stringify({ bulkApprove: selected }));
        var settings = {
            "crossDomain": true,
            "url": "http://localhost:8080/services/api/clix/portal/bulkApprove",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
            }
        }

        await fetch(settings.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({ bulkApprove: selected, status: cardParse(card) })
        }).then(res => res.json()
        ).then(res => {
            console.log('bulkapprove', res);
            console.log('length ', res.data.length);
            setRows(JSON.parse(res.data));
            console.log("count " + JSON.stringify(count));
            console.log("count length " + JSON.stringify(count.length));
            // setIsFetching(false);
            // setSpinner(false);
            setLatestCount(!latestCount);

        });
        unSelect();
        //setCard(...card);
    }
    const cardArray = ["nach_email_sent", "disbursed", "loan_approved", "data_entry", "disbursed"]

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
                setIsFetching(true);
                setError(false);
                var settings = {
                    "url": "http://localhost:8080/services/api/clix/portal/getAllLoanApplication?status=" + cardParse(card),
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
                }
                await fetch(settings.url, {
                    mode: 'no-cors',
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }

                }).then(res => res.text()
                ).then(res => {
                    console.log(res);
                    // setRows(JSON.parse(res.data));
                    //setCount(JSON.parse(res.udrsCount));
                });

            } catch (e) {
                console.log(e);
                setError(true);
            }
            setIsFetching(false);
        };
        fetchUsers();
    }, [card]);

    const handleRequestSort = (event, property) => {

        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
        console.log("sort function called ");
        console.log("property " + property);
        console.log("orderby " + orderBy);
        console.log("order " + order);
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

    function viewProfile(event) {
        console.log(event.target.id);
        var loanApplicationNumber = event.target.id;
        localStorage.setItem('appNumber', event.target.id);
        history.push({
            pathname: '/userprofile',
            //data: { loanApplicationNumber: loanApplicationNumber } // your data array of objects
        });
        // window.location.href = '/userprofile';
    }

    // useAsync({ promiseFn: fetchUsers })
    // if (isFetching) return (<Spinner />)
    // if (error) return (`Something went wrong: ${error.message}`)
    // if (rows)
    return (
        <div className={classes.root}>
            {error && <div>Something went wrong ...</div>}
            {(isFetching) ? (<Spinner />) :
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
                                                key={row.id}
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

                                                }

                                                <TableCell component="th" id={labelId} scope="row" align="left">
                                                    {row.submissionDate}
                                                </TableCell>
                                                <TableCell align="left">{row.loanApplicationNumber}</TableCell>
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.kycContactMobile}</TableCell>
                                                <TableCell align="left">{row.loanAmount}</TableCell>
                                                {
                                                    (card[0]) ? (

                                                        (row.agentName) ? (<TableCell align="left">Locked</TableCell>)
                                                            : (<TableCell align="left">Available</TableCell>)

                                                    ) : (null)

                                                }
                                                {
                                                    (card[0]) ? (

                                                        (row.agentName) ? (<TableCell align="left">{row.agentName}</TableCell>)
                                                            : (<TableCell align="left">---</TableCell>)

                                                    ) : (null)

                                                }
                                                {
                                                    (card[3]) ? (
                                                        <TableCell align="left">{row.documentsRejectReason}</TableCell>) : (
                                                            // <div style={{ blockSize: '2rem' }}></div>
                                                            null
                                                        )

                                                }
                                                <TableCell align="left" id={row.loanApplicationNumber} style={{ cursor: 'pointer', color: 'rgb(154,216,250)', textDecoration: 'none' }}>
                                                    <Link to={{
                                                        pathname: '/userprofile',
                                                        state: {
                                                            LoanApp: row
                                                        }
                                                    }}>VIEW
                                                    </Link>
                                                </TableCell>
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
