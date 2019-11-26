import React, { useEffect } from 'react';
import clixLogo from '../../assets/images/clixLogo.png'
import loginImage from '../../assets/images/loginImage.png'
import InputBase from '@material-ui/core/InputBase';
import { createMuiTheme, fade, makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LoginIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import LetterAvatars from '../Avatar/Avatar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '../Avatar/Avatar'
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import $ from 'jquery';
import { useHistory } from "react-router-dom";
import lifecycle from 'react-pure-lifecycle';
import SimpleCard from '../Card/Card'
import Cards from '../CountBoard/CountBoard'





const TableView = () => {

    let history = useHistory();

    const useStyles1 = makeStyles(theme => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));


    function TablePaginationActions(props) {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onChangePage } = props;

        const handleFirstPageButtonClick = event => {
            onChangePage(event, 0);
        };

        const handleBackButtonClick = event => {
            onChangePage(event, page - 1);
        };

        const handleNextButtonClick = event => {
            onChangePage(event, page + 1);
        };

        const handleLastPageButtonClick = event => {
            onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };



    const StyledTableRow = withStyles(theme => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },

        },
    }))(TableRow);
    const StyledTableCell = withStyles(theme => ({
        head: {
            //backgroundColor: theme.palette.common.black,
            //color: theme.palette.common.white,

            color: 'rgb(120,120,120)'
        },
        body: {
            fontSize: 14,
            fontWeight: "550",
            color: 'rgb(76,76,76)',
            height: '2%',
        },
    }))(TableCell);
    const StyledTableHeadCell = withStyles(theme => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            color: 'rgb(150,150,150)'
        },
    }))(TableCell);
    const ColoredTableCell = withStyles(theme => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
            fontWeight: "550",
            color: "rgb(128,177,232)",
            cursor: 'pointer',
        },
    }))(TableCell);
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            paddingTop: '1%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },

        tableWrapper: {
            overflowX: 'auto',
        },
        button: {
            margin: theme.spacing(1),
        },
    }));

    function createData(name, mobile, emailId, submittedDate, offer, status, action) {


        console.log({
            name, mobile, emailId, submittedDate, offer, status, action
        })
        return {
            name, mobile, emailId, submittedDate, offer, status, action
        };
    }




    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = React.useState([]);
    const [fetching, setisfetching] = React.useState(false);
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    return (
        <div>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left" style
                                    ={{ paddingLeft: '5.4%' }}>Name </StyledTableCell>
                                <StyledTableCell align="left">Mobile</StyledTableCell>
                                <StyledTableCell align="left" fontWeight="bold">Email ID</StyledTableCell>
                                <StyledTableCell align="left">Submitted On</StyledTableCell>
                                <StyledTableCell align="left">Offer</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows

                            ).map(row => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" align="left" scope="row">
                                        <div style={{ float: 'left' }}></div>
                                        <div style={{ paddingTop: '0.5rem', paddingLeft: '5rem' }}>{row.name}</div>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.kycContactMobile}</StyledTableCell>
                                    <StyledTableCell align="left">{row.kycEmailId}</StyledTableCell>
                                    <StyledTableCell align="left">{row.submissionDate}</StyledTableCell>
                                    <StyledTableCell align="left">{row.loanAmount}</StyledTableCell>
                                    <ColoredTableCell align="left">{row.userDataReviewStatus}</ColoredTableCell>
                                    <ColoredTableCell id={row.loanApplicationNumber} onClick={viewProfile} align="left">VIEW</ColoredTableCell>
                                </StyledTableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow >
                                <TablePagination

                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        </div>
    );
}


export default TableView;