import React, { useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { CardContext, LatestCountContext, CountContext } from '../../containers/Dashboard/Dashboard'
import EnhancedTableHead from '../TableViewHead/TableViewHead'
import EnhancedTableToolbar from '../TableViewHeader/TableViewHeader'
import Spinner from '../Loader/Loader'
import { StyledTableRow, useStyles } from './TableViewStyles'
import { LoanAppContext } from '../../containers/Dashboard/Dashboard'
import TimeAgo from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Typography from '@material-ui/core/Typography';
import { globals } from '../../globals'
import { useHistory } from "react-router-dom"
import ApplicationState from '../ApplicationState/ApplicationState'
import TableServerError from '../TableServerError/TableServerError'
import SnackBar from '../Snackbar/SnackBar'
import { clearLocalStorage } from '../../utils';
import fetch from 'fetch-timeout'
import Pagination from './Pagination'
import { Divider } from '@material-ui/core';
const formatter = buildFormatter(buildFormatter)



function desc(a, b, orderBy) {
    if (orderBy === 'submissionDate' || orderBy === 'reworkDate' || orderBy === 'approvedDate' ||
        orderBy === 'rejectedOrCancelledDate' || orderBy === 'updatedDate') {
        if (b.orderBy < a.orderBy) {
            return -1;
        }
        if (b.orderBy > a.orderBy) {
            return 1;
        }
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }

    return 0;
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


export default function TableView(props) {

    let history = useHistory();
    function navLoanDetails(event) {
        localStorage.setItem('loanAppNo', event.target.id)
        history.push(globals.routes.LOANDETAIL + '/' + event.target.id);
    }
    function numberWithCommas(x) {
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== '')
            lastThree = ',' + lastThree;
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    }
    function statusToDate(row) {
        switch (row.mvStatus) {
            case globals.state.PENDING:
                return row.submissionDate;
            case globals.state.RE_SUBMITTED:
                return row.submissionDate;
            case globals.state.RE_WORK:
                return row.reworkDate;
            case globals.state.APPROVED:
                return row.approvedDate;
            case globals.state.SYSTEM_APPROVED:
                return row.approvedDate;
            case globals.state.REJECTED:
                return row.rejectedOrCancelledDate;
            case globals.state.CANCELLED:
                return row.rejectedOrCancelledDate;
            default:
                return null;
        }
    }
    function reloadTable() {
        setLatestCount(!latestCount);
    }
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [selected, setSelected] = React.useState([]);
    const [page] = React.useState(0);
    // const [page2, setPage2] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectAll, setSelectAll] = React.useState(false);

    const [rows, setRows] = React.useContext(LoanAppContext);
    const [isFetching, setIsFetching] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [queueEmpty, setQueueEmpty] = React.useState(false);
    const [card] = useContext(CardContext);
    const [latestCount, setLatestCount] = useContext(LatestCountContext);
    const [count] = useContext(CountContext);

    const [snackBar, setSnackBar] = React.useState();
    const [snackBarVariant, setSnackBarVariant] = React.useState();
    const [snackBarMessage, setSnackBarMessage] = React.useState();
    const showSnackBar = () => {
        setSnackBar(true);
    };

    const hideSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar(false);
    };

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
        return stabilizedThis.map(el => el[0]);
    }

    async function bulkLock() {
        var settings = {
            "crossDomain": true,
            "url": globals.api.HOST + "lock",
        }

        await fetch(settings.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
            },
            timeout: 3000,
            body: JSON.stringify({ LoanApps: selected, agentName: localStorage.getItem('agentName') })
        }, 5000).then(res => res.text()
        ).then(res => {

            if (res.response === "Either token is invalid or token expired") {
                console.log("Either token is invalid or token expired");
                setSnackBarMessage("Session has expired , Sign in again");
                setSnackBarVariant("info");
                showSnackBar();
                setTimeout(function () { clearLocalStorage(); history.push(globals.routes.HOME) }, globals.messageDisplayTime.sessionExpiry);
            } else if (res === "Success") {
                reloadTable();
            } else {
                setSnackBarMessage("Something went wrong ,  try again");
                setSnackBarVariant("info");
                showSnackBar();

            }

        });
        unSelect();
    }

    function cardParse(card) {
        if (card[globals.cards.PENDING]) {
            return globals.state.PENDING;
        }
        else if (card[globals.cards.RE_WORK]) {
            return globals.state.RE_WORK;
        }

        else if (card[globals.cards.APPROVED]) {

            return globals.state.APPROVED;
        }
        else if (card[globals.cards.REJECTED_OR_CANCELLED]) {

            return globals.state.REJECTED;
        }

        else if (card[globals.cards.ALL]) {
            return globals.state.ALL;
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsFetching(true);
                setError(false);
                setQueueEmpty(false);
                setSelected([]);
                var settings = {
                    "mode": "no-cors",
                    "url": globals.api.HOST + "getAllLoanApplication?status=" + cardParse(card) + "&pageNumber=" + props.page2 + "&pageOffset=" + rowsPerPage,
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
                }
                await fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }

                }, globals.request.timout, "request timeout"
                ).then(res => res.json()
                ).then(res => {
                    if (res.response === "Either token is invalid or token expired") {
                        console.log("Either token is invalid or token expired");
                        setSnackBarMessage("Session has expired , Sign in again");
                        setSnackBarVariant("info");
                        showSnackBar();
                        setTimeout(function () { clearLocalStorage(); history.push(globals.routes.HOME) }, globals.messageDisplayTime.sessionExpiry);
                    } else if (res.response === "Application queue is empty") {
                        console.log("Application queue is empty");
                        setQueueEmpty(true);
                    } else if (res.response === "Exception occurred") {
                        console.log("Exception occurred");
                        setError(true);
                    } else {
                        setRows(JSON.parse(res.data));

                    }
                }
                )

            } catch (e) {
                console.log(e);
                setError(true);
            }
            setIsFetching(false);
        };
        fetchUsers();
        // setQueueEmpty(true);
    }, [card, latestCount, props.page2, rowsPerPage]);

    const handleRequestSort = (event, property) => {

        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (!selectAll) {
            // const newSelecteds = rows.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => {
            //     if (!n.lockedBy) {
            //         return n.loanApplicationNo;
            //     }
            // });
            var newSelecteds = [], index;
            // console.log("page * rowsPerPage", page * rowsPerPage);
            // console.log("object", rows[page * rowsPerPage].hasOwnProperty('lockedBy'));
            // console.log("object", Object(rows[page * rowsPerPage]).hasOwnProperty('lockedBy'));
            // console.log(rows[page * rowsPerPage]['loanApplicationNo']);
            for (index = page * rowsPerPage; index <= (page * rowsPerPage) + rowsPerPage; index++) {
                if (!Object(rows[index]).hasOwnProperty('lockedBy') && Object(rows[index]).hasOwnProperty('loanApplicationNo')) {
                    newSelecteds.push(Object(rows[index])['loanApplicationNo']);
                }
            }
            setSelectAll(!selectAll);
            setSelected(newSelecteds);
            console.log("newSelecteds", newSelecteds);
            return;
        }
        setSelected([]);
        setSelectAll(!selectAll);
    };



    const handleClick = (event, loanApplicationNo, mvStatus, lockedBy) => {

        if ((mvStatus === globals.state.PENDING || mvStatus === globals.state.RE_SUBMITTED) && !lockedBy) {
            const selectedIndex = selected.indexOf(loanApplicationNo);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, loanApplicationNo);
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
        }
    };

    const isSelected = loanApplicationNo => selected.indexOf(loanApplicationNo) !== -1;
    return (
        <div className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} bulkLock={bulkLock} />
            {(error) ? (<TableServerError reload={reloadTable} />) : ((queueEmpty) ? (
                <Typography style={{
                    width: '370px',
                    height: '30px',
                    fontSize: '22px',
                    fontWeight: '600',
                    letterSpacing: '0.25px',
                    textAlign: 'center',
                    color: '#9096ba',
                    paddingTop: '20vh',
                    paddingLeft: '40vw'
                }}>
                    No Pending Applications in Queue
                </Typography>
            ) :
                ((isFetching) ? (<Spinner />) : (
                    <Paper className={classes.paper}>

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
                                            const isItemSelected = isSelected(row.loanApplicationNo);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <StyledTableRow
                                                    hover
                                                    onClick={event => handleClick(event, row.loanApplicationNo, row.mvStatus, row.lockedBy)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.loanApplicationNo}
                                                    selected={isItemSelected}
                                                >
                                                    {
                                                        (card[globals.cards.PENDING]) ? (
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    checked={isItemSelected}
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            </TableCell>) : null

                                                    }
                                                    {
                                                        (!card[globals.cards.ALL]) ? (
                                                            <TableCell component="th" id={labelId} scope="row" align="left" style={{ display: 'flex' }}>
                                                                <TimeAgo date={statusToDate(row)} formatter={formatter}></TimeAgo>
                                                                {
                                                                    (statusToDate(row)) ?
                                                                        ("s ago") :
                                                                        ("--")
                                                                }
                                                                {
                                                                    (row.mvStatus === globals.state.RE_SUBMITTED) ? (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                                                                            <path fill="#FF8256" fillRule="nonzero" d="M21 15.875L17.625 12.5v2.25H7.5c-1.24 0-2.25-1.01-2.25-2.25s1.01-2.25 2.25-2.25h7.875V8H7.5A4.505 4.505 0 0 0 3 12.5C3 14.981 5.019 17 7.5 17h10.125v2.25L21 15.875z" />
                                                                        </svg>

                                                                    ) : (null)
                                                                }
                                                            </TableCell>
                                                        ) : (
                                                                <TableCell component="th" id={labelId} scope="row" align="left" style={{ display: 'flex' }}>
                                                                    <TimeAgo date={row.updatedDate} formatter={formatter}></TimeAgo>
                                                                    {
                                                                        (row.updatedDate) ?
                                                                            ("s ago") :
                                                                            ("--")
                                                                    }
                                                                    {
                                                                        (row.mvStatus === globals.state.RE_SUBMITTED) ? (
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                                                <path fill="#FF8256" fillRule="nonzero" d="M21 15.875L17.625 12.5v2.25H7.5c-1.24 0-2.25-1.01-2.25-2.25s1.01-2.25 2.25-2.25h7.875V8H7.5A4.505 4.505 0 0 0 3 12.5C3 14.981 5.019 17 7.5 17h10.125v2.25L21 15.875z" />
                                                                            </svg>

                                                                        ) : (null)
                                                                    }

                                                                </TableCell>
                                                            )
                                                    }

                                                    <TableCell align="left">{row.loanApplicationNo}</TableCell>
                                                    <TableCell align="left">{row.clixApplicationId}</TableCell>
                                                    <TableCell align="left">{row.name}</TableCell>
                                                    {
                                                        (!card[globals.cards.ALL]) ? (<TableCell align="left">{row.mobileNumber}</TableCell>) : (null)
                                                    }

                                                    <TableCell align="left">{'₹' + numberWithCommas(row.loanAmount)}</TableCell>
                                                    {
                                                        (card[globals.cards.PENDING] || card[globals.cards.ALL]) ? (

                                                            (row.lockedBy) ?
                                                                (
                                                                    <TableCell align="left" style={{ display: 'flex' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ paddingRight: '0.5rem' }}>
                                                                            <g fill="#EC7474" fillRule="nonzero">
                                                                                <path d="M6 20h12V10H6v10zm6-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" opacity=".3" />
                                                                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                                                            </g>
                                                                        </svg>

                                                                        <Typography style={{ paddingTop: '0.4rem' }}>Locked</Typography>
                                                                    </TableCell>
                                                                )
                                                                : (
                                                                    <TableCell align="left" style={{ display: 'flex' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ paddingRight: '0.5rem' }}>
                                                                            <g fill="none" fillRule="nonzero">
                                                                                <path fill="#FFF" d="M6 20h12V10H6v10zm6-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                                                                                <path fill="#6FB934" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                                                                <path d="M0 0h24v24H0z" />
                                                                            </g>
                                                                        </svg>

                                                                        <Typography style={{ paddingTop: '0.4rem' }}>Available</Typography>
                                                                    </TableCell>)

                                                        ) : (null)

                                                    }
                                                    {
                                                        (card[globals.cards.PENDING] || card[globals.cards.ALL]) ? (

                                                            (row.lockedBy) ?
                                                                (<TableCell align="left">
                                                                    <Typography>{row.lockedBy}</Typography>
                                                                </TableCell>)
                                                                : (<TableCell align="left">
                                                                    <Typography>---</Typography>
                                                                </TableCell>)

                                                        ) : (null)

                                                    }
                                                    {
                                                        (card[globals.cards.REJECTED_OR_CANCELLED]) ? (<TableCell align="left">{row.rejectReason}</TableCell>) : (null)

                                                    }
                                                    {
                                                        (card[globals.cards.ALL]) ? (<TableCell align="left">
                                                            <ApplicationState state={row.mvStatus} />
                                                        </TableCell>) : (null)
                                                    }
                                                    {
                                                        (row.lockedBy && row.lockedBy !== localStorage.getItem('agentName')) ?
                                                            (<TableCell className={classes.profileLocked} align="left" style={{ cursor: 'pointer' }}>
                                                                {(row.mvStatus === globals.state.PENDING || row.mvStatus === globals.state.RE_SUBMITTED) ? ("Verify") : ("View")}
                                                            </TableCell>) :
                                                            (<TableCell className={classes.profileView} align="left" id={row.loanApplicationNo} style={{ cursor: 'pointer' }} onClick={navLoanDetails}>
                                                                {(row.mvStatus === globals.state.PENDING || row.mvStatus === globals.state.RE_SUBMITTED) ? ("Verify") : ("View")}
                                                            </TableCell>

                                                            )

                                                    }
                                                </StyledTableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </div>
                        <Divider />
                        {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            rowsPerPage={rowsPerPage}
                            page={page2}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> */}


                        <Pagination style={{ float: 'right', align: 'left' }} page={page} page2={props.page2} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} count={count[cardParse(card)]} setPage2={props.setPage2} />

                    </Paper>)))}
            <SnackBar message={snackBarMessage} variant={snackBarVariant} snackBar={snackBar} showSnackBar={showSnackBar} hideSnackBar={hideSnackBar} />
        </div>
    );
}
