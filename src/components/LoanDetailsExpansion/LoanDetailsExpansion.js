import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoanDetails from '../../components/UserDetails/UserDetails'
import OfferDetails from '../../components/OfferDetails/OfferDetails'
import KycDetails from '../../components/KycDetails/KycDetails'
import LoanDetailsExpansionStyles from './LoanDetailsExpansionStyles'
export default function ControlledExpansionPanels(props) {
    const classes = LoanDetailsExpansionStyles();
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        switch (panel) {
            case 'panel1': {
                props.setPageNumber(1);
                break;
            }
            case 'panel2': {
                props.setPageNumber(3);
                break;
            }
            case 'panel3': {
                props.setPageNumber(4);
                break;
            }
            case 'panel4': {
                props.setPageNumber(5);
                break;
            }
            default: {
                props.setPageNumber(1);
            }
        }
    };





    return (
        <div className={classes.root}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>User Profile</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <LoanDetails LoanApp={props.LoanApp} selfieUrl={props.selfieUrl} pageNumber={props.pageNumber} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Offer Details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <OfferDetails LoanApp={props.LoanApp} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>KYC Details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <KycDetails LoanApp={props.LoanApp} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {/* <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Employer Details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <EmployerDetails LoanApp={props.LoanApp} />
                </ExpansionPanelDetails>
            </ExpansionPanel> */}
        </div>
    );
}
