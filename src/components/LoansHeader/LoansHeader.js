import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import ReworkModal from './ReworkModal'
import ViewReason from './ViewReason'

const LoansHeader = (props) => {
    let history = useHistory();
    return (
        <div className="displayFlex" style={{ marginTop: '0.2rem', backgroundColor: 'white' }}>
            <div style={{ textAlign: 'left', paddingLeft: '2%', paddingTop: '1%', color: 'grey', cursor: 'pointer' }} onClick={history.goBack}>
                <ArrowBackIcon />
            </div>
            <div style={{ paddingLeft: '1%', paddingTop: '1%' }}>
                <Typography variant="body2" gutterBottom style={{ height: '30px', width: '235px', color: '#000000', fontSize: '20px', fontWeight: '600' }}>
                    LAN - MV{props.LoanApp.loanApplicationNo}
                </Typography>

            </div>
            {
                (props.LoanApp.mvStatus.toLowerCase() === "rejected") ?
                    (
                        <div style={{ paddingLeft: '1%', paddingTop: '1%', color: 'rgb(92,154,224)' }}>
                            <ViewReason reason={props.LoanApp.remarks} date={props.LoanApp.dateCreated} />
                        </div>
                    ) :
                    (null)

            }


            {
                (props.LoanApp.mvStatus.toLowerCase() === "pending") ?
                    (
                        <ReworkModal />
                    ) :
                    (null)
            }



        </div>
    );
}

export default LoansHeader;