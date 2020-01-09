import React, { useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { CardContext, CountContext, LatestCountContext } from '../../containers/Dashboard/Dashboard'
import EnhancedTableHead from '../TableViewHead/TableViewHead'
import EnhancedTableToolbar from '../TableViewToolbar/TableViewToolbar'
import Spinner from '../Loader/Loader'
import { StyledTableRow, useStyles } from './TableViewStyles'
import { Link } from "react-router-dom";
import { LoanAppContext } from '../../containers/Dashboard/Dashboard'
import TimeAgo from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import lockOpenImage from '../../assets/images/ic-lock-open.svg'
import lockImage from '../../assets/images/ic-lock.svg'
import Typography from '@material-ui/core/Typography';
import { api } from '../../globals'

const formatter = buildFormatter(buildFormatter)



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


export default function TableView() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('loanAmount');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [rows, setRows] = React.useContext(LoanAppContext);
    const [isFetching, setIsFetching] = React.useState(false);
    const [error, setError] = React.useState({});

    const [card] = useContext(CardContext);
    const [count] = useContext(CountContext);
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
        return stabilizedThis.map(el => el[0]);
    }

    async function bulkApprove() {
        console.log("bulk approve is getting called " + JSON.stringify({ LoanApps: selected }));
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
            console.log('bulkapprove', res);
            console.log("count " + JSON.stringify(count));
            console.log("count length " + JSON.stringify(count.length));
            setLatestCount(!latestCount);

        });
        unSelect();
    }

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
                    console.log("response for tables : " + JSON.parse(res.data));
                    setRows(JSON.parse(res.data));
                });

            } catch (e) {
                console.log(e);
                setError(true);
            }
            setIsFetching(false);
        };
        fetchUsers();
    }, [card, latestCount]);

    const handleRequestSort = (event, property) => {

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
                                                    <TimeAgo date={row.submissionDate} formatter={formatter}></TimeAgo>
                                                    {
                                                        (row.submissionDate) ?
                                                            ("s ago") :
                                                            ("--")
                                                    }

                                                </TableCell>
                                                <TableCell align="left">{row.loanApplicationNo}</TableCell>
                                                <TableCell align="left">{row.firstName + " " + row.middleName + " " + row.lastName}</TableCell>
                                                <TableCell align="left">{row.kycContactMobile}</TableCell>
                                                <TableCell align="left">{row.loanAmount}</TableCell>
                                                {
                                                    (card[0]) ? (

                                                        (row.agentName) ?
                                                            (<TableCell align="left" style={{ display: 'flex' }}>
                                                                <img src={lockImage} alt="lock image" style={{ paddingRight: '0.5rem' }} />
                                                                <Typography>Locked</Typography>
                                                            </TableCell>)
                                                            : (<TableCell align="left" style={{ display: 'flex' }}>
                                                                <img src={lockOpenImage} alt="lock open image" style={{ paddingRight: '0.5rem' }} />
                                                                <Typography>Available</Typography>
                                                            </TableCell>)

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
                                                <TableCell align="left" id={row.loanApplicationNumber} style={{ cursor: 'pointer' }}>
                                                    <Link className={classes.profileView} to={{
                                                        pathname: '/userprofile',
                                                        state: {
                                                            LoanApp: row
                                                        }
                                                    }}>{(card[0]) ? ("Verify") : ("View")}
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
