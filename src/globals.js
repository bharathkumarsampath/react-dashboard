export const rework = {
    REASONS: [
        { text: "OSV required in OVD documents", value: '0' },
        { text: "Pincode Mismatch on Alliance Agreement", value: '1' },
        { text: "Address Mismatch between CRM and OKYC document", value: '2' },
        { text: "Father Name Mismatch Alliance and Pan Card", value: '3' },
        { text: "Require Proper Employee Name", value: '4' },
        { text: "Required M Verify", value: '5' },
        { text: "Required Other Docs Pre/OKYC( XML )", value: '6' },
        { text: "Only one signature should be there in NACH Form", value: '7' },
    ],
    REASONS_ARRAY: ["OSV required in OVD documents",
        "Pincode Mismatch on Alliance Agreement",
        "Address Mismatch between CRM and OKYC document",
        "Father Name Mismatch Alliance and Pan Card",
        "Require Proper Employee Name",
        "Required M Verify",
        "Required Other Docs Pre/OKYC( XML )",
        "Only one signature should be there in NACH Form"
    ]
};

export const table = {
    HEADING: [[
        { id: 'submissionDate', numeric: false, disablePadding: false, label: 'Submitted Date' },
        { id: 'loanApplicationNumber', numeric: true, disablePadding: false, label: 'Loan ID' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'kycContactMobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'Case Status', numeric: true, disablePadding: false, label: 'Case Status' },
        { id: 'agentName', numeric: true, disablePadding: false, label: 'Agent Name' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'submissionDate', numeric: true, disablePadding: false, label: 'Re-Work Date' },
        { id: 'loanApplicationNumber', numeric: true, disablePadding: false, label: 'Loan ID' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'kycContactMobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'submissionDate', numeric: true, disablePadding: false, label: 'Approved Date' },
        { id: 'loanApplicationNumber', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'kycContactMobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'submissionDate', numeric: true, disablePadding: false, label: 'Rejected Date' },
        { id: 'loanApplicationNumber', numeric: true, disablePadding: false, label: 'LAN' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'kycContactMobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'reason', numeric: true, disablePadding: false, label: 'Reason' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }],
    [
        { id: 'submissionDate', numeric: true, disablePadding: false, label: 'Re-Work Date' },
        { id: 'loanApplicationNumber', numeric: true, disablePadding: false, label: 'Loan ID' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'kycContactMobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'loanAmount', numeric: true, disablePadding: false, label: 'Loan Amount' },
        { id: 'Action', numeric: true, disablePadding: false, label: 'Action' }]
    ]
};

export const api = {
    HOST: "http://localhost:8080/services/api/clix/portal/"
};