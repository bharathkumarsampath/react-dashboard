export const rework = {
    REASONS: [],
};

export const table = {
    HEADING: [[
        { id: 'submissionDate', numeric: false, disablePadding: false, label: 'MV Submitted On' },
        { id: 'loanApplicationNo', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'mobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'lockStatus', numeric: true, disablePadding: false, label: 'Case Status' },
        { id: 'agentName', numeric: true, disablePadding: false, label: 'Agent Name' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'reworkDate', numeric: true, disablePadding: false, label: 'Re-Work Date' },
        { id: 'loanApplicationNo', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'mobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'approvedDate', numeric: true, disablePadding: false, label: 'Approved Date' },
        { id: 'loanApplicationNo', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'mobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'rejectedOrCancelledDate', numeric: true, disablePadding: false, label: 'Rejected/Cancelled Date' },
        { id: 'loanApplicationNo', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'mobileNumber', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'reason', numeric: true, disablePadding: false, label: 'Reason' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'updatedDate', numeric: true, disablePadding: false, label: 'Last Updated On' },
        { id: 'loanApplicationNo', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'lockStatus', numeric: true, disablePadding: false, label: 'Case Status' },
        { id: 'agentName', numeric: true, disablePadding: false, label: 'Agent Name' },
        { id: 'mvStatus', numeric: true, disablePadding: false, label: 'App Status' },
        { id: 'action', numeric: true, disablePadding: false, label: 'Action' }]
    ]
};

export const api = {
    HOST: "http://10.60.1.223:8080/services/api/clix/portal/"
};

export const state = {
    PENDING: "PENDING",
    REWORK: "REWORK",
    APPROVED: "APPROVED",
    SYSTEM_APPROVED: "SYSTEM_APPROVED",
    RE_SUBMITTED: "RE_SUBMITTED",
    REJECTED: "REJECTED",
    CANCELLED: "CANCELLED",
    ALL: "ALL"
};

export const lockStatus = {
    LOCKED: "Locked",
    AVAILABLE: "Available"

};