import React from 'react';
import { Typography } from '@material-ui/core';
import Toolbar from '../../components/Toolbar/Toolbar'
import { ReloadAppContext } from '../../containers/LoanDetail/LoanDetail'
import LoanDetailPageErrorStyles from './LoanDetailPageErrorStyles'
const LoanDetailPageError = () => {
    const classes = LoanDetailPageErrorStyles();
    const [reload, setReload] = React.useContext(ReloadAppContext);

    function reloadLoanDetailPage() {
        setReload(!reload);
    }
    return (
        <React.Fragment>
            <Toolbar />
            <div className={classes.root}>

                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" className={classes.errorIconOne}>
                    <path fill="#EC7474" fillRule="nonzero" d="M30.063 5.908c-.808-1.526-3.318-1.526-4.126 0l-21 39.667A2.331 2.331 0 0 0 7 49h42a2.329 2.329 0 0 0 2.06-3.423L30.063 5.908zM30.333 42h-4.666v-4.667h4.666V42zm-4.666-9.333V21h4.666l.003 11.667h-4.67z" />
                </svg>
                <Typography className={classes.errorPhraseOne}>
                    We’re sorry, something went wrong
            </Typography>
                <Typography className={classes.errorPhraseTwo}>
                    An error occured while loading page. Try Reloading the page again
            </Typography>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className={classes.errorIconTwo} onClick={reloadLoanDetailPage}>
                    <path fill="#6FB934" fillRule="nonzero" d="M35.317 12.7A15.931 15.931 0 0 0 24.01 8C15.164 8 8.02 15.16 8.02 24s7.144 16 15.99 16c7.465 0 13.689-5.1 15.47-12h-4.163c-1.69 4.794-6.222 8-11.307 8-6.624 0-12.008-5.38-12.008-12s5.384-12 12.008-12c3.322 0 6.284 1.38 8.445 3.56L26.011 22H40.02V8l-4.703 4.7z" />
                </svg>

            </div>
        </React.Fragment>
    );
}

export default LoanDetailPageError;
