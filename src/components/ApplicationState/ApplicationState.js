import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { state } from '../../globals'

export default function ApplicationState(props) {

    const [stateColor, setStateColor] = React.useState();
    const [stateText, setStateText] = React.useState();
    useEffect(() => {
        switch (props.state) {
            case state.PENDING: {
                setStateColor("#e9eaeb");
                setStateText("Pending");
                break;
            }
            case state.RE_SUBMITTED: {
                setStateColor("#fe9b79");
                setStateText("Re-submitted");
                break;
            }
            case state.RE_WORK: {
                setStateColor("#f1d8d8");
                setStateText("Re-work");
                break;
            }
            case state.APPROVED: {
                setStateColor("#d0faa6");
                setStateText("Approved");
                break;
            }
            case state.SYSTEM_APPROVED: {
                setStateColor("#d0faa6");
                setStateText("System Approved");
                break;
            }
            case state.REJECTED: {
                setStateColor("#ffaeae");
                setStateText("Rejected");
                break;
            }
            case state.CANCELLED: {
                setStateColor("#eeddfe");
                setStateText("Cancelled");
                break;
            }
            default: {
                setStateColor("white");
                setStateText("Unknown State");
            }

        }
    });

    return (
        <div style={{
            backgroundColor: stateColor,
            borderRadius: '4px',
            width: '120px',
            height: '24px',
            textAlign: 'center',
            paddingTop: "1vh",
            fontWeight: '12px',
            letterSpacing: '0.4px'

        }}>
            <Typography>{stateText}</Typography>
        </div>
    );
}