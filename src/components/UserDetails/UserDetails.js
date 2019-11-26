import React, { useEffect } from 'react';
import PersonIcon from '@material-ui/icons/Person';
// import { widthStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery';

const UserDetails = () => {

    function Person(props) {
        return (
            <PersonIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </PersonIcon>
        );
    }
    const [rows, setRows] = React.useState({});
    const [fetching, setisfetching] = React.useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (localStorage.getItem('token') == null) {
                    window.location.href = '/';
                } else {
                    setRows(rows);
                    setisfetching(true);
                    // const response = await axios.get(USER_SERVICE_URL);
                    var settings = {
                        "url": "http://lstaging2.whizdm.com/loans/services/api/clix/portal/getLoanApplication?id=" + localStorage.getItem('appNumber'),
                        "method": "GET",
                        "headers": {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": localStorage.getItem('token')
                        }
                    }
                    console.log('Beofre fetch call');
                    fetch(settings).then((res) => res.json()
                    ).then(res => {
                        console.log('res', res);
                        // setRows()
                        setisfetching(false);
                    });
                    // $.ajax(settings).done(function (response) {
                    //     console.log('user details');
                    //     console.log(response);
                    //     setRows(JSON.parse(response));
                    //     setisfetching(false);
                    // });
                    console.log("token in local storage " + localStorage.getItem('token'));
                }

            } catch (e) {
                console.log(e);
                setRows(rows);
                setisfetching(false);
            }
        };
        fetchUsers();
    }, []);

    const useStyles = makeStyles({
        root: {
            width: '100%',
            maxWidth: 1500,
            marginLeft: '2vw',
        },
        details: {
            width: '100%',
            maxWidth: 1500,
            marginLeft: '2vw',
            display: 'flex',
            marginTop: '8%'
        },
        displayInline: {
            display: 'inline',
        }
    });
    const classes = useStyles();

    return (
        <div style={{ display: 'flex', paddingLeft: '2.5%', paddingTop: '2%', paddingBottom: '2%', backgroundColor: 'rgb(245,247,251)' }}>
            <div>
                <Person style={{ fontSize: '230', backgroundColor: 'rgb(226,227,230)' }} color="disabled" fontSize="large" />

            </div>
            <div className={classes.displayInline}>
                <div className={classes.root}>
                    <Typography variant="body1" gutterBottom style={{ color: 'rgb(146,148,150)' }}>
                        Loan ID : {rows.loanApplicationNumber}
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bolder' }}>
                        {rows.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ color: 'rgb(146,148,150)' }}>
                        {[rows.kycPermanentAddressStreet, rows.kycPermanentAddressCity, rows.kycPermanentAddressState, rows.kycPermanentAddressPincode].join('')}
                    </Typography>
                </div>
                <div className={classes.details}>
                    <div className={classes.displayInline}>
                        <Typography variant="body1" gutterBottom style={{ color: 'rgb(146,148,150)' }}>
                            Mobile
                    </Typography>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bolder' }}>
                            {rows.kycContactMobile}
                        </Typography>
                    </div>
                    <div className={classes.displayInline}>
                        <Typography variant="body1" gutterBottom style={{ color: 'rgb(146,148,150)', paddingLeft: '10vw' }}>
                            PAN Number
                    </Typography>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bolder', paddingLeft: '10vw' }}>
                            {rows.panNo}
                        </Typography>
                    </div>
                    <div className={classes.displayInline}>
                        <Typography variant="body1" gutterBottom style={{ color: 'rgb(146,148,150)', paddingLeft: '10vw' }}>
                            Email ID
                    </Typography>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bolder', paddingLeft: '10vw' }}>
                            {rows.kycEmailId}
                        </Typography>
                    </div>
                </div>

            </div>
        </div>



    );


}



export default UserDetails;