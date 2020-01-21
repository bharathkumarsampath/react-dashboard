import React, { useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { CardContext, LatestCountContext } from '../../containers/Dashboard/Dashboard'
import EnhancedTableHead from '../TableViewHead/TableViewHead'
import EnhancedTableToolbar from '../TableViewHeader/TableViewHeader'
import Spinner from '../Loader/Loader'
import { StyledTableRow, useStyles } from './TableViewStyles'
import { LoanAppContext } from '../../containers/Dashboard/Dashboard'
import TimeAgo from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Typography from '@material-ui/core/Typography';
import { api, state, routes, cards } from '../../globals'
import { useHistory } from "react-router-dom"
import ApplicationState from '../ApplicationState/ApplicationState'
import TableServerError from '../TableServerError/TableServerError'
import SnackBar from '../Snackbar/SnackBar'
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


export default function TableView() {

    let history = useHistory();
    function navLoanDetails(event) {
        localStorage.setItem('loanAppNo', event.target.id)
        history.push(routes.LOANDETAIL + '/' + event.target.id);
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
            case state.PENDING:
                return row.submissionDate;
            case state.RE_SUBMITTED:
                return row.submissionDate;
            case state.RE_WORK:
                return row.reworkDate;
            case state.APPROVED:
                return row.approvedDate;
            case state.SYSTEM_APPROVED:
                return row.approvedDate;
            case state.REJECTED:
                return row.rejectedOrCancelledDate;
            case state.CANCELLED:
                return row.rejectedOrCancelledDate;
            default:
                return row.submissionDate;
        }
    }
    function reloadTable() {
        setLatestCount(!latestCount);
    }
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectAll, setSelectAll] = React.useState(false);

    const [rows, setRows] = React.useContext(LoanAppContext);
    const [isFetching, setIsFetching] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [queueEmpty, setQueueEmpty] = React.useState(false);
    const [card] = useContext(CardContext);
    const [latestCount, setLatestCount] = useContext(LatestCountContext);

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

    async function bulkApprove() {
        var settings = {
            "crossDomain": true,
            "url": api.HOST + "approve",
        }

        await fetch(settings.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
                "Accept": "application/json"
            },
            body: JSON.stringify({ LoanApps: selected })
        }).then(res => res.json()
        ).then(res => {
            setLatestCount(!latestCount);

        });
        unSelect();
    }

    function cardParse(card) {
        if (card[cards.PENDING]) {
            return state.PENDING;
        }
        else if (card[cards.RE_WORK]) {
            return state.RE_WORK;
        }

        else if (card[cards.APPROVED]) {

            return state.APPROVED;
        }
        else if (card[cards.REJECTED_OR_CANCELLED]) {

            return state.REJECTED;
        }

        else if (card[cards.ALL]) {
            return state.ALL;
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsFetching(true);
                setError(false);
                setQueueEmpty(false);
                setPage(0);
                setSelected([]);
                var settings = {
                    "mode": "no-cors",
                    "url": api.HOST + "getAllLoanApplication?status=" + cardParse(card),
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

                }).then(res => res.json()
                ).then(res => {
                    if (JSON.stringify(res) === "Either token is invalid or token expired") {
                        console.log("Either token is invalid or token expired");
                        setSnackBarMessage("Session has expired , Sign in again");
                        setSnackBarVariant("info");
                        showSnackBar();
                        localStorage.clear();
                        setTimeout(history.push('/'), 2000);
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
    }, [card, latestCount]);

    const handleRequestSort = (event, property) => {

        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (!selectAll) {
            const newSelecteds = rows.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => n.loanApplicationNo);
            setSelectAll(!selectAll);
            setSelected(newSelecteds);
            // console.log("length : ", selected.length, "content : ", selected);
            return;
        }
        setSelected([]);
        setSelectAll(!selectAll);
        // console.log("length : ", selected.length, "content : ", selected);
    };



    const handleClick = (event, loanApplicationNo, mvStatus) => {

        if (mvStatus === state.PENDING || mvStatus === state.RE_SUBMITTED) {
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
        // console.log("selected " + selected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = loanApplicationNo => selected.indexOf(loanApplicationNo) !== -1;
    return (
        <div className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} bulkApprove={bulkApprove} />
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
                                                    onClick={event => handleClick(event, row.loanApplicationNo, row.mvStatus)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.loanApplicationNo}
                                                    selected={isItemSelected}
                                                >
                                                    {
                                                        (card[cards.PENDING] || card[cards.ALL]) ? (
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    checked={isItemSelected}
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            </TableCell>) : null

                                                    }
                                                    {
                                                        (!card[cards.ALL]) ? (
                                                            <TableCell component="th" id={labelId} scope="row" align="left" style={{ display: 'flex' }}>
                                                                <TimeAgo date={statusToDate(row)} formatter={formatter}></TimeAgo>
                                                                {
                                                                    (statusToDate(row)) ?
                                                                        ("s ago") :
                                                                        ("--")
                                                                }
                                                                {
                                                                    (row.mvStatus === state.RE_SUBMITTED) ? (
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
                                                                        (row.mvStatus === state.RE_SUBMITTED) ? (
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                                                <path fill="#FF8256" fillRule="nonzero" d="M21 15.875L17.625 12.5v2.25H7.5c-1.24 0-2.25-1.01-2.25-2.25s1.01-2.25 2.25-2.25h7.875V8H7.5A4.505 4.505 0 0 0 3 12.5C3 14.981 5.019 17 7.5 17h10.125v2.25L21 15.875z" />
                                                                            </svg>

                                                                        ) : (null)
                                                                    }

                                                                </TableCell>
                                                            )
                                                    }

                                                    <TableCell align="left">{row.loanApplicationNo}</TableCell>
                                                    <TableCell align="left">{row.name}</TableCell>
                                                    {
                                                        (!card[cards.ALL]) ? (<TableCell align="left">{row.mobileNumber}</TableCell>) : (null)
                                                    }

                                                    <TableCell align="left">{'₹' + numberWithCommas(row.loanAmount)}</TableCell>
                                                    {
                                                        (card[cards.PENDING] || card[cards.ALL]) ? (

                                                            (row.lockedBy && row.lockedBy !== localStorage.getItem('agentName')) ?
                                                                (
                                                                    <React.Fragment>
                                                                        <TableCell align="left" style={{ display: 'flex' }}>
                                                                            {/* <img src={lockImage} alt="lock image" style={{ paddingRight: '0.5rem' }} /> */}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ paddingRight: '0.5rem' }}>
                                                                                <g fill="#EC7474" fillRule="nonzero">
                                                                                    <path d="M6 20h12V10H6v10zm6-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" opacity=".3" />
                                                                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                                                                </g>
                                                                            </svg>

                                                                            <Typography style={{ paddingTop: '0.4rem' }}>Locked</Typography>
                                                                        </TableCell>
                                                                        <TableCell align="left">
                                                                            <Typography>{row.lockedBy}</Typography>
                                                                        </TableCell>
                                                                    </React.Fragment>
                                                                )
                                                                : (<React.Fragment>
                                                                    <TableCell align="left" style={{ display: 'flex' }}>
                                                                        {/* <img src={lockOpenImage} alt="lock open image" style={{ paddingRight: '0.5rem' }} /> */}
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ paddingRight: '0.5rem' }}>
                                                                            <g fill="none" fillRule="nonzero">
                                                                                <path fill="#FFF" d="M6 20h12V10H6v10zm6-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                                                                                <path fill="#6FB934" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                                                                <path d="M0 0h24v24H0z" />
                                                                            </g>
                                                                        </svg>

                                                                        <Typography style={{ paddingTop: '0.4rem' }}>Available</Typography>
                                                                    </TableCell>
                                                                    <TableCell align="left">---</TableCell>
                                                                </React.Fragment>)

                                                        ) : (null)

                                                    }
                                                    {/* {
                                                    (card[0]) ? (

                                                        (row.agentName) ? (<TableCell align="left">{row.agentName}</TableCell>)
                                                            : (<TableCell align="left">---</TableCell>)

                                                    ) : (null)

                                                } */}
                                                    {
                                                        (card[3]) ? (<TableCell align="left">{row.rejectReason}</TableCell>) : (null)

                                                    }
                                                    {
                                                        (card[cards.ALL]) ? (<TableCell align="left">
                                                            <ApplicationState state={row.mvStatus} />
                                                        </TableCell>) : (null)
                                                    }
                                                    {
                                                        (row.lockedBy && row.lockedBy !== localStorage.getItem('agentName')) ?
                                                            (<TableCell className={classes.profileLocked} align="left" style={{ cursor: 'pointer' }}>
                                                                {(row.mvStatus === state.PENDING || row.mvStatus === state.RE_SUBMITTED) ? ("Verify") : ("View")}
                                                            </TableCell>) :
                                                            (<TableCell className={classes.profileView} align="left" id={row.loanApplicationNo} style={{ cursor: 'pointer' }} onClick={navLoanDetails}>
                                                                {(row.mvStatus === state.PENDING || row.mvStatus === state.RE_SUBMITTED) ? ("Verify") : ("View")}
                                                            </TableCell>

                                                            )

                                                    }
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
                    </Paper>)))}
            <SnackBar message={snackBarMessage} variant={snackBarVariant} snackBar={snackBar} showSnackBar={showSnackBar} hideSnackBar={hideSnackBar} />
        </div>
    );
}
